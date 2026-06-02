"use strict";

angular.module("app.pages.domain.customer-data", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("domaincustomer", {
        url: "/domain/customer",
        controller: "CustomerController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/domain/customer-data/customer-data.html",
        role: "user"
      });
  }])

  .controller("CustomerController", ["Customer", "UserManager", "toast", "PostNl", function (Customer, UserManager, toast, PostNl) {
    this.isDomain = true;

    let timer;
    const waitTime = 2000;
    let postNlVerifiedAddress = {};

    Customer.getCustomerByBlend({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise
      .then((result) => {
        this.user = result;
        if (result.country) {
          this.user.country = result.country;
        } else {
          this.user.country = "NL";
        }
        if (result.houseNumberAddition) {
          this.showHouseNumerAddition = true;
        }
        searchAddress();
      })
      .catch((error) => {
        console.error(error);
        toast.show("Er is iets misgegaan met het ophalen van de klant gegevens", "error");
      });

    this.updateCustomer = () => {
      if (this.noAddressFound) {
        toast.show("Adres wordt niet herkend", "error");
      } else {
        updateCustomer();
      }
    };

    const updateCustomer = () => {
      let customerInformation = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        email: this.user.email,
        street: this.user.street,
        houseNumber: this.user.houseNumber,
        houseNumberAddition: this.user.houseNumberAddition,
        postcode: postNlVerifiedAddress.postalCode,
        city: this.user.city,
        country: this.user.country
      };
      Customer.updateCustomerInformation({ blendExternalReference: UserManager.getBlendExternalReference() }, customerInformation).$promise
        .then(() => {
          toast.show("De gegevens zijn opgeslagen", "info");
          window.scrollTo(0, 0);
        })
        .catch(err => {
          if (err.status === 409) {
            toast.show("Dit e-mailadres is al in gebruik, probeer een ander e-mailadres.", "error");
          } else if (err.status >= 500) {
            toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
          }
        });
    }

    const searchAddress = () => {
      if (this.user.postcode && this.user.houseNumber && (this.user.country === "NL" || this.user.street)) {
        let houseNumber = this.user.houseNumber;
        for (let i = 0; i < houseNumber.length; i++) {
          if (isNaN(houseNumber[i]) || isNaN(parseFloat(houseNumber[i]))) {
            this.houseNumberAdditions = houseNumber.substring(i).trim().replace(/\s+/g, ' ').replace(/[^a-z0-9\s]/gi, '');
            this.user.houseNumberAddition = this.houseNumberAdditions;
            this.user.houseNumber = houseNumber.substring(0, i);
            break;
          }
        }

        PostNl.checkAddress({}, {
          countryIso: this.user.country,
          postalCode: this.user.postcode,
          houseNumber: this.user.houseNumber,
          houseNumberAddition: this.user.houseNumberAddition,
          street: this.user.country === "BE" ? this.user.street : "",
          city: this.user.country === "BE" ? this.user.city : ""
        }).$promise
          .then((response) => {
            checkMailabilityScore(response);
            if (response.length === 0) {
              resetAddressInput();
              this.noAddressFound = true;
            } else if (response.length === 1) {
              setCity(response[0].city);
              setStreet(response[0].street);
              if (this.user.country === "NL") {
                this.houseNumberAdditions = response[0].houseNumberAddition;
                this.user.houseNumberAddition = response[0].houseNumberAddition;
              }
            } else {
              resetAddressInput();
              setCity(response[0].city);
              if (this.user.country === "NL") {
                this.user.street = response[0].street;
                this.houseNumberAdditions = response.map(record => record.houseNumberAddition);
              }
            }
          }).catch((error) => {
            resetAddressInput();
            this.noAddressFound = true;
          });
      }
    };

    this.addressInputBlur = () => {
      clearTimeout(timer);
      searchAddress();
    }

    this.addressInputChange = (isResetAddress) => {
      this.noAddressFound = false;
      clearTimeout(timer);
      if (this.user.country === "NL") {
        this.showStreet = false;
      } else {
        this.showStreet = true;
        this.showHouseNumerAddition = true;
      }
      if (isResetAddress) {
        resetAddressInput();
      }
      timer = setTimeout(() => {
        searchAddress();
      }, waitTime);
    };

    const setStreet = (street) => {
      if (this.user.country === "BE" && this.user.street !== street) {
        this.user.street = street;
        searchAddress();
      }
      this.user.street = street;
    }

    const setCity = (city) => {
      if (this.user.country === "BE" && this.user.city === undefined) {
        this.user.city = city;
        searchAddress();
      }
      this.user.city = city;
    }

    const resetAddressInput = () => {
      if (this.user.country === "NL") {
        this.user.street = undefined;
        this.user.city = undefined;
      }
    }

    const checkMailabilityScore = (address) => {
      if (this.user.country === "NL") {
        this.noAddressFound = !address[0].mailabilityScore === 100;
      } else {
        this.noAddressFound = !address[0].mailabilityScore >= 60;
      }
      postNlVerifiedAddress = address[0];
    }

  }]);

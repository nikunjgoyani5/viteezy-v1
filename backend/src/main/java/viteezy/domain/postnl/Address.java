package viteezy.domain.postnl;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.List;

public class Address {

    private final Integer resultNumber;
    private final Integer mailabilityScore;
    private final Integer resultPercentage;
    private final List<String> formattedAddress;
    private final String street;
    private final Integer houseNumber;
    private final String houseNumberAddition;
    private final String postalCode;
    private final String city;
    private final String country;
    private final String countryIso2;
    private final String countryIso3;
    private final String locality;
    private final String state;
    private final BigDecimal latitude;
    private final BigDecimal longitude;

    @JsonCreator
    public Address(@JsonProperty("resultNumber") Integer resultNumber,
                   @JsonProperty("mailabilityScore") Integer mailabilityScore,
                   @JsonProperty("resultPercentage") Integer resultPercentage,
                   @JsonProperty("formattedAddress") List<String> formattedAddress,
                   @JsonProperty("streetName") String street,
                   @JsonProperty("houseNumber") Integer houseNumber,
                   @JsonProperty("houseNumberAddition") String houseNumberAddition,
                   @JsonProperty("postalCode") String postalCode,
                   @JsonProperty("cityName") String city,
                   @JsonProperty("countryName") String country,
                   @JsonProperty("countryIso2") String countryIso2,
                   @JsonProperty("countryIso3") String countryIso3,
                   @JsonProperty("localityName") String locality,
                   @JsonProperty("stateName") String state,
                   @JsonProperty("latitude") BigDecimal latitude,
                   @JsonProperty("longitude") BigDecimal longitude) {
        this.resultNumber = resultNumber;
        this.mailabilityScore = mailabilityScore;
        this.resultPercentage = resultPercentage;
        this.formattedAddress = formattedAddress;
        this.street = street;
        this.houseNumber = houseNumber;
        this.houseNumberAddition = houseNumberAddition;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
        this.countryIso2 = countryIso2;
        this.countryIso3 = countryIso3;
        this.locality = locality;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Integer getResultNumber() {
        return resultNumber;
    }

    public Integer getMailabilityScore() {
        return mailabilityScore;
    }

    public Integer getResultPercentage() {
        return resultPercentage;
    }

    public List<String> getFormattedAddress() {
        return formattedAddress;
    }

    public String getStreet() {
        return street;
    }

    public Integer getHouseNumber() {
        return houseNumber;
    }

    public String getHouseNumberAddition() {
        return houseNumberAddition;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public String getCountryIso2() {
        return countryIso2;
    }

    public String getCountryIso3() {
        return countryIso3;
    }

    public String getLocality() {
        return locality;
    }

    public String getState() {
        return state;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }
}

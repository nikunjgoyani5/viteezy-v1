import * as angular from 'angular';
import { Component, Inject } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

import { Toast, Location, UIRouterState, UserManager } from 'src/app/ajs-upgraded-providers';
import { BlendService } from 'src/app/core/services/blend.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { DateService } from 'src/app/core/utility/date.service';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { PostNLService } from 'src/app/core/services/postnl.service';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'domainHome',
  templateUrl: './domain-home.component.html',
  styleUrl: './domain-home.component.scss'
})
export class DomainHomeComponent {
  
  public amountOfIngredients: any;
  public blendStatus: string;
  public customer: any;
  public daysSubscribed: number;
  public deliveryDate: any;
  public deliveryDay: any;
  public deliveryMonth: any;
  public disabledActivation: boolean;
  public domainMenuVisible: boolean;
  public planExternalReference: any;
  public priceOfIngredients: any;
  public recurringMonths: any;
  public referralPageVisible = false;
  public status: any;
  public trackTraceLink: any;
  public usageGoalList: any[];
  public vitamines: any[];
  public recurringAmount: any;

  constructor(
    @Inject(UIRouterState) private $state,
    @Inject(Toast) private toast,
    @Inject(UserManager) private UserManager,
    @Inject(Location) private $location,
    private blendService: BlendService,
    private customerService: CustomerService,
    private dateService: DateService,
    private ingredientService: IngredientService,
    private paymentService: PaymentService,
    private postnlService: PostNLService,
    private quizService: QuizService) {

  }

  public ngOnInit(): void {
    if (this.$state.params.reference) {
      this.getCustomerData(this.$state.params.reference);
    } else if (this.UserManager.getCustomerExternalReference()) {
      this.getCustomerData(this.UserManager.getCustomerExternalReference());
    } else {
      this.$state.go("homepage");
    } 
  }

  private getBlend = (paymentPlanExternalReference) => {
    this.blendService.getAggregatedByPaymentPlanExternalReference(paymentPlanExternalReference)
      .subscribe((quizBlend) => {
        if (quizBlend.blendExternalReference) {
          this.UserManager.setBlendExternalReference(quizBlend.blendExternalReference);
          this.UserManager.setUserLoggedIn();
          if (quizBlend.quizExternalReference) {
            this.UserManager.setQuizExternalReference(quizBlend.quizExternalReference);
          }
          this.getBlendData();
        }
      },(error) => {
        this.blendService.getByCustomer(this.$state.params.reference)
          .subscribe((response) => {
            if (response.externalReference) {
              this.UserManager.setBlendExternalReference(response.externalReference);
              this.UserManager.setUserLoggedIn();
              this.getBlendData();
            }
          },(error) => {
            this.$state.go("quiz-v2");
          });
      });
  }

  private getCustomer = (customerExternalReference) => {
    this.UserManager.setCustomerExternalReference(customerExternalReference);
    this.customerService.getCustomer(customerExternalReference)
      .subscribe((response) => {
        this.customer = response;
        this.getTrackTrace(customerExternalReference);
      });
  }

  private getPaymentPlan = (customerExternalReference) => {
    this.paymentService.getPaymentPlanByCustomer("CANCELED", customerExternalReference)
      .subscribe(async (paymentPlan) => {
        let retryPaymentOpen = await this.checkRetryPayment(paymentPlan.externalReference);
        if (retryPaymentOpen) {
          this.$location.path(`/payment-request/${paymentPlan.externalReference}`);
        } else {
          this.getPaymentPlanSuspended(customerExternalReference);
        }
      }, (error) => {
        this.getPaymentPlanSuspended(customerExternalReference);
      });
  }

  private getPaymentPlanSuspended(customerExternalReference: any) {
    this.paymentService.getPaymentPlanByCustomer("SUSPENDED", customerExternalReference)
      .subscribe(async (paymentPlan) => {
        let retryPaymentOpen = await this.checkRetryPayment(paymentPlan.externalReference);
        if (retryPaymentOpen) {
          this.$location.path(`/payment-request/${paymentPlan.externalReference}`);
        } else {
          this.getPaymentPlanActiveOrStopped(customerExternalReference);
        }
      }, (error) => {
        this.getPaymentPlanActiveOrStopped(customerExternalReference);
      });
  }

  private getPaymentPlanActiveOrStopped(customerExternalReference: any) {
    this.paymentService.getPaymentPlanByCustomer("ACTIVE", customerExternalReference)
      .subscribe((paymentPlan) => {
        this.setPaymentPlanData(paymentPlan);
      }, (error) => {
        this.paymentService.getPaymentPlanByCustomer("STOPPED", customerExternalReference)
          .subscribe(async (paymentPlan) => {
            let retryPaymentOpen = await this.checkRetryPayment(paymentPlan.externalReference);
            if (retryPaymentOpen) {
              this.$location.path(`/payment-request/${paymentPlan.externalReference}`);
            } else {
              this.setPaymentPlanData(paymentPlan);
            }
          }, (error) => {
            this.$state.go("homepage");
          });
      });
  }

  private async checkRetryPayment(paymentPlanExternalReference) {
    return new Promise(resolve => {
      return this.paymentService.getRetryPayment(paymentPlanExternalReference)
        .subscribe(() => {
          resolve(true);
        },(error) => {
          resolve(false);
        });
    });
  }

  private setPaymentPlanData = (paymentPlan) => {
    this.planExternalReference = paymentPlan.externalReference;
    this.status = paymentPlan.status.toLowerCase();
    this.deliveryDate = this.dateService.calculateDeliveryDate(paymentPlan.deliveryDate);
    this.deliveryMonth = this.dateService.calculateDeliveryMonth(paymentPlan.deliveryDate);
    this.deliveryDay = paymentPlan.deliveryDate[2];
    this.daysSubscribed = 30 * paymentPlan.recurringMonths;
    this.recurringMonths = paymentPlan.recurringMonths;
    this.recurringAmount = paymentPlan.recurringAmount;
    this.setStatus();
    this.getBlend(paymentPlan.externalReference);
  }

  private splitExplanation = (explanations) => {
    if (explanations !== null) {
      let explanationArray = explanations.split("~").filter(explanation => explanation != "");
      if (explanationArray.length >= 2) {
        explanationArray = explanationArray.filter(explanation => !explanation.includes("onderwerp"));
      }
      return explanationArray;
    } else {
      return [""];
    }
  }

  private getIngredients = () => {
    let vitamines = [];
    this.blendService.getBlendIngredientsByExternalReference(this.UserManager.getBlendExternalReference())
      .subscribe((blendIngredients) => {
        this.amountOfIngredients = blendIngredients.filter(blendIngredient => blendIngredient.amount > 0.00).length;
        this.priceOfIngredients = blendIngredients.filter(blendIngredient => blendIngredient.amount > 0.00).reduce((a, b) => a + b.price, 0);

        blendIngredients.forEach((blendIngredient) => {

          this.ingredientService.getById(blendIngredient.ingredientId)
            .subscribe((ingredient) => {
              vitamines.push({
                id: ingredient.id,
                ingredientId: blendIngredient.ingredientId,
                description: ingredient.description,
                explanation: this.splitExplanation(blendIngredient.explanation)[0],
                code: ingredient.code,
                title: ingredient.name,
                image: `/assets/image/capsules/${ingredient.code}.jpg`,
                price: blendIngredient.price,
                isActive: ingredient.isActive,
              });
            });
        });
        this.vitamines = vitamines;
      });
  }

  private getUsageGoals = () => {
    let usageGoalList = [];
    if (this.UserManager.getQuizExternalReference()) {
      this.quizService.getQuestionAnswers(this.UserManager.getQuizExternalReference(), "usage-goals")
        .subscribe((usageGoals) => {
          usageGoals.forEach((usageGoalAnswer) => {
            this.quizService.getCategoryAnswerById("usage-goals", usageGoalAnswer.usageGoalId)
              .subscribe((usageGoal) => {
                usageGoal['class'] = "icon-".concat(usageGoal.code);
                usageGoalList.push(usageGoal);
              });
          });
        });
      this.usageGoalList = usageGoalList;
    }
  }

  private getTrackTrace = (customerExternalReference) => {
    this.postnlService.getLatestTrackTrace(customerExternalReference)
      .subscribe((response) => {
        this.trackTraceLink = response.trackTraceLink;
      },(error) => {
        if (error.status !== 404) {
          this.toast.show("Er is iets misgegaan bij het ophalen van de track & trace, probeer het later nog eens", "error");
        }
      });
  }

  private getCustomerData = (customerExternalReference) => {
    this.getCustomer(customerExternalReference);
    this.getPaymentPlan(customerExternalReference);
  }

  private getBlendData = () => {
    this.getIngredients();
    this.getUsageGoals();
  }

  private setStatus = () => {
    if (this.status === 'active') {
      this.blendStatus = 'Actief';
      this.disabledActivation = true;
    } else {
      this.blendStatus = 'Pauze';
    }
  }

  public startQuiz = function () {
    this.$state.go("quiz-v2");
  };

  public toggleDomainMenu = () => {
    this.domainMenuVisible = !this.domainMenuVisible;
  };

  public scrollToOrders = () => {
    this.domainMenuVisible = false;
    const trackTrace = document.getElementById("track-trace");
    trackTrace.scrollIntoView({ behavior: 'smooth' });
  }

  private buildReferralButton = (referralCode) => {
    let url = "https://api.whatsapp.com/send?text=Hi,%20wil%20jij%20ook%20aan%20je%20gezondheidsdoelen%20werken%3F%20Dan%20heb%20ik%20iets%20leuks%20voor%20je%3A%20%E2%82%AC%2010%20korting%20op%20je%20eerste%20Viteezy%20vitamineplan%20op%20maat!%20Ga%20naar%20www.viteezy.nl%2C%20maak%20binnen%20een%20paar%20minuten%20de%20vitaminetest%20en%20vul%20mijn%20code%3A%20" + referralCode + "%20in%20om%20je%20korting%20te%20ontvangen.%20Isn%E2%80%99t%20that%20what%20friends%20are%20for%3F%20";
    (document.getElementById("referral-button") as HTMLAnchorElement).href = url;
  }

  public toggleReferralPage = () => {
    this.referralPageVisible = !this.referralPageVisible;
    this.buildReferralButton(this.customer.referralCode);
  };

  public activateBlend = () => {
    this.paymentService.reactivatePaymentPlan(this.planExternalReference)
      .subscribe(() => {
        this.toast.show("Blend geactiveerd", "info");
        this.getPaymentPlan(this.UserManager.getCustomerExternalReference());
      }, (error) => {
        if (error.status === 404) {
          this.$state.go("blend", { blendStep: 2 });
        } else {
          this.toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
        }
      });
  };

}

angular.
  module('domainHome', [])
    .directive('domainHome', downgradeComponent({component: DomainHomeComponent}) as angular.IDirectiveFactory);

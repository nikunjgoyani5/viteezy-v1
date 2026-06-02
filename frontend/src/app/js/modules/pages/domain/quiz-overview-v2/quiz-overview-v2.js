"use strict";

angular.module("app.pages.domain.quiz-overview-v2", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("quizoverviewv2", {
        url: "/domain/quiz-overview-v2",
        controller: "QuizOverviewV2Controller",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/domain/quiz-overview-v2/quiz-overview-v2.html",
        role: "user"
      });
  }])

  .controller("QuizOverviewV2Controller", ["Blend", "ngDialog", "RenderBlend", "IngredientReason", "toast", "UserManager", "$state", "$timeout", function (Blend, ngDialog, RenderBlend, IngredientReason, toast, UserManager, $state, $timeout) {
    const openPopupDataLayer = ((ingredient) => {
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          items: [{
            item_name: ingredient.name,
            item_id: ingredient.id,
            quantity: 1
          }],
        },
        userId: UserManager.getCustomerExternalReference()
      });
    });

    this.openIngredientPopup = ((identifier, ingredient) => {
      if (ingredient.sku !== null) {
        return false;
      }
      IngredientReason.setIngredient(ingredient);
      ngDialog.open({
        name: "ingredient-slide-left",
        trapFocus: false,
        template: 'app/js/modules/dialogues/ingredients/ingredient.html',
        controller: "IngredientPopupController",
        controllerAs: "vm",
        className: "ingredient-slide-left",
      });
      openPopupDataLayer(ingredient);
    });

    const isPreview = true;
    const isBlendV2 = true;

    const getBlendRecommendation = () => {
      this.proteines = {};
      this.vitamines = RenderBlend.renderBlend(isPreview, isBlendV2);
    };

    getBlendRecommendation();

    this.updateBlendWithPreview = () => {
      Blend.updateWithQuizAnswers({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise
        .then(() => {
          $timeout(1000).then(() => {
            $state.go("domainblend");
            toast.show("De aanpassingen zijn opgeslagen", "success");
          });
        })
        .catch(err => {
          if (err.status === 409) {
            $state.go("domainblend");
            toast.show("De aanpassingen zijn opgeslagen", "success");
          } else if (err.status === 404) {
            $state.go("blend", { blendStep: 2 });
          } else {
            console.error(err);
            toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
          }
        })
    };
  }]);

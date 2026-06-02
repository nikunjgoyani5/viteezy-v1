import 'angular-resource';
import 'angular-ui-router';
import 'angular-ui-carousel';
import 'ng-dialog';

// resources
import './js/modules/resources/blend';
import './js/modules/resources/content';
import './js/modules/resources/coupon';
import './js/modules/resources/customer';
import './js/modules/resources/incentive';
import './js/modules/resources/ingredient';
import './js/modules/resources/klaviyo';
import './js/modules/resources/login';
import './js/modules/resources/payment';
import './js/modules/resources/postnl';
import './js/modules/resources/pricing';
import './js/modules/resources/quiz';

// user-manager
import './js/modules/user-manager/index';

// pages
import './js/modules/pages/blend/blend';
import './js/modules/pages/blog/blog';
import './js/modules/pages/domain/blend/blend';
import './js/modules/pages/domain/customer-data/customer-data';
import './js/modules/pages/domain/domain-service';
import './js/modules/pages/domain/quiz-overview-v2/quiz-overview-v2';
import './js/modules/pages/domain/stop-membership/stop-membership-discount';
import './js/modules/pages/domain/stop-membership/stop-membership-pause';
import './js/modules/pages/domain/stop-membership/stop-membership-really';
import './js/modules/pages/domain/stop-membership/stop-membership';
import './js/modules/pages/quiz-v2/quiz-v2';
import './js/modules/pages/quiz/quiz';

// upgrade
import './features/pages/about/about.component';
import './features/pages/blend/blend.component';
import './features/pages/bundle/bundle.component';
import './features/pages/confirmed/confirmed.component';
import './features/pages/home/home.component';
import './features/pages/payment-request/payment-request.component';
import './features/pages/privacy/privacy.component';
import './features/pages/product/product.component';
import './features/pages/shop/shop.component';
import './features/pages/terms/terms.component';

import './features/pages/domain/delivery-date/delivery-date.component';
import './features/pages/domain/domain-home/domain-home.component';
import './features/pages/domain/login/login.component';

// quiz-pages
import './js/modules/pages/quiz-v2/quiz-pages/brewing/brewing';
import './js/modules/pages/quiz-v2/quiz-pages/firstname-information/firstname-information';
import './js/modules/pages/quiz-v2/quiz-pages/introduce/introduce';
import './js/modules/pages/quiz-v2/quiz-pages/lifestyle-information/lifestyle-information';
import './js/modules/pages/quiz-v2/quiz-pages/tree-planting/tree-planting';
import './js/modules/pages/quiz-v2/quiz-pages/vitamin-opinion-information/vitamin-opinion-information';
import './js/modules/pages/quiz-v2/quiz-pages/welcome/welcome';

// quiz-questions
import './js/modules/pages/quiz-v2/quiz-questions/acne-place/acne-place';
import './js/modules/pages/quiz-v2/quiz-questions/allergy-types/allergy-types';
import './js/modules/pages/quiz-v2/quiz-questions/amount-of-dairy-consumption/amount-of-dairy-consumption';
import './js/modules/pages/quiz-v2/quiz-questions/amount-of-fiber-consumption/amount-of-fiber-consumption';
import './js/modules/pages/quiz-v2/quiz-questions/amount-of-fish-consumption/amount-of-fish-consumption';
import './js/modules/pages/quiz-v2/quiz-questions/amount-of-fruit-consumption/amount-of-fruit-consumption';
import './js/modules/pages/quiz-v2/quiz-questions/amount-of-meat-consumption/amount-of-meat-consumption';
import './js/modules/pages/quiz-v2/quiz-questions/amount-of-protein-consumption/amount-of-protein-consumption';
import './js/modules/pages/quiz-v2/quiz-questions/amount-of-vegetable-consumption/amount-of-vegetable-consumption';
import './js/modules/pages/quiz-v2/quiz-questions/attention-focus/attention-focus';
import './js/modules/pages/quiz-v2/quiz-questions/attention-state/attention-state';
import './js/modules/pages/quiz-v2/quiz-questions/average-sleeping-hours/average-sleeping-hours';
import './js/modules/pages/quiz-v2/quiz-questions/binge-eating-reason/binge-eating-reason';
import './js/modules/pages/quiz-v2/quiz-questions/binge-eating/binge-eating';
import './js/modules/pages/quiz-v2/quiz-questions/birth-health/birth-health';
import './js/modules/pages/quiz-v2/quiz-questions/children-wish/children-wish';
import './js/modules/pages/quiz-v2/quiz-questions/current-libido/current-libido';
import './js/modules/pages/quiz-v2/quiz-questions/daily-four-coffee/daily-four-coffee';
import './js/modules/pages/quiz-v2/quiz-questions/daily-six-alcoholic-drinks/daily-six-alcoholic-drinks';
import './js/modules/pages/quiz-v2/quiz-questions/date-of-birth/date-of-birth';
import './js/modules/pages/quiz-v2/quiz-questions/diet-intolerances/diet-intolerances';
import './js/modules/pages/quiz-v2/quiz-questions/diet-type/diet-type';
import './js/modules/pages/quiz-v2/quiz-questions/digestion-amount/digestion-amount';
import './js/modules/pages/quiz-v2/quiz-questions/digestion-occurrence/digestion-occurrence';
import './js/modules/pages/quiz-v2/quiz-questions/dry-skin/dry-skin';
import './js/modules/pages/quiz-v2/quiz-questions/eastern-medicine-opinion/eastern-medicine-opinion';
import './js/modules/pages/quiz-v2/quiz-questions/email/email';
import './js/modules/pages/quiz-v2/quiz-questions/energy-state/energy-state';
import './js/modules/pages/quiz-v2/quiz-questions/firstname/firstname';
import './js/modules/pages/quiz-v2/quiz-questions/genders/genders';
import './js/modules/pages/quiz-v2/quiz-questions/hair-type/hair-type';
import './js/modules/pages/quiz-v2/quiz-questions/health-complaints/health-complaints';
import './js/modules/pages/quiz-v2/quiz-questions/healthy-lifestyle/healthy-lifestyle';
import './js/modules/pages/quiz-v2/quiz-questions/help-goal/help-goal';
import './js/modules/pages/quiz-v2/quiz-questions/iron-prescribed/iron-prescribed';
import './js/modules/pages/quiz-v2/quiz-questions/lack-of-concentration/lack-of-concentration';
import './js/modules/pages/quiz-v2/quiz-questions/libido-stress-level/libido-stress-level';
import './js/modules/pages/quiz-v2/quiz-questions/lose-weight-challenge/lose-weight-challenge';
import './js/modules/pages/quiz-v2/quiz-questions/menstruation-interval/menstruation-interval';
import './js/modules/pages/quiz-v2/quiz-questions/menstruation-mood/menstruation-mood';
import './js/modules/pages/quiz-v2/quiz-questions/menstruation-side-issue/menstruation-side-issue';
import './js/modules/pages/quiz-v2/quiz-questions/mental-fitness/mental-fitness';
import './js/modules/pages/quiz-v2/quiz-questions/nail-improvement/nail-improvement';
import './js/modules/pages/quiz-v2/quiz-questions/new-product-available/new-product-available';
import './js/modules/pages/quiz-v2/quiz-questions/often-having-flu/often-having-flu';
import './js/modules/pages/quiz-v2/quiz-questions/pregnancy-state/pregnancy-state';
import './js/modules/pages/quiz-v2/quiz-questions/present-at-crowded-places/present-at-crowded-places';
import './js/modules/pages/quiz-v2/quiz-questions/primary-goal/primary-goal';
import './js/modules/pages/quiz-v2/quiz-questions/skin-problem/skin-problem';
import './js/modules/pages/quiz-v2/quiz-questions/skin-type/skin-type';
import './js/modules/pages/quiz-v2/quiz-questions/sleep-hours-less-than-seven/sleep-hours-less-than-seven';
import './js/modules/pages/quiz-v2/quiz-questions/sleep-quality/sleep-quality';
import './js/modules/pages/quiz-v2/quiz-questions/smokes/smokes';
import './js/modules/pages/quiz-v2/quiz-questions/sport-amount/sport-amount';
import './js/modules/pages/quiz-v2/quiz-questions/sport-reason/sport-reason';
import './js/modules/pages/quiz-v2/quiz-questions/stress-level-at-end-of-day/stress-level-at-end-of-day';
import './js/modules/pages/quiz-v2/quiz-questions/stress-level-condition/stress-level-condition';
import './js/modules/pages/quiz-v2/quiz-questions/stress-level/stress-level';
import './js/modules/pages/quiz-v2/quiz-questions/thirty-minutes-of-sun/thirty-minutes-of-sun';
import './js/modules/pages/quiz-v2/quiz-questions/tired-when-wake-up/tired-when-wake-up';
import './js/modules/pages/quiz-v2/quiz-questions/training-intensively/training-intensively';
import './js/modules/pages/quiz-v2/quiz-questions/transition-period-complaints/transition-period-complaints';
import './js/modules/pages/quiz-v2/quiz-questions/trouble-falling-asleep/trouble-falling-asleep';
import './js/modules/pages/quiz-v2/quiz-questions/type-of-training/type-of-training';
import './js/modules/pages/quiz-v2/quiz-questions/urinary-infection/urinary-infection';
import './js/modules/pages/quiz-v2/quiz-questions/usage-goals/usage-goals';
import './js/modules/pages/quiz-v2/quiz-questions/vitamin-intake/vitamin-intake';
import './js/modules/pages/quiz-v2/quiz-questions/vitamin-opinion/vitamin-opinion';
import './js/modules/pages/quiz-v2/quiz-questions/weekly-twelve-alcoholic-drinks/weekly-twelve-alcoholic-drinks';

// elements
import './js/modules/elements/characteristics/characteristics';
import './js/modules/elements/customer-data/customer-data';
import './js/modules/elements/customizable-blend-overview/customizable-blend-overview';
import './js/modules/elements/footer/footer';
import './js/modules/elements/ingredient-table/ingredient-table';
import './js/modules/elements/navigation/navigation';
import './js/modules/elements/pricing/pricing';
import './js/modules/elements/progress/progress';
import './js/modules/elements/quiz-buttons/quiz-buttons';
import './js/modules/elements/referral/referral';
import './js/modules/elements/review/review';
import './js/modules/elements/trustpilot/trustpilot';
import './js/modules/elements/visual-cta-also-interesting/visual-cta-also-interesting';
import './js/modules/elements/visual-cta/visual-cta';

// shared
import './js/modules/shared/toast/toast';

//filters
import './js/modules/shared/filters/paymentstatus';
import './js/modules/shared/filters/showNoAnswerFirst';
import './js/modules/shared/filters/textfirst';

// dialogues
import './js/modules/dialogues/checkout/capsule';
import './js/modules/dialogues/ingredients/ingredients';

// static
import './js/modules/static/blend-manager/blend-manager';
import './js/modules/static/ingredient-reason/ingredient-reason';
import './js/modules/static/quiz-animation/quiz-animation';
import './js/modules/static/render-blend/render-blend';

export default angular.module("app", [
  "ngResource",
  "ui.router",
  "ui.carousel",
  "ngDialog",
  "app.user-manager",
  // resources
  "app.resources.blend",
  "app.resources.content",
  "app.resources.coupon",
  "app.resources.customer",
  "app.resources.incentive",
  "app.resources.ingredient",
  "app.resources.klaviyo",
  "app.resources.login",
  "app.resources.payment",
  "app.resources.postnl",
  "app.resources.pricing",
  "app.resources.quiz",
  // user-manager
  "app.user-manager",
  // pages
  "app.pages.blend",
  "app.pages.blog",
  "app.pages.domain.blend",
  "app.pages.domain.customer-data",
  "app.pages.domain.domain-service",
  "app.pages.domain.quiz-overview-v2",
  "app.pages.domain.stop-membership-discount",
  "app.pages.domain.stop-membership-pause",
  "app.pages.domain.stop-membership-really",
  "app.pages.domain.stop-membership",
  "app.pages.quiz-v2",
  "app.pages.quiz",
  // upgrade
  "about",
  "blend",
  "bundle",
  "confirmed",
  "home",
  "paymentRequest",
  "privacy",
  "product",
  "shop",
  "terms",
  // Domain
  "deliveryDate",
  "domainHome",
  "login",
  // quiz-pages  
  "app.pages.quiz-v2.brewing",
  "app.pages.quiz-v2.firstname-information",
  "app.pages.quiz-v2.introduce",
  "app.pages.quiz-v2.lifestyle-information",
  "app.pages.quiz-v2.tree-planting",
  "app.pages.quiz-v2.vitamin-opinion-information",
  "app.pages.quiz-v2.welcome",
  // quiz-questions
  "app.pages.quiz-v2.acne-place",
  "app.pages.quiz-v2.allergy-types",
  "app.pages.quiz-v2.amount-of-dairy-consumption",
  "app.pages.quiz-v2.amount-of-fiber-consumption",
  "app.pages.quiz-v2.amount-of-fish-consumption",
  "app.pages.quiz-v2.amount-of-fruit-consumption",
  "app.pages.quiz-v2.amount-of-meat-consumption",
  "app.pages.quiz-v2.amount-of-protein-consumption",
  "app.pages.quiz-v2.amount-of-vegetable-consumption",
  "app.pages.quiz-v2.attention-focus",
  "app.pages.quiz-v2.attention-state",
  "app.pages.quiz-v2.average-sleeping-hours",
  "app.pages.quiz-v2.binge-eating-reason",
  "app.pages.quiz-v2.binge-eating",
  "app.pages.quiz-v2.birth-health",
  "app.pages.quiz-v2.children-wish",
  "app.pages.quiz-v2.current-libido",
  "app.pages.quiz-v2.daily-four-coffee",
  "app.pages.quiz-v2.daily-six-alcoholic-drinks",
  "app.pages.quiz-v2.date-of-birth",
  "app.pages.quiz-v2.diet-intolerances",
  "app.pages.quiz-v2.diet-type",
  "app.pages.quiz-v2.digestion-amount",
  "app.pages.quiz-v2.digestion-occurrence",
  "app.pages.quiz-v2.dry-skin",
  "app.pages.quiz-v2.eastern-medicine-opinion",
  "app.pages.quiz-v2.email",
  "app.pages.quiz-v2.energy-state",
  "app.pages.quiz-v2.firstname",
  "app.pages.quiz-v2.genders",
  "app.pages.quiz-v2.hair-type",
  "app.pages.quiz-v2.health-complaints",
  "app.pages.quiz-v2.healthy-lifestyle",
  "app.pages.quiz-v2.help-goal",
  "app.pages.quiz-v2.iron-prescribed",
  "app.pages.quiz-v2.lack-of-concentration",
  "app.pages.quiz-v2.libido-stress-level",
  "app.pages.quiz-v2.lose-weight-challenge",
  "app.pages.quiz-v2.menstruation-interval",
  "app.pages.quiz-v2.menstruation-mood",
  "app.pages.quiz-v2.menstruation-side-issue",
  "app.pages.quiz-v2.mental-fitness",
  "app.pages.quiz-v2.nail-improvement",
  "app.pages.quiz-v2.new-product-available",
  "app.pages.quiz-v2.often-having-flu",
  "app.pages.quiz-v2.pregnancy-state",
  "app.pages.quiz-v2.present-at-crowded-places",
  "app.pages.quiz-v2.primary-goal",
  "app.pages.quiz-v2.skin-problem",
  "app.pages.quiz-v2.skin-type",
  "app.pages.quiz-v2.sleep-hours-less-than-seven",
  "app.pages.quiz-v2.sleep-quality",
  "app.pages.quiz-v2.smokes",
  "app.pages.quiz-v2.sport-amount",
  "app.pages.quiz-v2.sport-reason",
  "app.pages.quiz-v2.stress-level-at-end-of-day",
  "app.pages.quiz-v2.stress-level-condition",
  "app.pages.quiz-v2.stress-level",
  "app.pages.quiz-v2.thirty-minutes-of-sun",
  "app.pages.quiz-v2.tired-when-wake-up",
  "app.pages.quiz-v2.training-intensively",
  "app.pages.quiz-v2.transition-period-complaints",
  "app.pages.quiz-v2.trouble-falling-asleep",
  "app.pages.quiz-v2.type-of-training",
  "app.pages.quiz-v2.urinary-infection",
  "app.pages.quiz-v2.usage-goals",
  "app.pages.quiz-v2.vitamin-intake",
  "app.pages.quiz-v2.vitamin-opinion",
  "app.pages.quiz-v2.weekly-twelve-alcoholic-drinks",
  // elements
  "app.elements.characteristics",
  "app.elements.customer-data",
  "app.elements.customizable-blend-overview",
  "app.elements.footer",
  "app.elements.ingredient-table",
  "app.elements.navigation",
  "app.elements.pricing",
  "app.elements.progress",
  "app.elements.quiz-buttons",
  "app.elements.referral",
  "app.elements.review",
  "app.elements.trustpilot",
  "app.elements.visual-cta-also-interesting",
  "app.elements.visual-cta",
  // shared
  "app.shared.toast",
  // filters
  "app.shared.filters.translate-payment-status",
  "app.shared.filters.show-no-answer-first",
  "app.shared.filters.order-text-first",
  // dialogues
  "app.dialogues.capsule",
  "app.dialogues.ingredients",
  // static
  "app.static.blend-manager",
  "app.static.ingredient-reason",
  "app.static.quiz-animation",
  "app.static.render-blend"
]);

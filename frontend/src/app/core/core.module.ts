import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BlendService } from './services/blend.service';
import { BundleService } from './services/bundle.service';
import { ContentService } from './services/content.service';
import { CustomerService } from './services/customer.service';
import { DateService } from './utility/date.service';
import { IngredientService } from './services/ingredient.service';
import { KlaviyoService } from './services/klaviyo.service';
import { LoginService } from './services/login.service';
import { PaymentService } from './services/payment.service';
import { PostNLService } from './services/postnl.service';
import { PricingService } from './services/pricing.service';
import { QuizService } from './services/quiz.service';
import { StrapiService } from './services/strapi.service';
import { CouponService } from './services/coupon.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    BlendService,
    BundleService,
    ContentService,
    CouponService,
    CustomerService,
    DateService,
    IngredientService,
    KlaviyoService,
    LoginService,
    PaymentService,
    PostNLService,
    PricingService,
    QuizService,
    StrapiService
  ],
  bootstrap: []
})
export class CoreModule { }
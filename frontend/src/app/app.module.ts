import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgradeModule } from '@angular/upgrade/static';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';

import { ToastServiceProvider, LocationProvider, UIRouterStateParamsProvider, UIRouterStateProvider, UserManagerServiceProvider, RootScopeProvider, NgDialogProvider, BlendManagerProvider, IngredientReasonProvider  } from "./ajs-upgraded-providers";

import { AboutComponent } from './features/pages/about/about.component';
import { BlendComponent } from './features/pages/blend/blend.component';
import { BlendProgressComponent } from './features/elements/blend-progress/blend-progress.component';
import { BundleComponent } from './features/pages/bundle/bundle.component';
import { ConfirmedComponent } from './features/pages/confirmed/confirmed.component';
import { HomeComponent } from './features/pages/home/home.component';
import { PaymentRequestComponent } from './features/pages/payment-request/payment-request.component';
import { PricingComponent } from './features/elements/pricing/pricing.component';
import { ProductComponent } from './features/pages/product/product.component';
import { ReviewsComponent } from './features/elements/reviews/reviews.component';
import { ShopComponent } from './features/pages/shop/shop.component';
import { TrustpilotComponent } from './features/elements/trustpilot/trustpilot.component';

import { DeliveryDateComponent } from './features/pages/domain/delivery-date/delivery-date.component';
import { DomainHomeComponent } from './features/pages/domain/domain-home/domain-home.component';
import { LoginComponent } from './features/pages/domain/login/login.component';
import { ShoppingCartComponent } from './features/elements/shopping-cart/shopping-cart.component';
import { IngredientDialogComponent } from './features/dialogs/ingredient/ingredient.component';
import { AdditionalProductsComponent } from './features/dialogs/additional-products/additional-products.component';
import { InactiveIngredientsWarningComponent } from './features/dialogs/inactive-ingredients-warning/inactive-ingredients-warning.component';


@NgModule({
  declarations: [
    AboutComponent,
    BlendComponent,
    BlendProgressComponent,
    BundleComponent,
    ConfirmedComponent,
    HomeComponent,
    PaymentRequestComponent,
    PricingComponent,
    ProductComponent,
    ReviewsComponent,
    ShopComponent,
    ShoppingCartComponent,
    IngredientDialogComponent,
    AdditionalProductsComponent,
    InactiveIngredientsWarningComponent,
    TrustpilotComponent,
    // Domain
    DeliveryDateComponent,
    DomainHomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UpgradeModule,
    FormsModule,
    CoreModule,
    MaterialModule
  ],
  providers: [
    BlendManagerProvider,
    IngredientReasonProvider,
    LocationProvider,
    NgDialogProvider, 
    RootScopeProvider, 
    ToastServiceProvider,
    UIRouterStateParamsProvider,
    UIRouterStateProvider,
    UserManagerServiceProvider,
  ],
  bootstrap: []
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.documentElement, ['app']);
  }
}

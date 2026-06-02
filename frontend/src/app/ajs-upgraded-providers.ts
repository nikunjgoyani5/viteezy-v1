import { InjectionToken } from "@angular/core";

export const UIRouterState = new InjectionToken("UIRouterState");

export function uiRouterStateServiceFactory(i: any) {
  return i.get('$state');
}

export const UIRouterStateProvider = {
  provide: UIRouterState,
  useFactory: uiRouterStateServiceFactory,
  deps: ['$injector']
};

export const UIRouterStateParams = new InjectionToken("UIRouterStateParams");

export function uiRouterStateParamsServiceFactory(i: any) {
  return i.get('$stateParams');
}

export const UIRouterStateParamsProvider = {
  provide: UIRouterStateParams,
  useFactory: uiRouterStateParamsServiceFactory,
  deps: ['$injector']
};

export const Toast = new InjectionToken("Toast");

export function toastServiceFactory(i: any) {
  return i.get('toast');
}

export const ToastServiceProvider = {
  provide: Toast,
  useFactory: toastServiceFactory,
  deps: ['$injector']
};

export const UserManager = new InjectionToken("UserManager");

export function userManagerServiceFactory(i: any) {
  return i.get('UserManager');
}

export const UserManagerServiceProvider = {
  provide: UserManager,
  useFactory: userManagerServiceFactory,
  deps: ['$injector']
};

export const Location = new InjectionToken("Location");

export function locationServiceFactory(i: any) {
  return i.get('$location');
}

export const LocationProvider = {
  provide: Location,
  useFactory: locationServiceFactory,
  deps: ['$injector']
};

export const RootScope = new InjectionToken("RootScope");

export function rootScopeServiceFactory(i: any) {
  return i.get('$rootScope');
}

export const RootScopeProvider = {
  provide: RootScope,
  useFactory: rootScopeServiceFactory,
  deps: ['$injector']
};

export const NgDialog = new InjectionToken("NgDialog");

export function ngDialogServiceFactory(i: any) {
  return i.get('ngDialog');
}

export const NgDialogProvider = {
  provide: NgDialog,
  useFactory: ngDialogServiceFactory,
  deps: ['$injector']
};

export const BlendManager = new InjectionToken("BlendManager");

export function blendManagerServiceFactory(i: any) {
  return i.get('BlendManager');
}

export const BlendManagerProvider = {
  provide: BlendManager,
  useFactory: blendManagerServiceFactory,
  deps: ['$injector']
};

export const IngredientReason = new InjectionToken("IngredientReason");

export function ingredientReasonServiceFactory(i: any) {
  return i.get('IngredientReason');
}

export const IngredientReasonProvider = {
  provide: IngredientReason,
  useFactory: ingredientReasonServiceFactory,
  deps: ['$injector']
};
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@demo/wish-app/feature-home').then((m) => m.FeatureHomeModule),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('@demo/wish-app/feature-manage-list').then(
        (m) => m.FeatureManageListModule
      ),
  },
  {
    path: 'auth-merch',
    loadComponent: () =>
      import('@demo/wish-app/feature-auth-merch').then(
        (m) => m.AuthMerchComponent
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('@demo/wish-app/feature-public-list').then(
        (m) => m.FeaturePublicListModule
      ),
  },
];

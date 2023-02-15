import { HeroIconName } from "ng-heroicons";

export abstract class AuthConfig { 
  applicationLogoUrl?: string;
  googleAuthUrl?: string;
  signInMerchUrl?: string;
  appName!: string;

  signInSuccessRoute?: string;

  termsOfServiceUrl?: string;

  baseApi!: string;

  permissions!: AuthConfigPermissionSection[];

  features?: {
    teams: string[]
  };

  merchRef?: any
}

export interface AuthConfigPermissionSection {
  title: string;

  icon: HeroIconName;

  permissions: AuthConfigPermission[]
}

export interface AuthConfigPermission {
  name: string;

  desc: string;

  value: string;
}
export class AuthServerConfig {
    appName: string;
    appLogo: string;
    appBasePath: string;
    appHost: string;
    baseApi: string;
    userDefaultPermissions: string[];

    account?: {
        plans: Record<string, string>;
        planTypes: Record<string, string>;

        defaultPlan: string;

        planIdMapper: (plan: string, planType: string) => string;
    }
}
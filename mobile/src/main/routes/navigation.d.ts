export declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthenticationRoutes, DashboardRoutes {}
  }
}

export type AuthenticationRoutes = {
  signIn: undefined;
  signUp: undefined;
}

export type DashboardRoutes = {
  dashboard: undefined;
}

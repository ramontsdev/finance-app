import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth-context";
import { LoadingScreen } from "../../presentation/components/loading-screen";
import { AuthenticationStackRoutes } from "./authentication-stack-routes";
import { DashboardStackRoutes } from "./dashboard-stack-routes";

export function Routes() {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading && !isSignedIn)
    return <LoadingScreen />

  return (
    <NavigationContainer>
      {isSignedIn && (<DashboardStackRoutes />)}
      {!isSignedIn && (<AuthenticationStackRoutes />)}
    </NavigationContainer>
  );
};

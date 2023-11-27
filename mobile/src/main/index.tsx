import { NavigationContainer } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Toast from 'react-native-toast-message'
import { ThemeProvider } from "styled-components"
import { AuthContext, AuthProvider } from "../contexts/auth-context"
import { AuthenticationStackRoutes } from "./routes/authentication-stack-routes"
import { DashboardStackRoutes } from "./routes/dashboard-stack-routes"
import { GlobalContainer } from "./styles"
import { defaultTheme } from "./theme/default-theme"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export function Main() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GlobalContainer>

            <AuthContext.Consumer>
              {({ isSignedIn }) => (
                <NavigationContainer>
                  {isSignedIn && (<DashboardStackRoutes />)}
                  {!isSignedIn && (<AuthenticationStackRoutes />)}
                </NavigationContainer>
              )}
            </AuthContext.Consumer>

            <Toast />
          </GlobalContainer>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StatusBar } from "react-native"
import Toast from 'react-native-toast-message'
import { ThemeProvider } from "styled-components"
import { AuthProvider } from "../contexts/auth-context"
import { Routes } from "./routes"
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
          <StatusBar
            barStyle={"light-content"}
            backgroundColor={defaultTheme.colors.gray.default}
          />
          <Routes />
          <Toast />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

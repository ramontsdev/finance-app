import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignInScreen } from "../../presentation/screens/authentication/sign-in"
import { SignUpScreen } from "../../presentation/screens/authentication/sign-up"

const Stack = createNativeStackNavigator()

export function AuthenticationStackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="signIn"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="signIn"
        component={SignInScreen}
      />
      <Stack.Screen
        name="signUp"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  )
}

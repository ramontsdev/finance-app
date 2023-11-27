import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dashboard } from "../../presentation/screens/dashboard"

const Stack = createNativeStackNavigator()

export function DashboardStackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
      />
    </Stack.Navigator>
  )
}

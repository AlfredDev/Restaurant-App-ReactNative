import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Login } from "./src/screens/Login";
import { MainContainer } from "./src/screens/MainContainer";
import { MesasConfig } from "./src/screens/MesasConfig";
import { TablesScreen } from "./src/screens/TablesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="MesaConfig" component={MesasConfig} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

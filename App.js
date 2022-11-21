import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./src/hooks/UserProvider";
import { AddAccount } from "./src/screens/AddAccount";
import { AddOrden } from "./src/screens/AddOrden";
import { Login } from "./src/screens/Login";
import { MainContainer } from "./src/screens/MainContainer";
import { MesaCuenta } from "./src/screens/MesaCuenta";
import { MesasConfig } from "./src/screens/MesasConfig";
import { Ordenes } from "./src/screens/Ordenes";
import { Reservada } from "./src/screens/Reservada";
import { ImpCuenta } from "./src/screens/ImpCuenta";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainContainer" component={MainContainer} />
          <Stack.Screen name="MesaConfig" component={MesasConfig} />
          <Stack.Screen name="MesaCuenta" component={MesaCuenta} />
          <Stack.Screen name="AddCuenta" component={AddAccount} />
          <Stack.Screen name="Orden" component={Ordenes} />
          <Stack.Screen name="Reservada" component={Reservada} />
          <Stack.Screen name="AddOrden" component={AddOrden} />
          <Stack.Screen name="ImpCuenta" component={ImpCuenta} />

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

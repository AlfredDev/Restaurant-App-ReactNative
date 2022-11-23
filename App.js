import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./src/hooks/UserProvider";
import { AddAccount } from "./src/screens/AddAccount";
import { AddOrden } from "./src/screens/AddOrden";
import { Login } from "./src/screens/Login";
import { MainContainer } from "./src/screens/MainContainer";
import { MesaCuenta } from "./src/screens/MesaCuenta";
import { MesasConfig } from "./src/screens/MesasConfig";
import { ModificaUsuario } from "./src/screens/ModificaUsuario";
import { Ordenes } from "./src/screens/Ordenes";
import { ImpCuenta } from "./src/screens/ImpCuenta";
import { AddProducto } from "./src/screens/AddProducto";
import { AddInsumo } from "./src/screens/AddInsumo";

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
          <Stack.Screen name="AddOrden" component={AddOrden} />
          <Stack.Screen name="ImpCuenta" component={ImpCuenta} />
          <Stack.Screen name="modificaUsuario" component={ModificaUsuario} />
          <Stack.Screen name="AddProducto" component={AddProducto} />
          <Stack.Screen name="AddInsumo" component={AddInsumo} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

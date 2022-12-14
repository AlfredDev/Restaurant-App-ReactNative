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
import { OrdenBarman } from "./src/screens/TabScrens/OrdenBarman";
import { ImpCuenta } from "./src/screens/ImpCuenta";
import { AddProducto } from "./src/screens/AddProducto";
import { AddPlatillo } from "./src/screens/AddPlatillo";
import { AddInsumo } from "./src/screens/AddInsumo";
import { AgregarUsuario } from "./src/screens/AgregarUsuario";
import { SaleDaily } from "./src/screens/Graphs/SaleDaily";
import { ModificarProductos } from "./src/screens/ModificarProductos";
import { ModificarPlatillo } from "./src/screens/ModificarPlatillo";
import { ModificarInsumos } from "./src/screens/ModificarInsumos";
import { SemanalScreen } from "./src/screens/Graphs/SemanalScreen";
import { AnualScreen } from "./src/screens/Graphs/AnualScreen";
import { ComparaSemana } from "./src/screens/Graphs/ComparaSemana";
import { DownInsumos } from "./src/screens/DownInsumos";
import { DownProductos } from "./src/screens/DownProductos";


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
          <Stack.Screen name="AddPlatillo" component={AddPlatillo} />
          <Stack.Screen name="AddInsumo" component={AddInsumo} />
          <Stack.Screen name="AgregarUsuario" component={AgregarUsuario} />
          <Stack.Screen name="VentaDiaria" component={SaleDaily} />
          <Stack.Screen name="ModificarPlatillo" component={ModificarPlatillo} />
          <Stack.Screen name="ModificarProductos" component={ModificarProductos} />
          <Stack.Screen name="ModificarInsumos" component={ModificarInsumos} />
          <Stack.Screen name="OrdenBarman" component={OrdenBarman} />
          <Stack.Screen name="VentaSemanal" component={SemanalScreen} />
          <Stack.Screen name="VentaAnual" component={AnualScreen} />
          <Stack.Screen name="ComparaSemana" component={ComparaSemana} />
          <Stack.Screen name="DownInsumos" component={DownInsumos} />
          <Stack.Screen name="DownProductos" component={DownProductos} />


        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

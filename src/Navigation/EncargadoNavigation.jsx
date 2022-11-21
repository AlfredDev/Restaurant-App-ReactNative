import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../core/theme";
import { TablesScreen } from "../screens/TablesScreen";
import { Account } from "../screens/TabScrens/Account";
import { Graficas } from "../screens/TabScrens/Graficas";
import { Configuracion } from "../screens/TabScrens/Configuracion";
import { Productos } from "../screens/TabScrens/Productos";
import { Insumos } from "../screens/TabScrens/Insumos";
import { Usuarios } from "../screens/TabScrens/Usuarios";

const Tab = createBottomTabNavigator();

export const EncargadoNavigation = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName={"Mesas"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Mesas") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Productos") {
            iconName = focused ? "basket" : "basket-outline";
          } else if (rn === "Insumos") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (rn === "Usuarios") {
            iconName = focused ? "ios-people-sharp" : "ios-people-outline";
          }
          // You can return any component that you like here!
          return (
            <Ionicons name={iconName} size={size} color={color} fontSize={10} />
          );
        },
        headerShown: false,
        // tabBarStyle: { height: 80 },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: {
          paddingBottom: 20,
          fontSize: 12,
        },
        tabBarStyle: [
          { display: "flex" },
          { height: 100 },
          { alignItems: "center" },
          { paddingTop: 10 },
        ],
      })}
    >
      <Tab.Screen name="Mesas" component={TablesScreen} />
      <Tab.Screen name="Productos" component={Productos} />
      <Tab.Screen name="Insumos" component={Insumos} />
      <Tab.Screen name="Usuarios" component={Usuarios} />
    </Tab.Navigator>
  );
};

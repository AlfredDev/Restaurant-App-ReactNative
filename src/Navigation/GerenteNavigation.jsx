import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../core/theme";
import { TablesScreen } from "../screens/TablesScreen";
import { Account } from "../screens/TabScrens/Account";
import { Graficas } from "../screens/TabScrens/Graficas";
import { Configuracion } from "../screens/TabScrens/Configuracion";

const Tab = createBottomTabNavigator();

export const GerenteNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Mesas"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Mesas") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Orden") {
            iconName = focused ? "ios-clipboard" : "ios-clipboard-outline";
          } else if (rn === "Ajustes") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (rn === "Graficas") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
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
      <Tab.Screen name="Orden" component={Account} />
      <Tab.Screen name="Graficas" component={Graficas} />
      <Tab.Screen name="Ajustes" component={Configuracion} />
    </Tab.Navigator>
  );
};

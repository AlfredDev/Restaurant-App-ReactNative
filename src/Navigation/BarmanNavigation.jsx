import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../core/theme";
import { TablesScreen } from "../screens/TablesScreen";
import { OrdenBarman } from "../screens/TabScrens/OrdenBarman";
import { UserSetting } from "../screens/TabScrens/UserSetting";

const Tab = createBottomTabNavigator();

export const BarmanNavigation = () => {
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
          } else if (rn === "Usuario") {
            iconName = focused ? "person" : "person-outline";
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
      <Tab.Screen name="Orden" component={OrdenBarman} />
      <Tab.Screen name="Usuario" component={UserSetting} />
    </Tab.Navigator>
  );
};

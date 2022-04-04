import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "react-native-elements";

import RestaurantsStack from "./stacks/RestaurantsStack";
import FavoritesStack from "./stacks/FavoritesStack";
import AccountStack from "./stacks/AccountStack";

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName = "compass-outline";

  if (route.name === "favorite") {
    iconName = "heart-outline";
  }

  if (route.name === "account") {
    iconName = "home-outline";
  }

  return (
    <Icon
      type="material-community"
      name={iconName}
      color={color || "#000"}
      size={22}
    />
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants-tab"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#00a680",
          tabBarInactiveTintColor: "#646464",
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="restaurants-tab"
          component={RestaurantsStack}
          options={{ title: "Restaurants" }}
        />
        <Tab.Screen
          name="favorites-tab"
          component={FavoritesStack}
          options={{ title: "Favorites" }}
        />
        <Tab.Screen
          name="account-tab"
          component={AccountStack}
          options={{ title: "Account" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

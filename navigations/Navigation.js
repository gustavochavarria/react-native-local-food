import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Restaurants from "../screens/Restaurants";
import Favorites from "../screens/Favorites";
import Account from "../screens/Account";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="restaurants" component={Restaurants} />
        <Tab.Screen name="favorites" component={Favorites} />
        <Tab.Screen name="account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

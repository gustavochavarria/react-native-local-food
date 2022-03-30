import { createStackNavigator } from "@react-navigation/stack";

import Restaurants from "../../screens/Restaurants";
import AddRestaurant from "../../screens/Restaurants/AddRestaurant";
import Restaurant from "../../screens/Restaurants/Restaurant";

const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ title: "Restaurants" }}
      />

      <Stack.Screen
        name="add-restaurant"
        component={AddRestaurant}
        options={{ title: "Add Restaurant" }}
      />

      <Stack.Screen name="restaurant" component={Restaurant} />
    </Stack.Navigator>
  );
}

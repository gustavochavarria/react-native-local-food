import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Image } from "@react-native-elements/base";

import { useNavigation } from "@react-navigation/native";

export default function ListRestaurants(props) {
  const navigation = useNavigation();
  const { restaurants } = props;

  const goToRestaurant = (id) => {
    console.log("id: ", id);
    navigation.navigate("restaurant", {
      id,
      navigation,
    });
  };

  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={(doc) => {
          const restaurant = doc.item.data();

          return (
            <TouchableOpacity onPress={() => goToRestaurant(doc.item.id)}>
              <View style={styles.restaurant}>
                <Image
                  source={{ uri: restaurant.images[0] }}
                  style={styles.image}
                />

                <View>
                  <Text style={styles.name}>{restaurant.name}</Text>
                  <Text style={styles.info}>{restaurant.address}</Text>
                  <Text style={styles.info}>{restaurant.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  restaurant: {
    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  name: {
    fontWeight: "bold",
  },
  info: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
  },
});

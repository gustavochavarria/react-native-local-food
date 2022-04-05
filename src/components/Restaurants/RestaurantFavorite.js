import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Image, Icon, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export function RestaurantFavorite(props) {
  const { restaurant } = props;
  const navigation = useNavigation();

  const goToRestaurant = () => {
    navigation.navigate("restaurant", {
      screen: "Restaurant",
      id: restaurant.id,
    });
  };

  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", restaurant.favoriteId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View key={restaurant.id} style={styles.content}>
        <Image source={{ uri: restaurant?.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color={"#f00"}
            size={35}
            containerStyle={styles.iconContainer}
            onPress={onRemoveFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 15,
    top: -30,
    right: 20,
  },
});

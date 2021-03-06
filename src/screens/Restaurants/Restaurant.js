import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { useState, useEffect } from "react";

import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import CarouselView from "../../components/Carousel";
import Header from "../../components/Header";
import ListReviews from "../../components/Restaurants/ListReviews";
import BtnFavorite from "../../components/Restaurants/BtnFavorite";

const { width } = Dimensions.get("window");

export default function Restaurant(props) {
  const navigation = useNavigation();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState(null);
  const { route } = props;

  const restId = route?.params?.id;

  useEffect(() => {
    setRestaurant(null);
    console.log("route", route.params);
    console.log("restaurant id : ", restId);

    onSnapshot(doc(db, "restaurants", restId), (doc) => {
      console.log(".....here");
      const data = doc.data();
      setRestaurant(data);

      console.log("here");

      navigation.setOptions({
        title: data.name,
      });
    });

    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", restId)
    );

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, [restId]);

  const goToAddReview = () => {
    navigation.navigate("add-restaurant-review", {
      idRestaurant: route.params.id,
    });
  };

  return (
    <ScrollView style={styles.content}>
      {restaurant && (
        <>
          <CarouselView
            width={width}
            height={200}
            arrayImages={restaurant.images}
          />

          <BtnFavorite restaurantId={route.params.id} />

          <Header restaurant={restaurant} />

          <Button
            title="add review"
            buttonStyle={styles.button}
            titleStyle={styles.btnText}
            icon={{
              type: "material-community",
              name: "square-edit-outline",
              color: "#00a680",
            }}
            onPress={goToAddReview}
          />

          {reviews && <ListReviews reviews={reviews} />}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "relative",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "transparent",
  },
  btnText: {
    color: "#00a680",
  },
  text: {
    textAlign: "center",
    color: "#00a680",
    padding: 20,
  },
  textClick: {
    color: "#00a680",
    fontWeight: "bold",
  },
});

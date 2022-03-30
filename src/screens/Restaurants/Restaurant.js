import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { useState, useEffect } from "react";

import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import CarouselView from "../../components/Carousel";
import Header from "../../components/Header";

const { width } = Dimensions.get("window");

export default function Restaurant(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);

    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);

  return (
    <ScrollView>
      {restaurant && (
        <>
          <CarouselView
            width={width}
            height={200}
            arrayImages={restaurant.images}
          />

          <Header restaurant={restaurant} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
  },
});

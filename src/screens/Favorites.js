import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";

import { Text, ScrollView } from "react-native";
import { RestaurantFavorite } from "../components/Restaurants/RestaurantFavorite";

import { db } from "../utils/firebase";

const auth = getAuth();

export default function Restaurants() {
  const [logged, setLogged] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "favorites"),
      where("userId", "==", auth?.currentUser?.uid)
    );

    onSnapshot(q, async (snapshot) => {
      let favorites = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "restaurants", data.restaurantId);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();

        newData.id = docSnap.id;
        newData.favoriteId = item.id;

        favorites.push(newData);
      }

      setRestaurants(favorites);
    });
  }, [auth]);

  console.log({ logged, restaurants });

  if (!logged) {
    return <Text>You are not logged.</Text>;
  }

  if ((restaurants || []).length < 1) {
    return <Text>No favorites</Text>;
  }

  return (
    <ScrollView>
      {restaurants.map((restaurant) => {
        return (
          <RestaurantFavorite key={restaurant.id} restaurant={restaurant} />
        );
      })}
    </ScrollView>
  );
}

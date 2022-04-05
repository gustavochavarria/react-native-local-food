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

import { View, Text, ScrollView } from "react-native";

import { db } from "../utils/firebase";

export default function Restaurants() {
  const [logged, setLogged] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    const q = query(
      collection(db, "favorites"),
      where("idUser", "==", auth?.currentUser?.uid)
    );

    onSnapshot(q, async (snapshot) => {
      let favorites = [];

      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "restaurants", data.idRestaurant);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.idFavorite = data.id;

        favorites.push(newData);
      }

      setRestaurants(favorites);
    });
  }, [auth]);

  if (!logged) {
    return <Text>You are not logged.</Text>;
  }

  if (!restaurants) {
    return <Text>No favorites</Text>;
  }

  return (
    <ScrollView>
      {restaurants.map((restaurant) => {
        <Text>{restaurant.name}</Text>;
      })}
    </ScrollView>
  );
}

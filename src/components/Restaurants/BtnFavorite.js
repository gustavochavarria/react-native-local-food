import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Icon } from "react-native-elements";

import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  setDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";

const auth = getAuth();

export default function BtnFavorite(props) {
  const { restaurantId } = props;
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [isReload, setIsReload] = useState(false);

  const getFavorites = async () => {
    console.log({ restaurantId, user: auth?.currentUser?.uid });
    const q = query(
      collection(db, "favorites"),
      where("restaurantId", "==", restaurantId),
      where("userId", "==", auth?.currentUser?.uid)
    );

    return await getDocs(q);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getFavorites();

        setIsFavorite((response?.docs || []).length > 0);
      } catch (e) {
        console.error(e);

        setIsFavorite(false);
      }
    })();
  }, [restaurantId, isReload]);

  // Add
  const addFavorite = async () => {
    if (!auth?.currentUser?.uid) {
      console.error("User not logged");
      return;
    }
    const data = {
      restaurantId,
      userId: auth.currentUser.uid,
    };

    console.log({ data });

    const docRef = doc(collection(db, "favorites"));

    await setDoc(docRef, data);

    setIsReload((prev) => !prev);
  };

  // Remove
  const removeFavorite = async () => {
    if (!auth?.currentUser?.uid) {
      console.error("User not logged");
      return;
    }

    const favorite = await getFavorites();

    console.log({ favorite: favorite.docs[0].id });

    if (favorite.docs.length > 0) {
      await deleteDoc(doc(db, "favorites", favorite.docs[0].id));
      setIsReload((prev) => !prev);
    }
  };

  return (
    <View style={styles.content}>
      {isFavorite !== undefined && (
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          onPress={isFavorite ? removeFavorite : addFavorite}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 5,
    borderBottomLeftRadius: 20,
    width: 44,
    height: 44,
  },
});

import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Icon } from "@react-native-elements/base";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";

import { useNavigation } from "@react-navigation/native";

import ListRestaurants from "../../components/Restaurants/ListRestaurants";

export default function Restaurants() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  });

  return (
    <View style={styles.content}>
      {!restaurants ? (
        <Text>Loading</Text>
      ) : (
        <ListRestaurants restaurants={restaurants} />
      )}

      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContent}
          onPress={() => navigation.navigate("add-restaurant")}
        />
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  btnContent: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

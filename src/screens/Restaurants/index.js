import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Icon } from "@react-native-elements/base";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function Restaurants() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  console.log({ user });

  return (
    <View style={styles.content}>
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

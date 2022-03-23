import { useState } from "react";

import { View, Text, StyleSheet } from "react-native";

import { Avatar } from "@react-native-elements/base";

import { getAuth } from "firebase/auth";

export default function InfoUser() {
  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  const [avatar, setAvatar] = useState(photoURL);

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.userInfoAvatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: avatar }}
      >
        <Avatar.Accessory size={24} onPress={() => {}} />
      </Avatar>

      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
    backgroundColor: "green",
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});

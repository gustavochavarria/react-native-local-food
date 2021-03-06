import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { getAuth, signOut } from "firebase/auth";
import AccountOptions from "../../components/Account/AccountOptions";
import InfoUser from "../../components/Account/InfoUser";
import { useState } from "react";

export default function UserLogged() {
  const [_, setReload] = useState(false);

  const _onPress = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      console.log("sing out");
    });
  };

  return (
    <View>
      <InfoUser />

      <AccountOptions
        onReload={() => {
          setReload((prevState) => !prevState);
        }}
      />

      <TouchableOpacity style={styles.closeSession} onPress={_onPress}>
        <Text style={styles.btnText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  closeSession: {
    backgroundColor: "blue",
    padding: 20,
  },

  btnText: {
    color: "white",
  },
});

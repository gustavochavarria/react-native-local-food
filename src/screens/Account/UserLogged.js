import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { getAuth, signOut } from "firebase/auth";

export default function UserLogged() {
  const _onPress = () => {
    console.log("on press");

    const auth = getAuth();

    signOut(auth).then(() => {
      console.log("sing out");
    });
  };

  return (
    <View>
      <Text>Logged</Text>

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

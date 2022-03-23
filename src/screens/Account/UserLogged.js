import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { getAuth, signOut } from "firebase/auth";
import AccountOptions from "../../components/Account/AccountOptions";
import InfoUser from "../../components/Account/InfoUser";

export default function UserLogged() {
  let key = 1;

  const _onPress = () => {
    const auth = getAuth();

    signOut(auth).then(() => {
      console.log("sing out");
    });
  };

  return (
    <View key={key}>
      <InfoUser />

      <AccountOptions onReload={() => key++} />

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

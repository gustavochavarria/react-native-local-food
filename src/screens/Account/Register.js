import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/local-food004.png")}
        style={styles.logo}
      />

      <View style={styles.viewForm}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
    resizeMode: "contain",
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});

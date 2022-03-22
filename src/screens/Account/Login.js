import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/local-food004.png")}
        resizeMode="contain"
        style={styles.logo}
      />

      <View style={styles.viewContainer}>
        {/* login form */}

        <Text style={styles.textRegister}>
          Do not have an account yet?{" "}
          <Text
            style={styles.btnRegister}
            onPress={() => {
              navigation.navigate("register");
            }}
          >
            Register here
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
    backgroundColor: "transparent",
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});

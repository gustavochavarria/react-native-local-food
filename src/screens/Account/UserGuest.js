import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import { Button } from "@react-native-elements/base";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/welcome.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.description}>
        Login to improve your experience in the app.
      </Text>

      <View style={styles.viewBtn}>
        <Button
          title="See my profile"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.containerStyle}
          onPress={() => {
            console.log("on press");

            navigation.navigate("login");
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 200,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    width: "70%",
  },
});

import { View, Text, StyleSheet } from "react-native";

export default function Header(props) {
  const { restaurant, reviews } = props;

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
      </View>

      <Text styles={styles.description}>{restaurant.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    margin: 15,
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    color: "#828282",
  },
});

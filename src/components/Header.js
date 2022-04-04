import { View, Text, StyleSheet } from "react-native";

import { AirbnbRating } from "react-native-elements";

export default function Header(props) {
  const { restaurant } = props;

  return (
    <View style={styles.content}>
      <View style={styles.contentInfo}>
        <View style={styles.titleView}>
          <Text style={styles.name}>{restaurant.name}</Text>
        </View>

        <Text styles={styles.description}>{restaurant.description}</Text>
      </View>

      <View style={styles.review}>
        <AirbnbRating
          isDisabled={true}
          defaultRating={restaurant.totalRating || 1}
          count={5}
          size={14}
          showRating={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentInfo: {
    margin: 15,
  },
  review: {
    justifyContent: "center",
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

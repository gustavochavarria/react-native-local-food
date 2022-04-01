import { View, Text, StyleSheet } from "react-native";
import { AirbnbRating, ListItem, Avatar } from "@react-native-elements/base";
import { DateTime } from "luxon";

export default function ListReviews(props) {
  const { reviews } = props;

  console.log("arrived here");
  console.log({ reviews });

  return (
    <View style={styles.content}>
      {(reviews || []).map((review) => {
        const data = review.data();
        const createdReview = new Date(data.createdAt.seconds * 1000);
        const formattedTime = DateTime.fromISO(
          createdReview.toISOString()
        ).toFormat("yyyy/LL/dd - hh:mm");

        return (
          <ListItem key={data.id} bottomDivider containerStyle={styles.review}>
            <Avatar
              source={{
                uri:
                  data.avatar ||
                  "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg",
              }}
              size={50}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View style={styles.subtitle}>
                <Text>{data.comment}</Text>
                <View style={styles.contentRatingDate}>
                  <AirbnbRating
                    defaultRating={data.rating}
                    showRating={false}
                    size={15}
                    isDisabled
                    starContainerStyle={styles.starContainer}
                  />
                  <Text style={styles.date}>{formattedTime}</Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 15,
  },
  review: {
    paddingVertical: 20,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
  },
  comment: {
    paddingRight: 50,
  },
  contentRatingDate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  starContainer: {
    height: 10,
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  date: {
    fontSize: 12,
    color: "#828282",
  },
});

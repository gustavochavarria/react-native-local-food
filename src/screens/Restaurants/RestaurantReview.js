import { View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import { useRoute, useNavigation } from "@react-navigation/native";

import { AirbnbRating, Input, Button } from "@react-native-elements/base";

import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../../utils/firebase";

export default function RestaurantReview() {
  const { params } = useRoute();
  const navigation = useNavigation();

  const updateRestaurant = async (restaurantId, rating) => {
    const docRef = doc(db, "restaurants", restaurantId);
    const restaurantData = (await getDoc(docRef)).data();

    console.log({ restaurantData });

    const counterRating = Number(restaurantData.counterRating || 0) + 1;
    const totalRating = Number(restaurantData.totalRating || 0) + rating;

    await updateDoc(docRef, {
      rating: Number((totalRating / counterRating).toFixed(2)),
      counterRating,
      totalRating,
    });

    navigation.goBack();
  };

  const formik = useFormik({
    initialValues: {
      title: "Amazing",
      rating: 4,
    },
    onSubmit: async (values) => {
      try {
        const auth = getAuth();

        const reviewData = {
          ...values,
          idRestaurant: params.idRestaurant,
          idUser: auth.currentUser.uid,
          avatar: auth.currentUser.photoURL || "",
          rating: Number(values.rating),
          createdAt: new Date(),
        };

        const docRef = doc(collection(db, "reviews"));

        await setDoc(docRef, reviewData);
        await updateRestaurant(params.idRestaurant, Number(values.rating));
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={[
              "Pesimo",
              "Deficiente",
              "Normal",
              "My bueno",
              "Excelente",
            ]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          />
        </View>
        <View>
          <Input
            placeholder="Titulo"
            onChangeText={(text) => formik.setFieldValue("title", text)}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
          />
        </View>
      </View>

      <Button
        title="Enviar review"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
  ratingContent: {
    height: 160,
    justifyContent: "center",
  },
  comment: {
    height: 150,
  },
  btnContainer: {
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#00a680",
  },
});

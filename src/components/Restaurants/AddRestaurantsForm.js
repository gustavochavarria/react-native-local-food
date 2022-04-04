import { useState } from "react";
import { useFormik } from "formik";

import { View, StyleSheet, Dimensions, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Button, Image, Input, Dialog } from "react-native-elements";
import * as Yup from "yup";

import { useNavigation } from "@react-navigation/native";

//firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

// import 'react-native-get-random-values'
import { v4 as uuid } from "uuid";

import UploadImage from "./UploadImage";
import MapForm from "./MapForm";

const getColorIconMap = (formik) => {
  if (formik.errors.location) return "#ff0000";

  if (formik.values.location) return "#00a680";

  return "#c2c2c2";
};

const widthScreen = Dimensions.get("window").width;

function* idGenerator() {
  const UUID = uuid();
  let counter = 1;

  while (true) {
    yield `${UUID}-${counter}`;
    counter++;
  }
}

const idGenerated = idGenerator();

const uploadImageToFirebase = async (uri) => {
  try {
    console.log("UPLOADING IMAGE");
    const response = await fetch(uri);
    const blob = await response.blob();

    const id = idGenerated.next().value;
    console.log("ID generated: ", id);

    const storage = getStorage();
    const storageRef = ref(storage, `restaurants/${id}`);

    const snapshot = await uploadBytes(storageRef, blob);

    const imageRef = ref(storage, snapshot.metadata.fullPath);
    const imageUrl = await getDownloadURL(imageRef);

    return imageUrl;
  } catch (e) {
    console.error(e);

    return null;
  }
};

export default function AddRestaurants() {
  const navigation = useNavigation();
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      description: "",
      images: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const { images, ...rest } = values;

        rest.createdAt = new Date();
        rest.images = [];

        for (const uri of images) {
          const imgUri = await uploadImageToFirebase(uri);

          if (imgUri) {
            rest.images.push(imgUri);
          }
        }
        console.log("IMAGE COUNT: ", rest.images.length);

        // const id = uuid();
        // const docRef = doc(db, "restaurants", id);
        const docRef = doc(collection(db, "restaurants"));

        await setDoc(docRef, rest);

        console.log("SAVED!!!");
        navigation.goBack();
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <KeyboardAwareScrollView>
      {formik.values.images.length > 0 ? (
        <View styles={styles.contain}>
          <Image
            source={{ uri: formik.values.images[0] }}
            style={styles.image}
          />
        </View>
      ) : (
        <View style={styles.contain}>
          <Text style={styles.image}>No image</Text>
        </View>
      )}
      <Input
        placeholder="Name"
        onChangeText={(txt) => formik.setFieldValue("name", txt)}
      />

      <Input
        placeholder="Address"
        rightIcon={{
          type: "material-community",
          name: "map-marker-radius",
          color: getColorIconMap(formik),
          onPress: onOpenCloseMap,
        }}
        onChangeText={(txt) => formik.setFieldValue("address", txt)}
      />

      <Input
        placeholder="Description"
        onChangeText={(txt) => formik.setFieldValue("description", txt)}
      />

      <UploadImage formik={formik} />

      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />

      <Button title="Create Restaurant" onPress={formik.handleSubmit} />

      <Dialog isVisible={formik.isSubmitting}>
        <Dialog.Loading />
        <Text style={{ color: "white" }}>Creating restaurant</Text>
      </Dialog>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  contain: {
    marginBottom: 30,
  },
  image: {
    height: 200,
    width: widthScreen,
  },
});

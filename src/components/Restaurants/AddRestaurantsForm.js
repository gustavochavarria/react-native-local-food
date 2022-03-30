import { View, StyleSheet, Dimensions, Text } from "react-native";
import { useState } from "react";
import { useFormik } from "formik";

import { Button, Image, Input } from "@react-native-elements/base";
import * as Yup from "yup";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storage = getStorage();
  const storageRef = ref(storage, `restaurants/${uuid()}`);

  const snapshot = await uploadBytes(storageRef, blob);

  const imageRef = ref(storage, snapshot.metadata.fullPath);
  const imageUrl = await getDownloadURL(imageRef);

  console.log("url firebase: ", imageUrl);

  return imageUrl;
};

export default function AddRestaurants() {
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
      const { images } = values;

      let uploadedImages = [];

      for (const uri of images) {
        const imgUri = await uploadImage(uri);
        uploadedImages.push(imgUri);
      }

      console.log("uploaded Images: ", uploadedImages);
    },
  });

  return (
    <View>
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
    </View>
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

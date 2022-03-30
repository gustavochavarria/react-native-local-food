import { View, StyleSheet, Dimensions, Text } from "react-native";
import { useState } from "react";
import { useFormik } from "formik";

import { Button, Image, Input } from "@react-native-elements/base";
import * as Yup from "yup";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

import UploadImage from "./UploadImage";
import MapForm from "./MapForm";

const getColorIconMap = (formik) => {
  if (formik.errors.location) return "#ff0000";

  if (formik.values.location) return "#00a680";

  return "#c2c2c2";
};

const widthScreen = Dimensions.get("window").width;

export default function AddRestaurants() {
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `restaurants/${uuid()}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      const imagePath = snapshot.metadata.fullPath;

      const imageRef = ref(storage, imagePath);
      const imageUrl = await getDownloadURL(imageRef);

      formik.setFieldValue('uploadedImages', [...formik.values.uploadedImages, imageUrl]);

    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      description: "",
      images: [],
      uploadedImages: []
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      description: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log({ values });

      const {images} = values;

      images.forEach(async (uri) => {
        await uploadImage(uri)
      });
    
    },
  });

  console.log("images: ", formik.values.images[0]);

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

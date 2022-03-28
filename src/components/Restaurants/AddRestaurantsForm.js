import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { useFormik } from "formik";

import { Button, Input } from "@react-native-elements/base";

import UploadImage from "./UploadImage";
import MapForm from "./MapForm";

const getColorIconMap = (formik) => {
  if (formik.errors.location) return "#ff0000";

  if (formik.values.location) return "#00a680";

  return "#c2c2c2";
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
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <View>
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

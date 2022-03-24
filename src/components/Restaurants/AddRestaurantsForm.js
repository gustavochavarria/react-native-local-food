import { View, Text } from "react-native";
import React from "react";
import { useFormik } from "formik";

import { Button, Input } from "@react-native-elements/base";

export default function AddRestaurants() {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <View>
      <Text>AddRestaurants</Text>

      <Input
        placeholder="Name"
        onChangeText={(txt) => formik.setFieldValue("name", txt)}
      />

      <Input
        placeholder="Address"
        onChangeText={(txt) => formik.setFieldValue("address", txt)}
      />

      <Input
        placeholder="Description"
        onChangeText={(txt) => formik.setFieldValue("description", txt)}
      />

      <Button title="Create Restaurant" onPress={formik.handleSubmit} />
    </View>
  );
}

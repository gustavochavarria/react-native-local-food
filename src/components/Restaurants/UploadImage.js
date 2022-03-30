import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Icon } from "@react-native-elements/base";

import * as ImagePicker from "expo-image-picker";

export default function UploadImage(props) {
  const { formik } = props;

  const openCamera = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);

      formik.setFieldValue("images", [...formik.values.images, result.uri]);
    }
  };

  const removeImage = (uri) => {
    const filtered = formik.values.images.filter((image) => image !== uri);

    formik.setFieldValue("images", filtered);
  };

  return (
    <View style={styles.viewImages}>
      {formik.values.images.length < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={openCamera}
        />
      )}

      {(formik.values?.images || []).map((image) => {
        return (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyle}
            onPress={() => removeImage(image)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  viewImages: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  containerIcon: {
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#e3e3e3",
    width: 70,
    height: 70,
  },
  imageStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  error: {
    marginHorizontal: 20,
    marginTop: 10,
    color: "#ff0000",
    fontSize: 12,
    paddingLeft: 6,
  },
});

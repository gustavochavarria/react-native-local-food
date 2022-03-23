import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import { getAuth, updateProfile } from "firebase/auth";

export default function ChangeDisplayNameForm(props) {
  const displayName = getAuth().currentUser?.displayName || "";

  console.log("diplay name: ", displayName, getAuth().currentUser);

  const formik = useFormik({
    initialValues: {
      displayName,
    },
    validationSchema: Yup.object().shape({
      displayName: Yup.string().required(),
    }),
    onSubmit: (values) => {
      const currentUser = getAuth().currentUser;

      updateProfile(currentUser, { displayName: values.displayName });

      props.onReload();
      props.onClose();
    },
  });

  return (
    <View style={styles.content}>
      <TextInput
        placeholder="Full name"
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
      />
      {formik.errors.displayName && <Text>{formik.errors.displayName}</Text>}

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.btn}>Change name</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    height: 200,
  },
  btnContainer: {
    width: "95%",
    marginTop: 10,
    backgroundColor: "#00a680",
  },
  btn: {
    backgroundColor: "#00a680",
    color: "white",
    textAlign: "center",
    padding: 10,
  },
});

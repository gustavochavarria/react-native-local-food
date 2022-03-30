import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
} from "firebase/auth";
import { useState } from "react";

export default function ChangePasswordForm(props) {
  const [invalid, setInvalid] = useState();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required(),
      newPassword: Yup.string(6, "To Short!").required(),
      repeatPassword: Yup.string(6, "To Short!").required(),
    }),
    onSubmit: (values) => {
      if (values.newPassword !== values.repeatPassword) {
        setInvalid("New password do not match");

        return;
      } else {
        setInvalid("");
      }

      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          values.oldPassword
        );

        reauthenticateWithCredential(currentUser, credential);

        updatePassword(currentUser, values.newPassword).then(() => {
          props.onClose();
          signOut(auth);
        });
      } catch (err) {
        setInvalid("Current Password invalid");
      }
    },
  });

  return (
    <View style={styles.content}>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry={true}
        onChangeText={(text) => formik.setFieldValue("oldPassword", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={true}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
      />
      {formik.errors.newPassword && <Text>{formik.errors.newPassword}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Repeat new Password"
        secureTextEntry={true}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
      />
      {formik.errors.repeatPassword && (
        <Text>{formik.errors.repeatPassword}</Text>
      )}

      <Text>{invalid}</Text>

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.btn}>Change Password</Text>
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
  input: {
    width: "90%",
    padding: 8,
    margin: 1,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
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

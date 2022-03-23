import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  EmailAuthProvider,
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
} from "firebase/auth";

export default function ChangeEmailForm(props) {
  const { email } = getAuth().currentUser;

  const formik = useFormik({
    initialValues: {
      email,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
    }),
    onSubmit: (values) => {
      try {
        const currentUser = getAuth().currentUser;

        const credential = EmailAuthProvider.credential(
          currentUser.email,
          values.password
        );

        reauthenticateWithCredential(currentUser, credential);

        updateEmail(currentUser, values.email)
          .then((a) => {
            props.onReload();
            props.onClose();
          })
          .catch((err) => {
            console.log({ err });
          });
      } catch (err) {
        console.error({ err });
      }
    },
  });

  return (
    <View style={styles.content}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      {formik.errors.email && <Text>{formik.errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      {formik.errors.email && <Text>{formik.errors.email}</Text>}

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.btn}>Change email</Text>
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

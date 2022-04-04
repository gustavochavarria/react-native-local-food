import { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Icon } from "react-native-elements";

import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { app } from "../../utils/firebase";

export default function LoginForm() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid Email").required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      const auth = getAuth(app);

      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          navigation.navigate("account");
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  });

  return (
    <View style={styles.formContainer}>
      <Input
        onChangeText={(text) => formik.setFieldValue("email", text)}
        placeholder="Email"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      {formik.errors.email && <Text> {formik.errors.email} </Text>}

      <Input
        onChangeText={(text) => formik.setFieldValue("password", text)}
        placeholder="Password"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={!showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
      />
      {formik.errors.email && <Text> {formik.errors.password} </Text>}

      <Button
        title="Login"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
            iconStyle={styles.iconRight}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {},
  inputForm: {},
  btnContainerRegister: {},
  btnRegister: {},
  iconRight: {
    color: "#c1c1c1",
  },
});

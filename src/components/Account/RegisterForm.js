import { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Icon } from "@react-native-elements/base";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { app } from "../../utils/firebase";

export default function RegisterForm() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: object().shape({
      email: Yup.string().email("Invalid Email").required(),
      password: Yup.string().min(6, "6 character min").required(),
      repeatPassword: Yup.string().required(),
    }),
    onSubmit: (values) => {
      if (values.password !== values.repeatPassword) {
        return;
      }

      const auth = getAuth(app);

      createUserWithEmailAndPassword(auth, values.email, values.password).then(
        () => {
          navigation.navigate("account");
        }
      );
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

      <Input
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        placeholder="Repeat Password"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={!showRepeat}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeat ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => {
              setShowRepeat(!showRepeat);
            }}
          />
        }
      />

      <Button
        title="Register"
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

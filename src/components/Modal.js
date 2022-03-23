import { StyleSheet } from "react-native";
import { Overlay } from "@react-native-elements/base";

export default function Modal(props) {
  const { show, close, children } = props;

  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={() => close()}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: "80%",
    backgroundColor: "white",
  },
});

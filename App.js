import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { initFirebase } from "./src/utils/firebase";

import Navigation from "./src/navigation";

export default function App() {
  return <Navigation />;
}

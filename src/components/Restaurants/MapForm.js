import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import MapView from "react-native-maps";
import * as Location from "expo-location";

import Modal from "../Modal";

export default function MapForm(props) {
  const { show, close, formik } = props;

  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.error("not granted: ", status);

        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();

      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  });

  const saveLocation = () => {
    formik.setFieldValue("location", location);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <View>
        <MapView
          style={styles.mapStyle}
          initialRegion={location}
          showsUserLocation={true}
          onRegionChange={(location) => setLocation(location)}
        >
          <MapView.Marker draggable coordinate={location} />
        </MapView>

        <View style={styles.mapActions}>
          <Button
            title="Guardar"
            containerStyle={styles.btnMapContainerSave}
            buttonStyle={styles.btnMapSave}
            onPress={saveLocation}
          />
          <Button
            title="Cerrar"
            containerStyle={styles.btnMapContainerCancel}
            buttonStyle={styles.btnMapCancel}
            onPress={close}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: 550,
  },
  mapActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  btnMapContainerSave: {
    paddingRight: 5,
    width: "50%",
  },
  btnMapSave: {
    backgroundColor: "#00a680",
  },
  btnMapContainerCancel: {
    paddingLeft: 5,
    width: "50%",
  },
  btnMapCancel: {
    backgroundColor: "#a60d0d",
  },
});

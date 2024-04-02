import React from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Text, View } from "./Themed";
import Colors from "@/constants/Colors";

interface CustomMapMarkerProps {
  id: string;
  price: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  onPress: () => void;
}

const CustomMapMarker: React.FC<CustomMapMarkerProps> = ({
  id,
  price,
  coordinate,
  onPress,
}) => (
  <Marker
    key={id}
    tracksViewChanges={false}
    coordinate={coordinate}
    onPress={onPress}
  >
    <View
      style={styles.marker}
      lightColor={Colors.light.primary}
      darkColor={Colors.dark.primary}
    >
      <Text style={[styles.markerText, { color: Colors.common.white }]}>
        {price}
      </Text>
    </View>
  </Marker>
);

interface AreEqualProps {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const areEqual = (prevProps: AreEqualProps, nextProps: AreEqualProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.coordinate.latitude === nextProps.coordinate.latitude &&
    prevProps.coordinate.longitude === nextProps.coordinate.longitude
  );
};

const styles = StyleSheet.create({
  markerText: {
    fontFamily: "MontserratBold",
    fontSize: 8,
  },
  marker: {
    padding: 6,
    borderRadius: 10,
  },
});

export default React.memo(CustomMapMarker, areEqual);

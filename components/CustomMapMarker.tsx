import React from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Text, View } from "./Themed";
import Colors from "@/constants/Colors";

interface CustomMapMarkerProps {
  id: string;
  price: string;
  listingType: string;
  propertyType: string;
  city: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  onPress: () => void;
}

const CustomMapMarker: React.FC<CustomMapMarkerProps> = ({
  id,
  price,
  listingType,
  propertyType,
  city,
  coordinate,
  onPress,
}) => (
  <Marker
    key={id}
    tracksViewChanges={false}
    coordinate={coordinate}
    onPress={onPress}
  >
    <View style={styles.marker}>
      <View
        style={{ flexDirection: "row", gap: 2, backgroundColor: "transparent" }}
      >
        <Text style={styles.markerText}>{price}</Text>
        <Text style={styles.markerText}>{city}</Text>
      </View>
      <Text style={styles.markerText}>
        {listingType} {propertyType}
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
    color: "#fff",
  },
  marker: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
});

export default React.memo(CustomMapMarker, areEqual);

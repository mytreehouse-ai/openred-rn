import React from "react";
import { View } from "./Themed";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { StyleSheet } from "react-native";
import { defaultStyle } from "@/constants/Styles";
import { propertyListings } from "@/assets/data/propertyListings";
import { useRouter } from "expo-router";
import CustomMapMarker from "./CustomMapMarker";
import { useColorScheme } from "../hooks/useColorScheme";
import { mapDarkModeStyle } from "@/constants/MapDarkModeStyle";

const ListingsMap = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <View style={defaultStyle.container}>
      <MapView
        userInterfaceStyle={colorScheme === "dark" ? "dark" : "light"}
        customMapStyle={colorScheme === "dark" ? mapDarkModeStyle : undefined}
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        zoomTapEnabled={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        clusterFontFamily="MontserratSemiBold"
        minZoomLevel={6}
        maxZoomLevel={20}
        initialRegion={{
          latitude: 14.5547,
          longitude: 121.0244,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {propertyListings.map((l) => (
          <CustomMapMarker
            key={l.id}
            id={String(l.id)}
            price={l.price_formatted}
            coordinate={{
              latitude: l.estate.latitude,
              longitude: l.estate.longitude,
            }}
            onPress={() => router.push(`/listing/${l.id}`)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {},
});

export default ListingsMap;

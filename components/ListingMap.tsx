import React from "react";
import { Text, View } from "./Themed";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { StyleSheet, TouchableOpacity } from "react-native";
import { defaultStyle } from "@/constants/Styles";
import { propertyListings } from "@/assets/data/propertyListings";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const ListingMap = () => {
  const router = useRouter();

  return (
    <View style={defaultStyle.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        clusterFontFamily="MontserratSemiBold"
        initialRegion={{
          latitude: 14.5995,
          longitude: 120.9842,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {propertyListings.map((l) => (
          <Marker
            key={l.id}
            coordinate={{
              latitude: l.estate.latitude,
              longitude: l.estate.longitude,
            }}
            onPress={() => router.push(`/listing/${l.id}`)}
          >
            <View style={styles.marker}>
              <Text style={{ fontFamily: "MontserratSemiBold", fontSize: 10 }}>
                {l.listing_type.description}
              </Text>
              <Text style={{ fontFamily: "MontserratBold", fontSize: 12 }}>
                {l.price_formatted}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {},
  marker: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: Colors.gray100,
  },
});

export default ListingMap;

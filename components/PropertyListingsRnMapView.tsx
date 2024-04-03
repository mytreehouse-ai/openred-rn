import React from "react";
import { Text, View } from "./Themed";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import { defaultStyle } from "@/constants/Styles";
import { useRouter } from "expo-router";
import CustomMapMarker from "./CustomMapMarker";
import { useColorScheme } from "@/hooks/useColorScheme";
import { mapDarkModeStyle } from "@/constants/MapStyle";
import { Listing } from "@/interfaces/listing";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";

interface PropertyListingsRnMapViewProps {
  propertyListingsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiBaseResponse<Listing[]>, unknown>,
    Error
  >;
}

const PropertyListingsRnMapView = ({
  propertyListingsQuery,
}: PropertyListingsRnMapViewProps) => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const {
    isLoading,
    isFetchingNextPage,
    data: propertyListings,
  } = propertyListingsQuery;

  return (
    <View style={defaultStyle.container}>
      <MapView
        userInterfaceStyle={colorScheme as "light" | "dark"}
        customMapStyle={colorScheme === "dark" ? mapDarkModeStyle : undefined}
        animationEnabled={false}
        loadingEnabled={Platform.OS === "android" ? true : false}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        zoomTapEnabled={false}
        showsUserLocation={true}
        moveOnMarkerPress={false}
        showsMyLocationButton={true}
        clusterFontFamily="MontserratSemiBold"
        onRegionChangeComplete={({ longitude, latitude }) => {
          !isFetchingNextPage &&
            setTimeout(async () => {
              await propertyListingsQuery.fetchNextPage();
            }, 2000);
        }}
        minZoomLevel={6}
        maxZoomLevel={20}
        initialRegion={{
          latitude: 14.5547,
          longitude: 121.0244,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {propertyListings?.pages.flatMap((page) =>
          page.results
            .filter(
              (listing) => listing.estate.latitude && listing.estate.longitude
            )
            .map((listing) => (
              <CustomMapMarker
                key={listing.id}
                id={String(listing.id)}
                price={listing.price_formatted}
                coordinate={{
                  latitude: listing.estate.latitude,
                  longitude: listing.estate.longitude,
                }}
                onPress={() => router.push(`/listing/${listing.slug}`)}
              />
            ))
        )}
      </MapView>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});

export default PropertyListingsRnMapView;

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";
import { Listing } from "@/interfaces/listing";
import BottomSheet from "@gorhom/bottom-sheet";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import React, { useMemo, useRef } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import PropertyListings from "./PropertyListings";
import { Ionicons, Text, View, useThemeColor } from "./Themed";

interface PropertyListingsBottomSheetsProp {
  propertyListingsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiBaseResponse<Listing[]>, unknown>,
    Error
  >;
}

const PropertyListingsBottomSheet: React.FC<
  PropertyListingsBottomSheetsProp
> = ({ propertyListingsQuery }) => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPointFirstIndex = Platform.OS === "ios" ? "8%" : "9%";
  const snapPoints = useMemo(() => [snapPointFirstIndex, "99%"], []);

  const handleOnCollapse = () => {
    bottomSheetRef.current?.collapse();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{
        backgroundColor:
          colorScheme === "light" ? Colors.light.primary : Colors.dark.primary,
      }}
      backgroundStyle={{ backgroundColor: backgroundColor }}
      style={styles.sheetContainer}
    >
      <PropertyListings propertyListingsQuery={propertyListingsQuery} />
      <View style={styles.absoluteBtn}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor:
                colorScheme === "light"
                  ? Colors.light.primary
                  : Colors.dark.primary,
            },
          ]}
          activeOpacity={0.85}
          onPress={handleOnCollapse}
        >
          <Text
            style={{ fontFamily: "MontserratSemiBold", fontSize: 16 }}
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
          >
            Map
          </Text>
          <Ionicons name="map-outline" size={26} />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  absoluteBtn: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.75,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sheetContainer: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default PropertyListingsBottomSheet;

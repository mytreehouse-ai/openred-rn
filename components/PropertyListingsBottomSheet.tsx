import React, { useMemo, useRef, useState } from "react";
import { Ionicons, Text, View, useThemeColor } from "./Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import BottomSheet from "@gorhom/bottom-sheet";
import { Listing } from "@/interfaces/listing";
import Colors from "@/constants/Colors";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { UseQueryResult } from "@tanstack/react-query";
import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";
import PropertyListings from "./PropertyListings";

interface PropertyListingsBottomSheetsProp {
  propertyListingsQuery: UseQueryResult<ApiBaseResponse<Listing[]>, Error>;
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
  const [refresh, setRefresh] = useState(0);

  const handleOnCollapse = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
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
      <PropertyListings
        propertyListingsQuery={propertyListingsQuery}
        refresh={refresh}
      />
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
import React, { useMemo, useRef, useState } from "react";
import { Ionicons, Text, View, useThemeColor } from "./Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import BottomSheet from "@gorhom/bottom-sheet";
import { Listing } from "@/interfaces/listing";
import Listings from "./Listings";
import Colors from "@/constants/Colors";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

interface ListingsBottomSheetsProp {
  propertyType: string;
  listings: Listing[];
}

const ListingsBottomSheet: React.FC<ListingsBottomSheetsProp> = ({
  propertyType,
  listings,
}) => {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: "#fff", dark: "#121212" },
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
          colorScheme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
      }}
      backgroundStyle={{ backgroundColor: backgroundColor }}
      style={styles.sheetContainer}
    >
      <Listings
        propertyType={propertyType}
        listings={listings}
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
            style={{ fontFamily: "MontserratSemiBold" }}
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
          >
            Map
          </Text>
          <Ionicons name="map-outline" size={24} />
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

export default ListingsBottomSheet;

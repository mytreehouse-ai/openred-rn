import React, { useMemo, useRef, useState } from "react";
import { Text, View } from "./Themed";
import BottomSheet from "@gorhom/bottom-sheet";
import { Listing } from "@/interfaces/listing";
import Listings from "./Listings";
import Colors from "@/constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ListingsBottomSheetsProps {
  propertyType: string;
  listings: Listing[];
}

const ListingsBottomSheets: React.FC<ListingsBottomSheetsProps> = ({
  propertyType,
  listings,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["9%", "99%"], []);
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
      handleIndicatorStyle={{ backgroundColor: Colors.gray900 }}
      style={styles.sheetContainer}
    >
      <Listings
        propertyType={propertyType}
        listings={listings}
        refresh={refresh}
      />
      <View style={styles.absoluteBtn}>
        <TouchableOpacity style={styles.btn} onPress={handleOnCollapse}>
          <Text style={{ fontFamily: "MontserratSemiBold", color: "#fff" }}>
            Map
          </Text>
          <Ionicons name="map-outline" size={24} color="#fff" />
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
    backgroundColor: Colors.gray900,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    gap: 10,
    padding: 14,
  },
  sheetContainer: {
    backgroundColor: "#fff",
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

export default ListingsBottomSheets;

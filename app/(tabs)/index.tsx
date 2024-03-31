import { propertyListings } from "@/assets/data/propertyListings";
import ExploreHeader from "@/components/ExploreHeader";
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheets from "@/components/ListingsBottomSheets";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";

const Explore = () => {
  const [propertyType, setPropertyType] = useState("Warehouse");
  const listings = useMemo(() => propertyListings, []);

  const onDataChange = (propertyType: string) => {
    setPropertyType(propertyType);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onPropertyTypeChange={onDataChange} />,
        }}
      />
      <ListingsMap />
      <ListingsBottomSheets propertyType={propertyType} listings={listings} />
    </GestureHandlerRootView>
  );
};

export default Explore;

import React, { useState } from "react";
import { propertyListings } from "@/assets/data/propertyListings";
import ExploreHeader from "@/components/ExploreHeader";
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheets from "@/components/ListingsBottomSheets";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { defaultStyle } from "@/constants/Styles";

const Explore = () => {
  const [propertyType, setPropertyType] = useState("Warehouse");

  const onDataChange = (propertyType: string) => {
    setPropertyType(propertyType);
  };

  return (
    <GestureHandlerRootView style={defaultStyle.container}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onPropertyTypeChange={onDataChange} />,
        }}
      />
      <ListingsMap />
      <ListingsBottomSheets
        propertyType={propertyType}
        listings={propertyListings}
      />
    </GestureHandlerRootView>
  );
};

export default Explore;

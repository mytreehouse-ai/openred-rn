import React, { useState } from "react";
import ExploreHeader from "@/components/ExploreHeader";
import PropertyListingsRnMapView from "@/components/PropertyListingsRnMapView";
import PropertyListingsBottomSheet from "@/components/PropertyListingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { defaultStyle } from "@/constants/Styles";
import { usePropertyListingsQuery } from "@/hooks/usePropertyListingsQuery";

const Explore = () => {
  const [propertyType, setPropertyType] = useState("Warehouse");
  const propertyListingsQuery = usePropertyListingsQuery(propertyType);

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
      <PropertyListingsRnMapView
        propertyListingsQuery={propertyListingsQuery}
      />
      <PropertyListingsBottomSheet
        propertyListingsQuery={propertyListingsQuery}
      />
    </GestureHandlerRootView>
  );
};

export default Explore;

import { propertyListings } from "@/assets/data/propertyListings";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { View } from "@/components/Themed";
import { Stack } from "expo-router";
import React, { useState } from "react";

const Explore = () => {
  const [propertyType, setPropertyType] = useState("Warehouse");

  const onDataChange = (propertyType: string) => {
    setPropertyType(propertyType);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onPropertyTypeChange={onDataChange} />,
        }}
      />
      <Listings propertyType={propertyType} listings={propertyListings} />
    </View>
  );
};

export default Explore;

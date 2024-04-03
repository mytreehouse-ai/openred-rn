import React from "react";
import ExploreHeader from "@/components/ExploreHeader";
import PropertyListingsRnMapView from "@/components/PropertyListingsRnMapView";
import PropertyListingsBottomSheet from "@/components/PropertyListingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { defaultStyle } from "@/constants/Styles";
import globalStateStore from "@/store";
import { usePropertyListingsInfiniteQuery } from "@/hooks/usePropertyListingsInfinitieQuery";

const Explore = () => {
  const store = globalStateStore();

  const propertyListingsQuery = usePropertyListingsInfiniteQuery(store.filters);

  const onDataChange = (propertyType: string) => {
    store.updateFilters({ property_type: propertyType });
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

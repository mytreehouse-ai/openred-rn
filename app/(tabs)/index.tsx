import ExploreHeader from "@/components/ExploreHeader";
import PropertyListingsBottomSheet from "@/components/PropertyListingsBottomSheet";
import PropertyListingsRnMapView from "@/components/PropertyListingsRnMapView";
import { defaultStyle } from "@/constants/Styles";
import { usePropertyListingsInfiniteQuery } from "@/hooks/usePropertyListingsInfinitieQuery";
import globalStateStore from "@/store";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

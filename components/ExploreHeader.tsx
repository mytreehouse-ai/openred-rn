import { propertyTypes } from "@/assets/data/propertyTypes";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import globalStateStore from "@/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, SafeAreaView, Text, View } from "./Themed";

interface ExploreHeaderProps {
  onPropertyTypeChange: (propertyType: string) => void;
}

const ExploreHeader = ({ onPropertyTypeChange }: ExploreHeaderProps) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const propertyTypesItemRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const store = globalStateStore();

  useEffect(() => {
    store.updateFilters({
      search: "",
      listing_type: null,
      num_bedrooms_min: 0,
      num_bedrooms_max: 0,
      num_bathrooms_min: 0,
      num_bathrooms_max: 0,
    });
  }, [activeIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[
            styles.searchBtn,
            styles.btnShadow,
            {
              borderColor:
                colorScheme === "light"
                  ? Colors.light.border
                  : Colors.dark.border,
              backgroundColor:
                colorScheme === "light"
                  ? Colors.light.background
                  : Colors.dark.background,
              shadowColor:
                colorScheme === "light"
                  ? Colors.common.gray["900"]
                  : Colors.common.white,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => router.push("/(modals)/booking")}
        >
          <Ionicons name="search-outline" size={30} />
          <View style={{ backgroundColor: "transparent" }}>
            <Text weight="semiBold" fontSize={14}>
              Looking for a specific property?
            </Text>
            <Text>Customize your search!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            styles.btnShadow,
            {
              borderColor:
                colorScheme === "light"
                  ? Colors.light.border
                  : Colors.dark.border,
              backgroundColor:
                colorScheme === "light"
                  ? Colors.light.background
                  : Colors.dark.background,
              shadowColor:
                colorScheme === "light"
                  ? Colors.common.gray["900"]
                  : Colors.common.white,
            },
          ]}
          activeOpacity={0.8}
        >
          <Ionicons name="options-outline" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 16,
          gap: 30,
        }}
      >
        {propertyTypes.map((property, index) => (
          <TouchableOpacity
            key={property.id}
            activeOpacity={0.8}
            style={[
              activeIndex === index
                ? [
                    styles.propertyTypesBtnActive,
                    {
                      borderBottomColor: Colors.light.primary,
                    },
                  ]
                : styles.propertyTypesBtn,
            ]}
            ref={(el) => (propertyTypesItemRef.current[index] = el)}
            onPress={() => {
              const selected = propertyTypesItemRef.current[index];

              setActiveIndex(index);

              if (selected && Platform.OS === "ios") {
                selected.measure((x) => {
                  scrollViewRef.current?.scrollTo({
                    x: x - 16,
                    y: 0,
                    animated: true,
                  });
                });
              }

              // TODO: This isn't working properly.
              if (selected && Platform.OS === "android") {
                selected.measure((x, y, width) => {
                  scrollViewRef.current?.scrollTo({
                    x: index * width,
                    y: 0,
                    animated: true,
                  });
                });
              }

              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onPropertyTypeChange(property.name);
            }}
          >
            <MaterialIcons
              name={property.icon as any}
              size={24}
              color={
                activeIndex === index
                  ? Colors.light.tabIconSelected
                  : Colors.light.tabIconDefault
              }
            />
            <Text weight="semiBold">{property.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: "transparent",
  },
  searchBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 30,
    padding: 14,
    backgroundColor: "transparent",
  },
  btnShadow: {
    elevation: 2,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  propertyTypesBtn: {
    alignItems: "center",
    gap: 4,
    paddingBottom: 10,
  },
  propertyTypesBtnActive: {
    alignItems: "center",
    gap: 4,
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
});

export default ExploreHeader;

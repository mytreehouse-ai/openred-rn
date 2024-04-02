import React, { useRef, useState } from "react";
import { Text, View, SafeAreaView, Ionicons } from "./Themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { propertyTypes } from "@/assets/data/propertyTypes";
import { useColorScheme } from "@/hooks/useColorScheme.web";

interface ExploreHeaderProps {
  onPropertyTypeChange: (propertyType: string) => void;
}

const ExploreHeader = ({ onPropertyTypeChange }: ExploreHeaderProps) => {
  const colorScheme = useColorScheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const propertyTypesItemRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href="/(modals)/booking" asChild>
            <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}>
              <Ionicons name="search-outline" size={30} />
              <View
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <Text
                  style={{ fontFamily: "MontserratSemiBold" }}
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                >
                  Where to?
                </Text>
                <Text
                  style={{ fontFamily: "Montserrat" }}
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                >
                  Any where, Any week!
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
            <Ionicons
              name="options-outline"
              size={24}
              color={Colors.common.gray["900"]}
            />
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
              style={
                activeIndex === index
                  ? styles.propertyTypesBtnActive
                  : styles.propertyTypesBtn
              }
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
                    ? Colors.common.gray["900"]
                    : Colors.common.gray["500"]
                }
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.propertyTypeItemTextActive
                    : styles.propertyTypeItemText
                }
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
              >
                {property.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderBottomColor: Colors.common.gray["100"],
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    borderColor: Colors.common.gray["500"],
    borderRadius: 24,
  },
  searchBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: Colors.common.gray["500"],
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    padding: 14,
    elevation: 2,
    shadowColor: Colors.common.gray["900"],
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  propertyTypeItemText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
  },
  propertyTypeItemTextActive: {
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
  },
  propertyTypesBtn: {
    alignItems: "center",
    gap: 4,
    paddingBottom: 10,
  },
  propertyTypesBtnActive: {
    alignItems: "center",
    gap: 4,
    borderBottomColor: Colors.common.gray["900"],
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
});

export default ExploreHeader;

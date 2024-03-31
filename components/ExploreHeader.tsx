import React, { useRef, useState } from "react";
import { Text, View } from "./Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { propertyTypes } from "@/assets/data/propertyTypes";

interface ExploreHeaderProps {
  onPropertyTypeChange: (propertyType: string) => void;
}

const ExploreHeader = ({ onPropertyTypeChange }: ExploreHeaderProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const propertyTypesItemRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href="/(modals)/booking" asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons
                name="search-outline"
                size={24}
                color={Colors.gray900}
              />
              <View>
                <Text style={{ fontFamily: "MontserratSemiBold" }}>
                  Where to?
                </Text>
                <Text
                  style={{ fontFamily: "Montserrat", color: Colors.gray500 }}
                >
                  Any where, Any week!
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} color={Colors.gray900} />
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
                color={activeIndex === index ? Colors.gray900 : Colors.gray500}
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.propertyTypeItemTextActive
                    : styles.propertyTypeItemText
                }
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
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderBottomColor: Colors.gray100,
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
    borderColor: Colors.gray500,
    borderRadius: 24,
  },
  searchBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.white,
    borderColor: Colors.gray500,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    padding: 14,
    elevation: 2,
    shadowColor: Colors.gray900,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  propertyTypeItemText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
    color: Colors.gray500,
  },
  propertyTypeItemTextActive: {
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
    color: Colors.gray900,
  },
  propertyTypesBtn: {
    alignItems: "center",
    gap: 4,
    paddingBottom: 10,
  },
  propertyTypesBtnActive: {
    alignItems: "center",
    gap: 4,
    borderBottomColor: Colors.gray900,
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
});

export default ExploreHeader;

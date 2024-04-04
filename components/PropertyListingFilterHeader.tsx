import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { PBlurView } from "./CustomBlurView";
import { Ionicons, SafeAreaView, Text } from "./Themed";

const PropertyListingFilterHeader = () => {
  const { height } = Dimensions.get("window");
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <PBlurView
      intensity={Platform.OS === "ios" ? 75 : 100}
      tint={colorScheme as "light" | "dark"}
      style={{ width: "100%", height }}
    >
      <SafeAreaView
        style={[{ backgroundColor: "transparent" }, styles.androidSafeAreaView]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close-outline" size={28} />
        </TouchableOpacity>
        <Text>PropertyListingFilterHeader</Text>
        <Text>PropertyListingFilterHeader</Text>
        <Text>PropertyListingFilterHeader</Text>
        <Text>PropertyListingFilterHeader</Text>
        <Text>PropertyListingFilterHeader</Text>
        <Text>PropertyListingFilterHeader</Text>
        <Text>PropertyListingFilterHeader</Text>
      </SafeAreaView>
    </PBlurView>
  );
};

const styles = StyleSheet.create({
  androidSafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default PropertyListingFilterHeader;

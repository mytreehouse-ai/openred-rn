import PropertyListingDescription from "@/components/PropertyListingDescription";
import {
  AnimatedView,
  Ionicons,
  Text,
  ThemedTouchableOpacity,
  View,
} from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyle } from "@/constants/Styles";
import { useColorScheme } from "@/hooks/useColorScheme";
import { usePropertyListingQuery } from "@/hooks/usePropertyListingQuery";
import globalStateStore from "@/store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect } from "react";
import { Dimensions, Share, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const IMAGE_HEIGHT = 300;
const { width } = Dimensions.get("window");
const PROPERTY_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const PropertyListing = () => {
  const colorScheme = useColorScheme();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const navigation = useNavigation();
  const store = globalStateStore();

  const { data: propertyListing } = usePropertyListingQuery(
    slug,
    store.currentPropertyListingSelected
  );

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  useEffect(() => {
    return () => {
      store.setCurrentPropertyListingSelected(null);
    };
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const shareListing = async () => {
    try {
      await Share.share({
        message: `Check out this listing on Rentalz: ${propertyListing?.listing_url}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT / 1.5], [0, 1]),
    };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <AnimatedView
          style={[headerAnimatedStyle, styles.animatedHeaderContainer]}
        />
      ),
      headerRight: () => (
        <View style={styles.headerBtnContainer}>
          <TouchableOpacity style={[styles.roundBtn]} onPress={shareListing}>
            <Ionicons
              name="share-outline"
              size={22}
              color={Colors.common.gray["900"]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.roundBtn]}>
            <Ionicons
              name="heart-outline"
              size={22}
              color={Colors.common.gray["900"]}
            />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={[styles.roundBtn]} onPress={navigation.goBack}>
          <Ionicons
            name="arrow-back"
            size={22}
            color={Colors.common.gray["900"]}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={defaultStyle.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          defaultSource={{ uri: PROPERTY_IMAGE_PLACEHOLDER }}
          source={{
            uri: propertyListing?.estate.image_url!,
          }}
          style={[styles.propertyListingImage, imageAnimatedStyle]}
        />
        <View style={{ padding: 16, gap: 14 }}>
          <Text weight="bold" style={{ fontSize: 18 }}>
            {propertyListing?.listing_title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <Ionicons
              name="location-outline"
              size={24}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            />
            <Text weight="bold" fontSize={16}>
              {propertyListing?.estate.address ||
                propertyListing?.estate.city.name}
            </Text>
          </View>
          <PropertyListingDescription
            description={
              propertyListing?.estate.markdown ||
              propertyListing?.estate.description ||
              null
            }
          />
        </View>
      </Animated.ScrollView>
      <AnimatedView
        style={defaultStyle.footer}
        entering={SlideInDown.duration(1000).easing(Easing.out(Easing.cubic))}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 5,
            }}
          >
            <Text weight="semiBold" fontSize={18}>
              {propertyListing?.price_formatted}
            </Text>
            <View style={{ alignSelf: "flex-start" }}>
              <Text weight="semiBold" fontSize={16}>
                {propertyListing?.listing_type.description}
              </Text>
            </View>
          </View>
          <ThemedTouchableOpacity
            style={[
              defaultStyle.btn,
              {
                paddingHorizontal: 20,
              },
            ]}
          >
            <Text style={defaultStyle.btnText}>Inquire now</Text>
          </ThemedTouchableOpacity>
        </View>
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedHeaderContainer: {
    height: 100,
  },
  propertyListingImage: {
    height: IMAGE_HEIGHT,
    width,
  },
  headerBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 10,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.common.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.common.gray["500"],
  },
});

export default PropertyListing;

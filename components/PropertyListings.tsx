import Colors from "@/constants/Colors";
import { defaultStyle } from "@/constants/Styles";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ApiBaseResponse } from "@/interfaces/apiBaseResponse";
import { Listing } from "@/interfaces/listing";
import globalStateStore from "@/store";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { Link } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { memo, useEffect, useRef } from "react";
import {
  Dimensions,
  Image,
  ListRenderItem,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { AnimatedView, Ionicons, Text, View } from "./Themed";

interface PropertyListingsProps {
  propertyListingsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiBaseResponse<Listing[]>, unknown>,
    Error
  >;
}

const IMAGE_HEIGHT = 300;
const PROPERTY_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const dummyPropertyListingsData = [
  {
    id: 24440,
    listing_title:
      "For lease: 1 bedroom unit in The Magnolia Residences, New Manila, Quezon City",
    slug: "for-lease-1-bedroom-unit-in-the-magnolia-residences-new-manila-quezon-city",
    listing_url:
      "https://www.lamudi.com.ph/for-lease-1-bedroom-unit-in-the-magnolia-residence-170282105490.html",
    estate: {
      id: 23194,
      building_name: "The Magnolia Residences",
      subdivision_name: null,
      address: null,
      lot_size: 0,
      floor_size: 36.15,
      building_size: 36,
      num_bedrooms: 1,
      num_bathrooms: 1,
      num_carspaces: 0,
      city: {
        id: 1988,
        name: "Quezon City",
        slug: "quezon-city-1988",
      },
      longitude: 121.0306,
      latitude: 14.61633,
      image_url:
        "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x396/4df44b50cfcd53.jpg",
      indoor_features: ["CCTV"],
      outdoor_features: ["24-hour security"],
      other_features: [],
      description: "",
      markdown: null,
      created_at: "2024-03-30T13:18:46.785620+08:00",
      updated_at: "2024-03-30T13:18:46.785657+08:00",
    },
    property_type: {
      id: 1,
      description: "Condominium",
    },
    listing_type: {
      id: 2,
      description: "For Rent",
    },
    property_status: {
      id: 1,
      description: "Available",
    },
    price: "25000.00",
    price_formatted: "₱25,000",
    is_delisted: false,
    is_active: true,
    created_at: "2024-03-30T13:18:46.769288+08:00",
    updated_at: "2024-03-30T13:18:46.769328+08:00",
  },
  {
    id: 24439,
    listing_title: "Modern 1BR Unit at The Residence at Westin Manila",
    slug: "modern-1br-unit-at-the-residence-at-westin-manila",
    listing_url:
      "https://www.lamudi.com.ph/modern-1br-unit-at-the-residence-at-westin-manila-171152478964.html",
    estate: {
      id: 23193,
      building_name: "The Residence at Westin Manila",
      subdivision_name: null,
      address:
        "Barangay, San Miguel Avenue corner Lourdes Drive, Ortigas Center, East, Mandaluyong, 1552 Metro Manila",
      lot_size: 0,
      floor_size: 75.69,
      building_size: 75,
      num_bedrooms: 1,
      num_bathrooms: 1,
      num_carspaces: 0,
      city: {
        id: 1979,
        name: "Mandaluyong",
        slug: "mandaluyong-1979",
      },
      longitude: 121.0363943,
      latitude: 14.5820678,
      image_url:
        "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x396/f807111b79709c.jpg",
      indoor_features: ["Gymnasium"],
      outdoor_features: ["Courtyard"],
      other_features: [],
      description: "",
      markdown: null,
      created_at: "2024-03-30T13:18:06.690106+08:00",
      updated_at: "2024-03-30T13:18:06.690128+08:00",
    },
    property_type: {
      id: 1,
      description: "Condominium",
    },
    listing_type: {
      id: 2,
      description: "For Rent",
    },
    property_status: {
      id: 1,
      description: "Available",
    },
    price: "100000.00",
    price_formatted: "₱100,000",
    is_delisted: false,
    is_active: true,
    created_at: "2024-03-30T13:18:06.674801+08:00",
    updated_at: "2024-03-30T13:18:06.674840+08:00",
  },
];

const PropertyListings: React.FC<PropertyListingsProps> = ({
  propertyListingsQuery,
}) => {
  const colorScheme = useColorScheme();
  const flashListRef = useRef<FlashList<any>>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);
  const store = globalStateStore();

  const {
    isLoading,
    isFetching,
    data: listings,
    fetchNextPage,
  } = propertyListingsQuery;

  function loadMorePropertyListings() {
    if (!isLoading || !isFetching) {
      fetchNextPage();
    }
  }

  useEffect(() => {
    const offset = { offset: 0, animated: true };
    if (Platform.OS === "ios") {
      flashListRef.current?.scrollToOffset(offset);
    }
    if (Platform.OS === "android") {
      flatListRef.current?.scrollToOffset(offset);
    }
  }, [store.filters.property_type]);

  const renderRow = ({ item }: { item: Listing }) => (
    <Link href={`/listing/${item.slug}`} asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => store.setCurrentPropertyListingSelected(item)}
      >
        <AnimatedView
          style={styles.listing}
          entering={
            Platform.OS === "android"
              ? isLoading
                ? FadeInRight.delay(100)
                : undefined
              : FadeInRight
          }
          exiting={
            Platform.OS === "android"
              ? isLoading
                ? FadeOutLeft.delay(100)
                : undefined
              : FadeOutLeft
          }
        >
          <Image
            source={{
              uri: item.estate.image_url ?? PROPERTY_IMAGE_PLACEHOLDER,
            }}
            style={styles.image}
          />
          <Text
            style={{
              fontFamily: "MontserratBold",
              fontSize: 16,
            }}
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
          >
            {item.listing_title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Ionicons
                name="location-outline"
                size={24}
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              />
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 16,
                }}
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
              >
                {item.estate.city.name}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 16,
              }}
              lightColor={Colors.light.text}
              darkColor={Colors.dark.text}
            >
              {item.price_formatted}
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              backgroundColor: "transparent",
              left: 30,
              top: 30,
              gap: 5,
            }}
          >
            <View
              style={{
                padding: 5,
                borderRadius: 5,
              }}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  color: Colors.common.white,
                  fontSize: 14,
                }}
              >
                {item.listing_type.description}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                padding: 5,
                borderRadius: 5,
                flexDirection: "row",
                gap: 5,
              }}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              <Ionicons
                name="expand-outline"
                size={20}
                color={Colors.common.white}
              />
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  color: Colors.common.white,
                  fontSize: 14,
                }}
              >
                {item.property_type.description === "Warehouse" &&
                  item.estate.building_size}
                {["Condominium", "House", "Apartment", "Land"].includes(
                  item.property_type.description
                ) &&
                  (item.estate.floor_size || item.estate.lot_size)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons
              name="heart-outline"
              size={26}
              color={Colors.common.red["600"]}
            />
          </TouchableOpacity>
        </AnimatedView>
      </TouchableOpacity>
    </Link>
  );

  const renderRowForLoading = ({ item }: { item: Listing }) => {
    return (
      <AnimatedView
        style={styles.listing}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <MotiView
          style={{ gap: 10 }}
          animate={{ backgroundColor: "transparent" }}
        >
          <Skeleton
            colorMode={colorScheme as "light" | "dark"}
            width="100%"
            height={300}
          >
            {true ? null : <View />}
          </Skeleton>
          <Skeleton
            colorMode={colorScheme as "light" | "dark"}
            width="100%"
            height={30}
          >
            {true ? null : <View />}
          </Skeleton>
          <Skeleton
            colorMode={colorScheme as "light" | "dark"}
            width="100%"
            height={30}
          >
            {true ? null : <View />}
          </Skeleton>
        </MotiView>
      </AnimatedView>
    );
  };

  const Row = memo(
    isLoading ? renderRowForLoading : renderRow,
    (prevProps, nextProps) => {
      return prevProps.item.id === nextProps.item.id;
    }
  );

  const flatListRenderRow: ListRenderItem<Listing> = ({ item }) => {
    return <Row item={item} />;
  };

  return (
    <View style={defaultStyle.container}>
      {Platform.OS === "ios" ? (
        <View
          style={[
            styles.flashListContainer,
            { paddingBottom: IMAGE_HEIGHT + 4.5 },
          ]}
        >
          <FlashList
            ref={flashListRef}
            data={
              isLoading
                ? dummyPropertyListingsData
                : listings?.pages.map((page) => page.results).flat()
            }
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={200}
            renderItem={isLoading ? renderRowForLoading : renderRow}
            showsVerticalScrollIndicator={false}
            onScrollEndDrag={loadMorePropertyListings}
            ListHeaderComponent={
              isLoading ? (
                <MotiView
                  animate={{
                    backgroundColor: "transparent",
                    paddingHorizontal: 150,
                  }}
                >
                  <Skeleton
                    colorMode={colorScheme as "light" | "dark"}
                    width="100%"
                    height={30}
                  >
                    {true ? null : <View />}
                  </Skeleton>
                </MotiView>
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ fontFamily: "MontserratSemiBold", fontSize: 16 }}
                    lightColor={Colors.light.text}
                    darkColor={Colors.dark.text}
                  >
                    {listings?.pages.map((page) => page.results).flat().length}{" "}
                    {store.filters.property_type}
                  </Text>
                </View>
              )
            }
          />
        </View>
      ) : (
        <BottomSheetFlatList
          ref={flatListRef}
          data={
            isLoading
              ? dummyPropertyListingsData
              : listings?.pages.map((page) => page.results).flat()
          }
          initialNumToRender={15}
          renderItem={flatListRenderRow}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={loadMorePropertyListings}
          ListHeaderComponent={
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ fontFamily: "MontserratSemiBold" }}
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
              >
                {listings?.pages.map((page) => page.results).flat().length}{" "}
                {store.filters.property_type}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flashListContainer: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  listing: {
    padding: 16,
    gap: 10,
  },
  image: {
    width: "100%",
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
});

export default PropertyListings;

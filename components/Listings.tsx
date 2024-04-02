import React, { memo, useEffect, useRef } from "react";
import {
  Dimensions,
  Image,
  ListRenderItem,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Link } from "expo-router";
import { AnimatedView, Ionicons, Text, View } from "./Themed";
import { Listing } from "@/interfaces/listing";
import { FlashList } from "@shopify/flash-list";
import { useTodosQuery } from "@/hooks/useTodosQuery";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { Skeleton } from "moti/skeleton";
import { defaultStyle } from "@/constants/Styles";
import { MotiView } from "moti";
import { useColorScheme } from "@/hooks/useColorScheme";

interface ListingsProps {
  propertyType: string;
  listings: Listing[];
  refresh: number;
}

const IMAGE_HEIGHT = 300;
const PROPERTY_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Listings: React.FC<ListingsProps> = ({
  propertyType,
  listings,
  refresh,
}) => {
  const colorScheme = useColorScheme();
  const flashListRef = useRef<FlashList<any>>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);
  const items = listings.filter(
    (l) => l.property_type.description === propertyType
  );

  const { isLoading, data } = useTodosQuery(propertyType);

  useEffect(() => {
    if (refresh || propertyType) {
      if (Platform.OS === "ios") {
        flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
      } else if (Platform.OS === "android") {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }
    }
  }, [refresh, propertyType]);

  const renderRow = ({ item }: { item: Listing }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8}>
        <AnimatedView
          style={styles.listing}
          entering={FadeInRight.delay(Platform.OS === "android" ? 100 : 0)}
          exiting={FadeOutLeft.delay(Platform.OS === "android" ? 100 : 0)}
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
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <Ionicons name="location-outline" size={24} />
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
              left: 30,
              top: 30,
              flexDirection: "row",
              gap: 5,
              backgroundColor: "transparent",
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
            <Ionicons name="heart-outline" size={24} color="red" />
          </TouchableOpacity>
        </AnimatedView>
      </TouchableOpacity>
    </Link>
  );

  const renderRowForLoading = ({ item }: { item: Listing }) => {
    return (
      <AnimatedView
        style={styles.listing}
        entering={FadeInRight.delay(Platform.OS === "android" ? 100 : 0)}
        exiting={FadeOutLeft.delay(Platform.OS === "android" ? 100 : 0)}
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
            { paddingBottom: items.length >= 15 ? IMAGE_HEIGHT + 2 : 0 },
          ]}
        >
          <FlashList
            ref={flashListRef}
            data={isLoading ? [] : items}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={200}
            renderItem={isLoading ? renderRowForLoading : renderRow}
            ListHeaderComponent={
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontFamily: "MontserratSemiBold" }}
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                >
                  {listings.length} {propertyType}
                </Text>
              </View>
            }
          />
        </View>
      ) : (
        <BottomSheetFlatList
          ref={flatListRef}
          data={isLoading ? [] : items}
          initialNumToRender={15}
          renderItem={flatListRenderRow}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ fontFamily: "MontserratSemiBold" }}
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
              >
                {listings.length} {propertyType}
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

export default Listings;

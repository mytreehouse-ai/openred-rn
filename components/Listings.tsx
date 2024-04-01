import React, { useEffect, useRef, useState, memo } from "react";
import {
  Image,
  ListRenderItem,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Link } from "expo-router";
import { Text, View } from "./Themed";
import { Listing } from "@/interfaces/listing";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { useTodosQuery } from "@/hooks/useTodosQuery";

interface ListingsProps {
  propertyType: string;
  listings: Listing[];
  refresh: number;
}

const PROPERTY_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Listings: React.FC<ListingsProps> = ({
  propertyType,
  listings,
  refresh,
}) => {
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const items = listings.filter(
    (l) => l.property_type.description === propertyType
  );

  const { isLoading, data } = useTodosQuery();

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  const Row = memo(
    ({ item }: { item: Listing }) => (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
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
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={24} color={Colors.gray900} />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    ),
    (prevProps, nextProps) => {
      // Only re-render if the item's id has changed
      return prevProps.item.id === nextProps.item.id;
    }
  );

  const renderRow: ListRenderItem<Listing> = ({ item }) => {
    return <Row item={item} />;
  };

  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        ref={listRef}
        data={isLoading ? [] : items}
        initialNumToRender={5}
        renderItem={renderRow}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>
              {listings.length} {propertyType}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listing: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default Listings;

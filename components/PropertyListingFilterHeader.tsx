import Colors from "@/constants/Colors";
import { defaultStyle } from "@/constants/Styles";
import { useColorScheme } from "@/hooks/useColorScheme";
import globalStateStore from "@/store";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import React, { Fragment, useEffect, useReducer } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { PBlurView } from "./CustomBlurView";
import { Ionicons, SafeAreaView, Text, View } from "./Themed";

type FilterState = {
  search: string;
  listingType: string | null;
  bedrooms: number;
  bathrooms: number;
  minSqm: number;
  maxSqm: number;
};

type FilterAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_LISTING_TYPE"; payload: string | null }
  | { type: "SET_BEDROOMS"; payload: number }
  | { type: "SET_BATHROOMS"; payload: number }
  | { type: "SET_MIN_SQM"; payload: number }
  | { type: "SET_MAX_SQM"; payload: number };

const initialState: FilterState = {
  search: "",
  listingType: null,
  bedrooms: 0,
  bathrooms: 0,
  minSqm: 0,
  maxSqm: 0,
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_LISTING_TYPE":
      return { ...state, listingType: action.payload };
    case "SET_BEDROOMS":
      return { ...state, bedrooms: action.payload };
    case "SET_BATHROOMS":
      return { ...state, bathrooms: action.payload };
    case "SET_MIN_SQM":
      return { ...state, minSqm: action.payload };
    case "SET_MAX_SQM":
      return { ...state, maxSqm: action.payload };
    default:
      return state;
  }
}

const PropertyListingFilterHeader = () => {
  const { height } = Dimensions.get("window");
  const router = useRouter();
  const store = globalStateStore();
  const colorScheme = useColorScheme();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    if (store.filters) {
      dispatch({
        type: "SET_SEARCH",
        payload: store.filters.search ?? "",
      });
      dispatch({
        type: "SET_LISTING_TYPE",
        payload: store.filters.listing_type ?? null,
      });
      dispatch({
        type: "SET_BEDROOMS",
        payload: store.filters.num_bedrooms_max ?? 0,
      });
      dispatch({
        type: "SET_BATHROOMS",
        payload: store.filters.num_bathrooms_max ?? 0,
      });
    }
  }, []);

  function onSubmitPropertyListingFilter() {
    function getSqmParam(property_type: string, isMin: boolean) {
      const sizeType = isMin ? "min" : "max";
      switch (property_type) {
        case "Warehouse":
          return `building_size_${sizeType}`;
        case "Land":
          return `lot_size_${sizeType}`;
        default:
          return `floor_size_${sizeType}`;
      }
    }

    store.updateFilters({
      search: state.search,
      listing_type: state.listingType,
      num_bathrooms_min: state.bedrooms,
      num_bedrooms_max: state.bedrooms,
      num_bedrooms_min: state.bathrooms,
      num_bathrooms_max: state.bathrooms,
      [getSqmParam(store.filters.property_type!, true)]: state.minSqm,
      [getSqmParam(store.filters.property_type!, false)]: state.maxSqm,
    });

    router.back();
  }

  return (
    <PBlurView
      intensity={Platform.OS === "ios" ? 75 : 80}
      tint={colorScheme as "light" | "dark"}
      style={{ width: "100%", height }}
    >
      <SafeAreaView
        style={[{ backgroundColor: "transparent" }, styles.androidSafeAreaView]}
      >
        <View style={styles.closeBtnContainer}>
          <TouchableOpacity
            style={[
              styles.closeBtn,
              {
                borderColor:
                  colorScheme === "light"
                    ? Colors.light.border
                    : Colors.dark.border,
              },
            ]}
            onPress={() => router.back()}
            activeOpacity={0.75}
          >
            <Ionicons name="close-outline" size={24} />
          </TouchableOpacity>
          <Text weight="semiBold" fontSize={16}>
            Customize Property Search
          </Text>
        </View>
        <View
          style={{
            margin: 16,
            padding: 16,
            gap: 16,
            borderRadius: 8,
          }}
        >
          <TextInput
            style={[
              defaultStyle.inpField,
              {
                fontFamily: "Montserrat",
                fontSize: 16,
                color:
                  colorScheme === "light"
                    ? Colors.light.text
                    : Colors.dark.text,
              },
            ]}
            value={state.search}
            placeholder={`Searching for ${store.filters.property_type?.toLowerCase()}`}
            onChangeText={(text) =>
              dispatch({ type: "SET_SEARCH", payload: text })
            }
          />
          <RNPickerSelect
            darkTheme={colorScheme === "dark"}
            style={{
              inputIOS: {
                ...defaultStyle.inpField,
                fontFamily: "Montserrat",
                fontSize: 16,
                color:
                  colorScheme === "light"
                    ? Colors.light.text
                    : Colors.dark.text,
              },
              inputAndroid: {
                ...defaultStyle.inpField,
                borderWidth: StyleSheet.hairlineWidth,
                fontFamily: "Montserrat",
                fontSize: 16,
                color:
                  colorScheme === "light"
                    ? Colors.light.text
                    : Colors.dark.text,
              },
              iconContainer: { padding: 12 },
            }}
            placeholder={{
              label: "Listing type",
              value: null,
            }}
            value={state.listingType}
            onValueChange={(value) =>
              dispatch({ type: "SET_LISTING_TYPE", payload: value })
            }
            items={[
              { label: "For Sale", value: "for-sale" },
              { label: "For Rent", value: "for-rent" },
            ]}
            Icon={() => <Ionicons name="chevron-down-outline" size={24} />}
          />
          {!["Warehouse", "Land"].includes(store.filters.property_type!) && (
            <Fragment>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text fontSize={16}>Bedrooms</Text>
                <View
                  style={{
                    gap: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    disabled={state.bedrooms === 10}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary,
                    }}
                    activeOpacity={0.75}
                    onPress={() =>
                      state.bedrooms < 10 &&
                      dispatch({
                        type: "SET_BEDROOMS",
                        payload: state.bedrooms + 1,
                      })
                    }
                  >
                    <Ionicons name="add" size={24} />
                  </TouchableOpacity>
                  <Text
                    fontSize={16}
                    style={{
                      textAlign: "center",
                      width: 20,
                    }}
                    lightColor={Colors.light.text}
                    darkColor={Colors.dark.text}
                  >
                    {state.bedrooms}
                  </Text>
                  <TouchableOpacity
                    disabled={state.bedrooms <= 0}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      alignItems: "center",
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary,
                    }}
                    activeOpacity={0.75}
                    onPress={() =>
                      state.bedrooms > 0 &&
                      dispatch({
                        type: "SET_BEDROOMS",
                        payload: state.bedrooms - 1,
                      })
                    }
                  >
                    <AntDesign
                      name="minus"
                      size={24}
                      color={
                        colorScheme === "light"
                          ? Colors.light.text
                          : Colors.dark.text
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text fontSize={16}>Bathrooms</Text>
                <View
                  style={{
                    gap: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    disabled={state.bathrooms === 10}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary,
                    }}
                    activeOpacity={0.75}
                    onPress={() =>
                      state.bathrooms < 10 &&
                      dispatch({
                        type: "SET_BATHROOMS",
                        payload: state.bathrooms + 1,
                      })
                    }
                  >
                    <Ionicons
                      name="add"
                      size={24}
                      lightColor={Colors.light.text}
                      darkColor={Colors.dark.text}
                    />
                  </TouchableOpacity>
                  <Text
                    fontSize={16}
                    style={{
                      textAlign: "center",
                      width: 20,
                    }}
                  >
                    {state.bathrooms}
                  </Text>
                  <TouchableOpacity
                    disabled={state.bathrooms <= 0}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                      alignItems: "center",
                      backgroundColor:
                        colorScheme === "light"
                          ? Colors.light.primary
                          : Colors.dark.primary,
                    }}
                    activeOpacity={0.75}
                    onPress={() =>
                      state.bathrooms > 0 &&
                      dispatch({
                        type: "SET_BATHROOMS",
                        payload: state.bathrooms - 1,
                      })
                    }
                  >
                    <AntDesign
                      name="minus"
                      size={24}
                      color={
                        colorScheme === "light"
                          ? Colors.light.text
                          : Colors.dark.text
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Fragment>
          )}
          <Text fontSize={16}>{state.minSqm}</Text>
          <Slider
            style={{ width: "100%", height: 20 }}
            minimumValue={0}
            maximumValue={5000}
            value={state.minSqm}
            onValueChange={(value) => {
              const newValue = Math.floor(value);
              dispatch({ type: "SET_MIN_SQM", payload: newValue });
            }}
            minimumTrackTintColor={
              colorScheme === "light" ? Colors.light.border : Colors.dark.border
            }
            maximumTrackTintColor={
              colorScheme === "light"
                ? Colors.light.primary
                : Colors.dark.primary
            }
          />
          <Text fontSize={16}>{`${state.minSqm} - ${state.maxSqm}`}</Text>
          <Slider
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={10000}
            value={state.maxSqm}
            onValueChange={(value) => {
              const newValue = Math.floor(value);
              dispatch({ type: "SET_MAX_SQM", payload: newValue });
            }}
            minimumTrackTintColor={
              colorScheme === "light" ? Colors.light.border : Colors.dark.border
            }
            maximumTrackTintColor={
              colorScheme === "light"
                ? Colors.light.primary
                : Colors.dark.primary
            }
          />
          <TouchableOpacity
            style={[
              defaultStyle.btn,
              {
                backgroundColor:
                  colorScheme === "light"
                    ? Colors.light.primary
                    : Colors.dark.primary,
              },
            ]}
            activeOpacity={0.75}
            onPress={onSubmitPropertyListingFilter}
          >
            <Text style={defaultStyle.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </PBlurView>
  );
};

const styles = StyleSheet.create({
  androidSafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  closeBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default PropertyListingFilterHeader;

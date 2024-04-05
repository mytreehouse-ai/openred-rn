/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import Colors from "@/constants/Colors";
import DefaultIonicons from "@expo/vector-icons/Ionicons";
import {
  SafeAreaView as DefaultSafeAreaView,
  Text as DefaultText,
  TouchableOpacity as DefaultTouchableOpacity,
  View as DefaultView,
} from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";
import { useColorScheme } from "../hooks/useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

interface IoniconsBaseProps {
  name: React.ComponentProps<typeof DefaultIonicons>["name"];
  style?: React.ComponentProps<typeof DefaultIonicons>["style"];
  color?: string;
  size?: number;
}

interface TextExtraProps {
  weight?: "primary" | "semiBold" | "bold";
  fontSize?: number;
}

export type TextProps = ThemeProps & TextExtraProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type AnimatedViewProps = ThemeProps & AnimatedProps<ViewProps>;
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaView["props"];
export type IoniconsProps = ThemeProps & IoniconsBaseProps;
export type TouchableOpacityProps = ThemeProps &
  DefaultTouchableOpacity["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Ionicons({
  name,
  style,
  color,
  size,
  lightColor = Colors.light.text,
  darkColor = Colors.dark.text,
}: IoniconsProps) {
  const defaultColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  return (
    <DefaultIonicons
      style={style}
      name={name}
      color={color ?? defaultColor}
      size={size}
    />
  );
}

export function Text(props: TextProps) {
  const {
    style,
    weight = "primary",
    fontSize = 14,
    lightColor = Colors.light.text,
    darkColor = Colors.dark.text,
    ...otherProps
  } = props;

  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  let fontFamily = "Montserrat";

  if (weight === "semiBold") {
    fontFamily = "MontserratSemiBold";
  } else if (weight === "bold") {
    fontFamily = "MontserratBold";
  }

  return (
    <DefaultText
      style={[{ color, fontSize, fontFamily }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const {
    style,
    lightColor = Colors.light.background,
    darkColor = Colors.dark.background,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function AnimatedView(props: AnimatedViewProps) {
  const {
    style,
    lightColor = Colors.light.background,
    darkColor = Colors.dark.background,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const SafeAreaView = (props: SafeAreaViewProps) => {
  const {
    style,
    lightColor = Colors.light.background,
    darkColor = Colors.dark.background,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
};

export const ThemedTouchableOpacity = (props: TouchableOpacityProps) => {
  const {
    style,
    lightColor = Colors.light.primary,
    darkColor = Colors.dark.primary,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultTouchableOpacity
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
};

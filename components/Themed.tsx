/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  SafeAreaView as DefaultSafeAreaView,
} from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "../hooks/useColorScheme";
import Animated, { AnimatedProps } from "react-native-reanimated";
import DefaultIonicons from "@expo/vector-icons/Ionicons";

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

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type AnimatedViewProps = ThemeProps & AnimatedProps<ViewProps>;
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaView["props"];
export type IoniconsProps = ThemeProps & IoniconsBaseProps;

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
  lightColor,
  darkColor,
}: IoniconsProps) {
  const defaultColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  return (
    <DefaultIonicons
      style={[{ marginBottom: -3 }, style]}
      name={name}
      color={color ?? defaultColor}
      size={size}
    />
  );
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function AnimatedView(props: AnimatedViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const SafeAreaView = (props: SafeAreaViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
};

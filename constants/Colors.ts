const tintColorLight = "#10b981";
const tintColorDark = "#FFF";

/**
 * Shades of emerald for light mode
 * Primary - #34d399
 * Secondary - #10b981
 * Tertiary - #059669
 */

/**
 * Shades of emerald for dark mode
 * Primary - #065f46
 * Secondary - #064e3b
 * Tertiary - #047857
 */

/**
 * Shades of gray (for background)
 * Primary - #121212
 * Secondary - #030712
 * Tertiary - #111827
 * Quaternary - #1f2937
 */

/**
 * For text in light mode
 * Primary - #030712
 * Secondary - #374151
 *
 * For text in dark mode
 * Primary - #10b981
 * Secondary - #34d399
 */

export default {
  common: {
    white: "#FFFFFF",
    black: "#000000",
    red: {
      400: "#f87171",
      600: "#dc2626",
    },
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      500: "#6B7280",
      900: "#111827",
    },
    semiTransparentWhite: "rgba(255,255,255,0.8)",
    semiTransparentBlack: "rgba(0,0,0,0.8)",
  },
  light: {
    primary: "#34D399",
    secondary: "#10B981",
    text: "#121212",
    background: "#FFFFFF",
    border: "#E5E7EB",
    tint: tintColorLight,
    tabIconDefault: "#7E7E7F",
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: "#2F855A",
    secondary: "#276749",
    text: "#FFF",
    background: "#121212",
    border: "#4A5568",
    tint: tintColorDark,
    tabIconDefault: "#9E9E9F",
    tabIconSelected: tintColorDark,
  },
};

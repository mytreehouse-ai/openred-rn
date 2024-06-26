module.exports = {
  expo: {
    name: "openred-rn",
    slug: "openred-rn",
    owner: "openred",
    extra: {
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
      djangoApiUrl: process.env.EXPO_PUBLIC_DJANGO_API_URL,
      eas: {
        projectId: "62cce75b-0345-4c66-b8a6-7803734ced0e",
      },
    },
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "openred",
      supportsTablet: false,
    },
    android: {
      package: "com.openred",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    updates: {
      url: "https://u.expo.dev/62cce75b-0345-4c66-b8a6-7803734ced0e",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-secure-store"],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
  },
};

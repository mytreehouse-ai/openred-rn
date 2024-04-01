import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    return await SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat: require("@/assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    ...FontAwesome.font,
  });

  const queryClient = new QueryClient();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey ?? ""}
      tokenCache={tokenCache}
    >
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const conn = state.isConnected;
      console.log("Connection type", state.type);
      !conn ? alert("No Internet Connection!") : null;
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            headerTitle: "Wala lang po",
            headerTransparent: false,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="(modals)/login"
          options={{
            presentation: "modal",
            title: "Login or Sign up",
            headerTitleStyle: {
              fontFamily: "MontserratSemiBold",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="listing/[id]"
          options={{
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="(modals)/booking"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            title: "Booking",
            headerTitleStyle: {
              fontFamily: "MontserratSemiBold",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

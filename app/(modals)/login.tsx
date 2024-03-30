import React from "react";
import { Text, View } from "@/components/Themed";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { defaultStyle } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Login = () => {
  const router = useRouter();

  useWarmUpBrowser();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });

        router.back();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[defaultStyle.container, { padding: 24 }]}>
      <View style={{ gap: 24 }}>
        <TextInput
          autoCapitalize="none"
          style={[defaultStyle.inpField]}
          placeholder="Email"
        />
        <TextInput
          autoCapitalize="none"
          style={[defaultStyle.inpField]}
          placeholder="Password"
        />
        <TouchableOpacity style={[defaultStyle.btn]}>
          <Text style={defaultStyle.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#ababab",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.separator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#ababab",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={{ gap: 24 }}>
        <TouchableOpacity
          style={defaultStyle.btnOutline}
          onPress={() => void onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="logo-google"
            size={24}
            style={defaultStyle.btnIconLeft}
          />
          <Text style={defaultStyle.btnOutlineText}>Continue With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[defaultStyle.btnOutline]}
          onPress={() => void onSelectAuth(Strategy.Apple)}
        >
          <Ionicons
            name="logo-apple"
            size={24}
            style={defaultStyle.btnIconLeft}
          />
          <Text style={defaultStyle.btnOutlineText}>Continue With Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyle.btnOutline}
          onPress={() => void onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            style={defaultStyle.btnIconLeft}
          />
          <Text style={defaultStyle.btnOutlineText}>
            Continue With Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  seperatorView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
    gap: 10,
  },
  separator: {
    fontFamily: "MonserratSemiBold",
    color: "#ababab",
  },
});

export default Login;

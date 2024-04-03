import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { defaultStyle } from "@/constants/Styles";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const Profile = () => {
  const { user } = useUser();
  const colorScheme = useColorScheme();
  const { signOut, isSignedIn } = useAuth();

  async function onPickImage() {
    try {
      const imagePicker = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.75,
        base64: true,
      });

      if (!imagePicker.canceled && user) {
        const base64Image = `data:image/jpeg;base64,${imagePicker.assets[0].base64}`;
        await user.setProfileImage({
          file: base64Image,
        });
      }
    } catch (error) {
      console.log(error);
      alert("Error setting profile image");
    }
  }

  return (
    <View
      style={[
        defaultStyle.container,
        { padding: 16, alignItems: isSignedIn ? "stretch" : "center" },
      ]}
    >
      {isSignedIn ? (
        <View
          style={[
            styles.card,
            styles.shadow,
            {
              shadowColor:
                colorScheme === "light"
                  ? Colors.common.gray["900"]
                  : Colors.common.white,
              borderColor:
                colorScheme === "light"
                  ? Colors.light.border
                  : Colors.dark.border,
            },
          ]}
          lightColor={Colors.light.background}
          darkColor={Colors.dark.background}
        >
          <View
            style={{ position: "relative", backgroundColor: "transparent" }}
          >
            <TouchableOpacity onPress={onPickImage} activeOpacity={0.75}>
              <Image
                source={{
                  uri: user?.imageUrl,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", gap: 2 }}>
            <Text
              style={{ fontFamily: "MontserratSemiBold", fontSize: 16 }}
              lightColor={Colors.light.text}
              darkColor={Colors.dark.text}
            >
              {user?.firstName}
            </Text>
            <Text
              style={{ fontFamily: "MontserratSemiBold", fontSize: 16 }}
              lightColor={Colors.light.text}
              darkColor={Colors.dark.text}
            >
              {user?.lastName}
            </Text>
          </View>
          {isSignedIn && (
            <TouchableOpacity
              onPress={async () => await signOut()}
              activeOpacity={0.8}
            >
              <Text
                style={{ fontFamily: "MontserratSemiBold", fontSize: 16 }}
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
              >
                Logout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Link href="/(modals)/login" asChild>
          <TouchableOpacity activeOpacity={0.75}>
            <Text
              style={{ fontFamily: "Montserrat", fontSize: 16 }}
              lightColor={Colors.light.text}
              darkColor={Colors.dark.text}
            >
              Login
            </Text>
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 14,
    height: 300,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  shadow: {
    elevation: 2,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
  },
});

export default Profile;

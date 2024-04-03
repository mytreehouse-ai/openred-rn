import { Text, View } from "@/components/Themed";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet } from "react-native";

const Profile = () => {
  const { user } = useUser();
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
        user.setProfileImage({
          file: base64Image,
        });
      }
    } catch (error) {
      console.log(error);
      alert("Error setting profile image");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Profile</Text>
      <MotiView animate={{ backgroundColor: "#fff" }}>
        <Skeleton colorMode="light" width={50} height={50}>
          {true ? null : (
            <View>
              <Text>aa</Text>
            </View>
          )}
        </Skeleton>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {},
});

export default Profile;

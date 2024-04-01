import { Text, View } from "@/components/Themed";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";

const Profile = () => {
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

export default Profile;

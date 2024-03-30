import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import React from "react";

const Explore = () => {
  return (
    <View>
      <Text>Explore</Text>
      <Link href="/(modals)/booking">Booking</Link>
      <Link href="/(modals)/login">Login</Link>
      <Link href="/listing/243894">Listing details</Link>
    </View>
  );
};

export default Explore;

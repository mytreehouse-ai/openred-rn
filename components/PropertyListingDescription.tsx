import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import Markdown from "react-native-markdown-display";

interface PropertyListingDescriptionProps {
  description: string | null;
}

const PropertyListingDescription: React.FC<PropertyListingDescriptionProps> = ({
  description,
}) => {
  const colorScheme = useColorScheme();

  return (
    <Markdown
      style={{
        body: {
          fontFamily: "Montserrat",
          fontSize: 12,
          color: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
        },
        heading1: {
          fontFamily: "MontserratBold",
          fontSize: 15,
          marginBottom: 4,
        },
        heading2: {
          fontFamily: "MontserratSemiBold",
          fontSize: 14,
          marginBottom: 4,
        },
        heading3: {
          fontFamily: "MontserratSemiBold",
          fontSize: 12.6,
          marginBottom: 4,
        },
        heading4: {
          fontFamily: "MontserratSemiBold",
          fontSize: 11.2,
          marginBottom: 4,
        },
        heading5: {
          fontFamily: "MontserratSemiBold",
          fontSize: 9.8,
          marginBottom: 4,
        },
        heading6: {
          fontFamily: "MontserratSemiBold",
          fontSize: 8.4,
          marginBottom: 4,
        },
      }}
    >
      {description ? description : "No description 🫗"}
    </Markdown>
  );
};

export default PropertyListingDescription;

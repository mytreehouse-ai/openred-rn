import DefaultIonicons from "@expo/vector-icons/Ionicons";

function Ionicons(props: {
  name: React.ComponentProps<typeof DefaultIonicons>["name"];
  color: string;
  size?: number;
}) {
  return <DefaultIonicons style={{ marginBottom: -3 }} {...props} />;
}

export default Ionicons;

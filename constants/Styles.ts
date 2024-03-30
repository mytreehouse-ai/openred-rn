import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  inpField: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ababab",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ababab",
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  btnText: {
    color: "#fff",
    fontFamily: "MonserratSemiBold",
    fontSize: 16,
  },
  btnOutlineText: {
    color: "#000",
    fontFamily: "MonserratSemiBold",
    fontSize: 16,
  },
  btnIconLeft: {
    position: "absolute",
    left: 16,
  },
  btnIconRight: {
    position: "absolute",
    right: 16,
  },
});

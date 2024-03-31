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
    fontFamily: "MontserratSemiBold",
    fontSize: 16,
  },
  btnOutlineText: {
    color: "#000",
    fontFamily: "MontserratSemiBold",
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
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.gray200,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

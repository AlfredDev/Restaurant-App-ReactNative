import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { theme } from "../core/theme";

export const Container = ({ child }) => {
  return (
    <ImageBackground
      resizeMode="repeat"
      style={styles.background}
      source={require("../assets/background_dot.png")}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      ></KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding:20
  },
});

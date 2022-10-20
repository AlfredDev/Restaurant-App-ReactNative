import { Image, StyleSheet } from "react-native";

export const Logo = () => {
  return <Image source={require("../assets/logo1.png")} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

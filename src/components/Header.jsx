import React from "react";
import { StyleSheet, Text, View } from "react-native";
export const Header = ({ titulo }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text_header}>{titulo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // flex: 0.5,
    // paddingHorizontal: 20,
    alignItems: "center",
    // backgroundColor: "#009387",
    justifyContent: "center",
    alignItems: "center",
  },
  text_header: {
    fontWeight: "bold",
    letterSpacing: 1,
    fontSize: 30,
    textAlign: "center",
    // color: theme.colors.primary,
    color: "black",
    marginTop: 15,
    // marginBottom:5
  },
});

import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../core/theme";

export const BackBtn = ({ navigation, goHome }) => {
  return (
    <TouchableOpacity onPress={() => goHome()}>
      <View style={styles.back}>
        <Ionicons name={"chevron-back"} size={40} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  back: {
    backgroundColor: theme.colors.text,
    heigh: 30,
    width: 40,
    position: "absolute",
    top: 37,
    left: 15,
    borderRadius: 10,
  },
});

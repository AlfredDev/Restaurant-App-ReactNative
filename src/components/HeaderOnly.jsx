import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";
export const HeaderOnly = ({ descripcion, subtitle }) => {
  return (
    <View style={styles.header2}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          color: "#fff",
          marginTop: 10,
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        {descripcion}
      </Text>

      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          color: "#fff",
          // marginTop: 10,
          marginBottom: 10,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header2: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    color: "#fff",
    marginTop: 15,
    // position: 'relative',
    height: 500,
    // top: 5,
    color: "write",
    marginBottom: 15,
  },
});

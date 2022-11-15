import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";

export const OrdenItem = ({ id, folio, navigation }) => {
  return (
    <TouchableOpacity>
      <View style={styles.addcompont}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: theme.colors.text,
            // marginTop: 10,
            marginBottom: 10,
          }}
        >
          {folio}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addcompont: {
    backgroundColor: theme.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    width: "98%",
    height: 58,
    borderRadius: 12,
    margin: 5,
  },
});

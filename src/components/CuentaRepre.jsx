import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";

export const CuentaRepre = ({ id, description, nombre, navigation ,mesa,cuenta}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Orden", {
          itemId: id,
          description: description,
          nombre: nombre,
          mesa:mesa,
          cuenta: cuenta,
        })
      }
    >
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
          {nombre}
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
    width: 350,
    height: 58,
    borderRadius: 12,
    margin: 5,
  },
  
});

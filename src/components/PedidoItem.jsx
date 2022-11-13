import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const PedidoItem = ({ producto, tamaño, cantidad, descripción }) => {
  return (
    <View style={styles.head}>
      <View style={styles.des}>
        <Text>{producto}</Text>
      </View>
      <View style={styles.des}>
        <Text>{tamaño}</Text>
      </View>
      <View style={styles.des}>
        <Text>{cantidad}</Text>
      </View>
      <View style={styles.des}>
        <Text>{descripción}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "auto",
    // borderColor: "#D8D2CB",
    padding: 2,
    width: "90%",
    marginTop: 2,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  des: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
    padding: 3,
  },
});

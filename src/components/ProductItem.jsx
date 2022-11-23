import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export const ProductItem = ({ id,producto,cantidad,precio }) => {
  

  return (
    <TouchableOpacity >
      <View style={styles.item}>
        <View style={styles.id}>
          <Text>{id}</Text>
        </View>
        <View style={styles.producto}>
          <Text>{producto}</Text>
        </View>
        <View style={styles.cantidad}>
          <Text>{cantidad}</Text>
        </View>
        <View style={styles.precio}>
          <Text>$ {precio}.00</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "95%",
    height: 30,
    marginLeft: 10,
    marginTop: 2,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  id: {
    width: "12%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    
  },
  producto: {
    width: "35%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
  cantidad: {
    width: "23%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
  precio: {
    width: "18%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
});

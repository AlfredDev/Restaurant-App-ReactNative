import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PedidoItem } from "./PedidoItem";

export const OrderLIst = () => {
  const tableHead = ["Producto,Tamaño,Cantidad,Descripcion"];

  return (
    <>
      <View style={styles.head}>
        <View>
          <Text style={styles.txt}>Producto</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Tamaño</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Cantidad</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Descripcion</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.com}>
          <PedidoItem />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  head: {
    backgroundColor: "#D8D2CB",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: 30,
    borderWidth: 1,
    // borderColor: "#D8D2CB",
    padding: 5,
    width: "90%",
    margin: 0,
  },
  row: {
    borderLeftColor: "black",
    height: 25,
    borderLeftWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    textAlign: "center",
    marginLeft: 9,
  },
  com: {
    justifyContent: "center",
    alignItems: "center",
  },
});

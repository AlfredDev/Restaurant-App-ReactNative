import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { currencyFormat, generateUUID } from "../helpers/Backed";
import { DetalleItem } from "./DetalleItem";
import { PedidoItem } from "./PedidoItem";

export const OrderLIst = ({ ordenes }) => {
  // const tableHead = ["Producto,Tamaño,Cantidad,Descripcion"];

  useEffect(() => {
    ordena();
  }, [ordenes])


  const [detalle, setDetalle] = useState([]);

  const ordena = () => {
    const data = [];
    ordenes.forEach(or => {
      or.forEach(sub => {
        data.push(sub);
      })
    })
    setDetalle(data);
  }


  return (
    <>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.txt}>Producto</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Tamaño</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Cantidad</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Total</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.com}>
          {
            detalle.map((or) => (
              <DetalleItem producto={or.producto} cantidad = {or.cantidad} tamaño = {or.tamaño} precio = {currencyFormat(or.precio)}/>
            ))
          }
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  table: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'space-around',
    borderWidth: 1.3,
    height: 30,
    backgroundColor: '#D8D2CB',
  },
  row: {
    borderLeftColor: "black",
    height: 25,
    borderLeftWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  txt: {
    textAlign: "center",
    marginLeft: 9,
  },
  // com: {
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

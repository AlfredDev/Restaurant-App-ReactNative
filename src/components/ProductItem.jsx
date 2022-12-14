import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export const ProductItem = ({ navigation, product, id, producto, cantidad, precio }) => {

  const modificaProducto = () => {
    navigation.navigate("ModificarProductos", {
      product: product,
    });
  };

  return (
    <TouchableOpacity onPress={modificaProducto}>
      <View style={styles.item}>
        <View style={cantidad < 3 ? styles.idP:styles.id}>
          <Text>{id}</Text>
        </View>
        <View style={cantidad < 3 ?styles.productoP:styles.producto}>
          <Text>{producto}</Text>
        </View>
        <View style={cantidad < 3 ?styles.cantidadP:styles.cantidad}>
          <Text>{cantidad}</Text>
        </View>
        <View style={cantidad < 3 ?styles.precioP:styles.precio}>
          <Text>$ {precio}</Text>
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

  idP: {
    width: "12%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#FF3366",
    
  },
  productoP: {
    width: "35%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    backgroundColor:"#FF3366",
  },
  cantidadP: {
    width: "23%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    backgroundColor:"#FF3366",
  },
  precioP: {
    width: "18%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    backgroundColor:"#FF3366",
  },
});

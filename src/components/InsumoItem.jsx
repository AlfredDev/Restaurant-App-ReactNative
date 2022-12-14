import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export const InsumoItem = ({ navigation, insu, id,nombre,cantidad}) => {
  const modificaInsumo = () => {
    navigation.navigate("ModificarInsumos", {
      insu: insu,
    });
  };

  return (
    <TouchableOpacity onPress={modificaInsumo}>
      <View style={styles.item}>
        <View style={cantidad <=3 ? styles.idP: styles.id}>
          <Text>{id}</Text>
        </View>
        <View style={cantidad <=3 ? styles.productoP: styles.producto}>
          <Text>{nombre}</Text>
        </View>
        <View style={cantidad <=3 ?styles.cantidadP: styles.cantidad}>
          <Text>{cantidad}</Text>
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
    width: "25%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    
  },
  producto: {
    width: "50%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
  cantidad: {
    width: "25%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    
  },
  idP: {
    width: "25%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#FF3366",
    
  },
  productoP: {
    width: "50%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    backgroundColor:"#FF3366",
  },
  cantidadP: {
    width: "25%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    backgroundColor:"#FF3366",
  },
  
});

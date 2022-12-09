import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export const PlatilloItem = ({ id,nombre,categoria }) => {
  

  return (
    <TouchableOpacity >
      <View style={styles.item}>
        <View style={styles.id}>
          <Text>{id}</Text>
        </View>
        <View style={styles.categoria}>
          <Text>{categoria}</Text>
        </View>
        <View style={styles.nombre}>
          <Text>{nombre}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "95%",
    height: 40,
    marginLeft: 10,
    marginTop: 2,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  id: {
    width: "20%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    
  },
  categoria: {
    width: "30%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
  nombre: {
    width: "50%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
});

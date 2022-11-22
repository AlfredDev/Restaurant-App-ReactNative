import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useForm } from "../hooks/useForm";

export const UserItem = ({ navigation, nombre, rol, usuario }) => {

    const {onInputChange,Nusuario,contraseña} = useForm({
      usuario:Nusuario,
      contraseña:contraseña
    })


  const modificaUsuario = () => {
    navigation.navigate("modificaUsuario", {
      usuario: usuario,
    });
  };

  return (
    <TouchableOpacity onPress={modificaUsuario}>
      <View style={styles.item}>
        <View style={styles.nombre}>
          <Text>{nombre}</Text>
        </View>
        <View style={styles.rol}>
          <Text>{rol}</Text>
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
  nombre: {
    width: "70%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  rol: {
    width: "30%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
});

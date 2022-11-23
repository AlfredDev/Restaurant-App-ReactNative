import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import { theme } from "../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";

export const SearchProduct = ({ products, setProductos, table }) => {
  const [text, setText] = useState(products);

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = table.filter((elemento) => {
      if (
        
        elemento.producto
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.id
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) 
       
      ) {
        return elemento;
      }
    });
    setProductos(resultadosBusqueda);
    setText(terminoBusqueda);
  };

  return (
    <View>
      <Stack spacing={2} style={{ margin: 16 }}>
        <TextInput
          color={theme.colors.primary}
          value={text}
          onChangeText={(text) => filtrar(text)}
          inputStyle={{
            letterSpacing: 1,
            marginLeft: 10,
            fontSize: 18,
            backgroundColor: "#EEEEEE",
          }}
          placeholder={"Buscar por id o nombre"}
          leading={(props) => (
            <View style={styles.icon}>
              <Ionicons
                name={"search"}
                size={25}
                color={theme.colors.primary}
              />
            </View>
          )}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#FFFFFF",
    height: 55,
    width: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
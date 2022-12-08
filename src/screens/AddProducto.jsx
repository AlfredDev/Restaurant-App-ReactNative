import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput, Stack } from "@react-native-material/core";
import { HeaderBlue } from "../components";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Button } from "@react-native-material/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../database/firebase";
import { async } from "@firebase/util";
import { addDocIf, addDocumento, generateUUID, uid,unicosId } from "../helpers/Backed";
import { useForm } from "../hooks/useForm";
import { validarContraseña, validarCorreo, validarNum, validarUsuario, validarNombre, validarCantidad, validarPrecio } from "../helpers/Validaciones";

export const AddProducto = ({ navigation, route }) => {

  const { onInputChange, Id,Producto,Cantidad,Precio} = useForm({
    Id: Id,
    Producto: Producto,
    Cantidad: Cantidad,
    Precio: Precio,
  });

  const agregarProducto = () => {
    const idp=  unicosId("P");
    const product = {
      Id: idp,
    Producto: Producto,
    Cantidad: + Cantidad,
    Precio:  +Precio,
    };
    const platillo = {
      categoria: "Bebidas",
      id: idp,
      nombre: Producto,
      tamaño: "orden",
      precio: {orden:  +Precio}
    };

    if (!Producto || !Cantidad || !Precio) {
      alert("Campos vacios");
    } else {
      if(
        validarCantidad(Cantidad)&&
        validarPrecio(Precio)
      ){
        //addDocumento("Platillos",platillo);
        //addDocIf("Productos","Producto","Pepsi");
        //addDocumento("Productos", product);
        alert("Producto añadido");
        navigation.navigate("Productos");
      }
      
    }
  };
 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled
    >
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
      />
      <HeaderBlue
        description={"Agregar"}
        subtitle={"Producto"}
        navigation={navigation}
        goHome={navigation.goBack}
      />

      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <Stack>
          <View style={{ paddingTop: 10, spacing: 20 }}>
            
            <View style={styles.pickerContainer}>
              <Text style={styles.text}>Nombre:</Text>
              <TextInput style={styles.inputs}
                variant="standard"
                color={theme.colors.primary}
                borderColor="black"
                value={Producto}
                onChangeText={(value) => onInputChange("Producto", value)}
              />
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.text}>Cantidad:</Text>
              <TextInput style={styles.inputs}
                variant="standard"
                color={theme.colors.primary}
                borderColor="black"
                value={Cantidad}
                onChangeText={(value) => onInputChange("Cantidad", value)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.text}>Precio:</Text>
              <TextInput style={styles.inputs}
                variant="standard"
                color={theme.colors.primary}
                borderColor="black"
                inputStyle={{ letterSpacing: 1 }}
                value={Precio}
                onChangeText={(value) => onInputChange("Precio", value)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </Stack>

        <Stack>
          <View style={styles.botnes}>
            <Button 
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 50 }}
              title="Agregar Producto"
              width={330}
              color={theme.colors.primary}
              uppercase={false}
              onPress={agregarProducto}

            />
          </View>
          <View style={styles.botnes}>
            <Button 
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 50 }}
              title="Cancelar"
              width={330}
              color={"#D8D2CB"}
              uppercase={false}
              onPress={() => navigation.navigate("Productos")}
            />
          </View>
        </Stack>
      </Animatable.View>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  botnes: {
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap",
    flexDirection: "column",
    margin: 5,
  },
  inputs: {
    width: "60%",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingTop: 10,
  },
  formContainer: {
    flex: 6,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
    alignItems: "center",
    paddingBottom: 3,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  pickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
    height: 56,

  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scroll: {
    padding: 10,
    justifyContent: "center",
  },
});

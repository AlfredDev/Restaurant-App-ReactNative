import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { HeaderBlue } from "../components";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-picker/picker";
import { PIckerCum } from "../components/PIckerCum";
import { Button } from "@react-native-material/core";
import { OrderLIst } from "../components/OrderLIst";
import { BtnIncrement } from "../components/BtnIncrement";
import { categorias } from "../helpers/Categorias";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../database/firebase";
import { async } from "@firebase/util";
import { ProductPicker } from "../components/ProductPicker";

export const AddOrden = ({ navigation, route }) => {
  const { mesa, cuenta } = route.params;
  const [categoria, setCategoria] = useState("Cocteles");
  const [plato, setPlato] = useState("");

  const [value, onChangeText] = useState("");
  const [count, setCount] = useState(1);
  const [platillo, setPlatillo] = useState([]);
  const [tamaño, setTamaño] = useState("chico");
  const tamaños = ["chico", "mediano", "grande", "orden"];

  const [objeto, setObjeto] = useState();
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getCategorias();
    // console.log(platillo);
    getProducto();
  }, [categoria]);

  useEffect(() => {
    const f = platillo.filter((p) => p.categoria === categoria);
    setFilter(f);
  }, [platillo]);

  const getProducto = async () => {
    const objRef = collection(db, "Platillos");
    const q = query(
      objRef,
      where("nombre", "==", plato),
      where("categoria", "==", categoria)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const { categoria, nombre, precio, tamaño } = doc.data();

      let plailloss = {
        categoria: categoria,
        nombre: nombre,
        precio: precio,
        tamaño: tamaño,
      };
      setObjeto(plailloss);
    });
  };
  const agregarOrdern = () => {
    const orden = {
      producto: plato,
      tamaño: tamaño,
      cantidad: count,
      descripcion: value,
      categoria: categoria,
    };
    console.log(orden);
  };

  const getPrecio = () => {
    const { chico, mediano, grande } = objeto.precio;

    if (tamaño === "chico") {
      return chico;
    }

    if (tamaño === "mediano") {
      return mediano;
    }

    if (tamaño === "grande") {
      return grande;
    }
    return 0;
  };

  async function getCategorias() {
    const q = collection(db, "Platillos");
    const querySnapshot = await getDocs(q);

    const platillos = [];
    // const producto = [];

    querySnapshot.forEach((doc) => {
      const { categoria, nombre, precio, tamaño } = doc.data();

      let plailloss = {
        categoria: categoria,
        nombre: nombre,
        precio: precio,
        tamaño: tamaño,
      };

      platillos.push(plailloss);
    });

    setPlatillo(platillos);
  }

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
        description={"Orden"}
        subtitle={"Agregar Producto"}
        navigation={navigation}
        goHome={navigation.goBack}
      />

      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 10 }}>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Categoria:</Text>
            <PIckerCum
              selected={categoria}
              setSelected={setCategoria}
              opciones={categorias}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Producto:</Text>
            <ProductPicker
              selected={plato}
              setSelected={setPlato}
              opciones={filter}
              categoria={categoria}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Tamaño:</Text>
            <PIckerCum
              opciones={tamaños}
              setSelected={setTamaño}
              selected={tamaño}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Cantidad:</Text>
            <BtnIncrement count={count} setCount={setCount} />
          </View>
          <Text style={styles.text}>Descripcion</Text>
          <View
            style={{
              borderColor: "#000000",
              height: 56,
              borderWidth: 2,
              marginTop: 5,
              borderRadius: 3,
              padding: 2,
            }}
          >
            <TextInput
              multiline
              onChangeText={(text) => onChangeText(text)}
              value={value}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 50 }}
              title="+  Agregar Orden"
              width={250}
              height={50}
              color={"#002B5B"}
              uppercase={false}
              onPress={agregarOrdern}
            />
          </View>
        </View>
        <OrderLIst />
        <Button
          titleStyle={{ fontSize: 17 }}
          contentContainerStyle={{ height: 50 }}
          title="Generar Orden"
          width={350}
          height={55}
          color={theme.colors.primary}
          uppercase={false}
        />
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: theme.colors.secondary,
    paddingTop: 10,
  },
  formContainer: {
    flex: 6,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    // paddingTop: 10,
    marginTop: 10,
    alignItems: "center",
    paddingBottom: 3,
  },
  pickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginRight: 40,
  },
});

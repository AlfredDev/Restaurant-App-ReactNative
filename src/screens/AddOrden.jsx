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
import { ProductPicker } from "../components/ProductPicker";
import { addDocumento, generateUUID, uid, changeCantidadBebidas } from "../helpers/Backed";
import { ListaOrdenes } from "../components/ListaOrdenes";



export const AddOrden = ({ navigation, route }) => {
  const { mesa, cuenta } = route.params;
  const [categoria, setCategoria] = useState("Cócteles");
  const [plato, setPlato] = useState("");

  const [value, onChangeText] = useState("");
  const [count, setCount] = useState(1);
  const [platillo, setPlatillo] = useState([]);
  const [tamaño, setTamaño] = useState("Chico");
  const tamaños = ["Chico", "Mediano", "Grande", "Orden"];
  const size = ["Orden"];

  const [objeto, setObjeto] = useState();
  const [filter, setFilter] = useState([]);

  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    getCategorias();
    // console.log(platillo);
  }, [categoria]);

  useEffect(() => {
    const f = platillo.filter((p) => p.categoria === categoria);
    setFilter(f);
  }, [platillo]);

  const agregarOrdern = () => {
    const precio = platillo.filter((p) => p.nombre === plato);
    // console.log(precio[0]);
    const orden = {
      producto: plato,
      tamaño: tamaño,
      cantidad: count,
      descripcion: value,
      categoria: categoria,
      precio: 0,
    };
    console.log(orden.categoria);
    console.log(orden.producto);
    console.log(count);

    if (!orden.producto) {
      alert("Ingrese una producto");
      return;
    }

    orden.precio = getPrecio(precio[0]) * count;
    console.log(orden);

    setOrdenes([orden, ...ordenes]); //Ingresando la orden que quiera

    if (orden.categoria == "Bebidas") {
      changeCantidadBebidas("Productos", "Producto", orden.producto, count);
      console.log("es bebida");
    }

  };

  const getPrecio = (precios) => {
    const { precio } = precios;
    // console.log(precio);
    console.log(tamaño);


    if (tamaño === "Chico") {
      return precio.chico;
    }

    if (tamaño === "Mediano") {
      return precio.mediano;
    }

    if (tamaño === "Grande") {
      return precio.grande;
    } ////////tsssssssss
    if (tamaño === "Orden") {
      return precio.orden;
    }

    if (tamaño === "orden") {
      return precio.orden;
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

  const GeneraOrden = () => {
    if (ordenes.length) {
      const pedido = {
        fk_cuenta_id: cuenta.id,
        fk_mesa_id: mesa.id,
        pedidos: ordenes,
        folio: generateUUID(),
        estatus: false,
      };

      addDocumento("Orden", pedido);
      navigation.navigate("Orden", {
        mesa: mesa,
        cuenta: cuenta,
      });
    } else {
      alert("Agrege una orden primero");
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
              //opciones={categoria === "Cócteles" || categoria === "Cocteles" ? tamaños : size}
              opciones={tamaños}
              selected={tamaño}
              setSelected={setTamaño}

            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Cantidad:</Text>
            <BtnIncrement count={count} setCount={setCount} />
          </View>
          <Text style={styles.text}>Descripción:</Text>
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
        <ListaOrdenes ordenes={ordenes} />
        <Button
          titleStyle={{ fontSize: 17 }}
          contentContainerStyle={{ height: 50 }}
          title="Generar Orden"
          width={350}
          height={55}
          color={theme.colors.primary}
          uppercase={false}
          onPress={GeneraOrden}
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
    //flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    marginLeft: 10,
  },

  text: {
    fontSize: 16,
    marginRight: 40,
  },
});

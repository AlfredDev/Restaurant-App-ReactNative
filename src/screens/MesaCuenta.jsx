import {
  BackHandler,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Button } from "@react-native-material/core";
import { CuentaRepre } from "../components/CuentaRepre";
import { HeaderBlue } from "../components/HeaderBlue";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../database/firebase";
import { deleteDocWhere, actualizarCampo, exist } from "../helpers/Backed";
export const MesaCuenta = ({ route, navigation }) => {
  const { mesa } = route.params;
  //var bandera ="";
  const [cuenta, setCuenta] = useState([]);
  const [loading, setLoading] = useState(false);

  const exist = async (tabla, argumento1, argumento2) => {
    const userRef = collection(db, tabla);
    const q = query(
      userRef,
      where(argumento1, "==", argumento2)

    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        //   return bandera = "true";
        alert("Liquidar cuenta");
      });
    } else {
      actualizarCampo(table, "Mesa", mesa.idDoc);
      deleteDocWhere("Cliente", "mesa_id", mesa.id);
      deleteDocWhere("Cuenta_cliente", "fk_mesa_id", mesa.id);

      navigation.reset({
        index: 0,
        routes: [{ name: "MainContainer" }],
      });
      //return bandera = "false";
      //addDoc(userRef, objeto)
      //alert(cat + " añadido.");
    }
  };



  const table = {
    Description: mesa.Description,
    Libre: mesa.Libre,
    Estatus: mesa.Estatus,
    id: mesa.id,
    reservada: mesa.reservada,
  };


  const cancelar = () => {
    table.reservada = false;
    table.Estatus = "Libre";
    table.Libre = true;
    exist("Orden", "fk_mesa_id", mesa.id);
  };


  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainContainer" }],
    });
  };
  function handleBackButtonClick() {
    goHome();
    return true;
  }

  async function getCuentas() {
    const objRef = collection(db, "Cuenta_cliente");
    const q = query(objRef, where("fk_mesa_id", "==", mesa.id));
    const querySnapshot = await getDocs(q);

    const cuentas = [];

    querySnapshot.forEach((doc) => {
      const { fk_mesa_id, id, nombre } = doc.data();

      let cuenta = {
        id: id,
        fk_mesa_id: fk_mesa_id,
        nombre: nombre,
      };

      cuentas.push(cuenta);
    });

    setLoading(true);
    setCuenta(cuentas);
  }

  useEffect(() => {
    getCuentas();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

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
        description={mesa.Description}
        subtitle={"Cuentas"}
        navigation={navigation}
        goHome={goHome}
      />

      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.ordenes}>
          <ScrollView stickyHeaderIndices={[1]}>
            {cuenta.map((cuenta) => (
              <View style={styles.scroll} key={cuenta.id}>
                <CuentaRepre
                  id={cuenta.id}
                  description={mesa.Description}
                  nombre={cuenta.nombre}
                  fk_mesa_id={cuenta.fk_mesa_id}
                  navigation={navigation}
                  mesa={mesa}
                  cuenta={cuenta}
                />
              </View>
            ))}
            <View style={styles.scroll}>
              <Button
                titleStyle={{ fontSize: 17 }}
                contentContainerStyle={{ height: 50 }}
                title="Agregar Cuenta"
                width={250}
                color={theme.colors.primary}
                uppercase={false}
                onPress={() =>
                  navigation.navigate("AddCuenta", {
                    mesa: mesa,
                  })
                }
              />

            </View>
            <View style={styles.scroll}>
              <Button
                titleStyle={{ fontSize: 17 }}
                contentContainerStyle={{ height: 50 }}
                title="Despedir Mesa"
                width={250}
                color={"#D8D2CB"}
                uppercase={false}
                onPress={() => cancelar()}
              />

            </View>
          </ScrollView>
        </View>



        <View style={styles.button_section}>
          <Text style={styles.text}>Consumo Minimo: $650.00</Text>
          <Text style={styles.text}>Total:</Text>
          <Text style={styles.text}>Diferencia:</Text>
        </View>

      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    margin: 4,
  },
  scroll: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",

  },
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: theme.colors.secondary,
    paddingTop: 10,
  },

  formContainer: {
    flex: 4.5,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    // paddingTop: 5,
  },
  ordenes: {
    flex: 4,
  },
  button_section: {
    flex: 1,
    // backgroundColor: theme.colors.secondary,
    alignItems: "flex-end",
    marginRight: 20,
  },
});

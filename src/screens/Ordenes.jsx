import {
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderBlue } from "../components/HeaderBlue";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Button, Stack } from "@react-native-material/core";
import { CuentaRepre } from "../components/CuentaRepre";
import { OrdenItem } from "../components/OrdenItem";
import { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, query, where, doc } from "firebase/firestore";
import { db } from "../../database/firebase";
//import {cancelar} from "../screens/MesasConfig"
import { Checkbox } from "react-native-paper";

import { actualizarCampo, addDocumento, uid } from "../helpers/Backed";
import { async } from "@firebase/util";


export const Ordenes = ({ navigation, route }) => {
  const { ItemId, mesa, cuenta } = route.params;
  const [ordenes, setOrdenes] = useState([]);
  const [total, setTotal] = useState(0);
  const [lista, setLista] = useState([])
  //const { mesa } = route.params;
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  // const [checked, setChecked] = React.useState(true);
  
 
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
     actualizarCampo(table, "Mesa", mesa.idDoc);
     
     navigation.reset({
       index: 0,
       routes: [{ name: "MainContainer" }],
     });
   };

  useEffect(() => {
    fecthOrdenes();
    // console.log(ordenes);
    // console.log(total);
  }, [ordenes]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const fecthOrdenes = async () => {
    const objRef = collection(db, "Orden");
    const q = query(
      objRef,
      where("fk_mesa_id", "==", mesa.id),
      where("fk_cuenta_id", "==", cuenta.id)
    );
    const querySnapshot = await getDocs(q);

    const cuentas = [];

    querySnapshot.forEach((doc) => {
      const { fk_mesa_id, fk_cuenta_id, folio, pedidos } = doc.data();

      let cuenta = {
        fk_cuenta_id: fk_cuenta_id,
        fk_mesa_id: fk_mesa_id,
        folio: folio,
        pedidos: pedidos,
      };

      cuentas.push(cuenta);
    });
    setOrdenes(cuentas);

    let total = 0;
    ordenes.forEach((o) => {
      o.pedidos.forEach((to) => {
        total += to.precio;
      });
    });
    setTotal(total);
  };

  // useEffect(() => {
  //   getTotal();
  //   console.log(total);
  // }, []);

  // const getTotal = () => {
  //   let total = 0;
  //   ordenes.forEach((o) => {
  //     o.pedidos.forEach((to) => {
  //       total += to.precio;
  //     });
  //   });
  //   setTotal(total);
  // };

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
        subtitle={cuenta.nombre}
        navigation={navigation}
        goHome={navigation.goBack}
      />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.opciones}>
          <Text
            style={{
              textAlign: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            Órdenes
          </Text>
          <ScrollView stickyHeaderIndices={[1]}>
            <View style={styles.orderContainer}>
              <Stack spacing={10} style={[{ margin: 16 }, { marginTop: 10 }]}>
                {ordenes.map((op) => (
                  <OrdenItem
                    folio={op.folio}
                    id={op.fk_mesa_id}
                    key={op.folio}
                  />
                ))}
              </Stack>
            </View>
            <View style={styles.botones}>
              <Stack spacing={10} style={[{ margin: 16 }, { marginTop: 10 }]}>
                <Button
                  titleStyle={{ fontSize: 17 }}
                  contentContainerStyle={{ height: 50 }}
                  title="Renta"
                  width={253}
                  height={60}
                  color={theme.colors.secondary}
                  uppercase={false}
                  disabled
                />
                <Button
                  titleStyle={{ fontSize: 17 }}
                  contentContainerStyle={{ height: 50 }}
                  title="+  Agregar Orden"
                  width={253}
                  height={60}
                  color={theme.colors.primary}
                  uppercase={false}
                  onPress={() =>
                    navigation.navigate("AddOrden", {
                      mesa: mesa,
                      cuenta: cuenta,
                    })
                  }
                />
              </Stack>
            </View>
          </ScrollView>
        </View>
        <View style={styles.butom}>
          <Text
            style={{
              textAlign: "right",
              marginRight: 30,
              marginBottom: 4,
              fontSize: 16,
            }}
          >
            Total: $ {total}
          </Text>
          <Stack
            spacing={10}
            style={[
              { margin: 16 },
              { marginTop: 0 },
              { justifyContent: "center" },
              { alignItems: "center" },
            ]}
          >
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 50 }}
              title="Imprimir Cuenta"
              width={347}
              height={60}
              color={theme.colors.primary}
              uppercase={false}
              borderRadius={10}
            />
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 50 }}
              title="Despedir Mesa"
              width={347}
              height={60}
              color={"#D8D2CB"}
              uppercase={false}
              onPress={() => cancelar() }
              
            />
          </Stack>
        </View>
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
    flex: 5,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 10,
  },
  opciones: {
    // backgroundColor: theme.colors.secondary,
    flex: 3,
  },
  botones: {
    backgroundColor: theme.colors.secondary,
  },
  botones: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.colors.secondary,
  },
  butom: {
    flex: 1.3,

    // backgroundColor: theme.colors.secondary,
  },
});

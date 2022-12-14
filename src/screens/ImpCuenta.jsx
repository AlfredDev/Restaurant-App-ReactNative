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
import { OrderLIst } from "../components/OrderLIst";
import { useEffect, useState, } from "react";
import { collection, getDocs, query, where, doc, orderBy } from "firebase/firestore";
import { db } from "../../database/firebase";
import { currencyFormat } from "../helpers/Backed";


export const ImpCuenta = ({ navigation, route }) => {
  const { ItemId, mesa, cuenta, orden } = route.params;
  const [ordenes, setOrdenes] = useState([]);
  const [total, setTotal] = useState(0);
  const [pedid, setPedi] = useState([]);

  //const { mesa } = route.params;
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    fecthOrdenes();

    //onsole.log(total);
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

  // const [pedidos, setPedidos] = useState();

  const getIva = () => {
    return (total * 10) / 100;

  }


  const fecthOrdenes = async () => {
    const objRef = collection(db, "Orden");
    const q = query(
      objRef,
      where("fk_mesa_id", "==", mesa.id),
      where("fk_cuenta_id", "==", cuenta.id)
    );
    const querySnapshot = await getDocs(q);

    const cuentas = [];
    const totales = [];

    querySnapshot.forEach((doc) => {
      const { estatus, fk_mesa_id, fk_cuenta_id, folio, pedidos } = doc.data();
      const pedi = {
        pedidos: pedidos,
      };
      let cuenta = {
        fk_cuenta_id: fk_cuenta_id,
        fk_mesa_id: fk_mesa_id,
        folio: folio,
        pedidos: pedidos,
        // estatus:estatus,
      };
      // pedido.push(pedidos);
      cuentas.push(cuenta);
      //console.log(cuenta);
      //console.log(pedi);
      totales.push(pedidos);
    });

    setPedi(totales);
    setOrdenes(cuentas);
    let total = 0;
    ordenes.forEach((o) => {
      o.pedidos.forEach((to) => {

        total += to.precio;

      });
    });
    setTotal(total);
    // console.log(pedid);
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
        Texto={"Cuenta "}
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
            Alimentos y bebidas
          </Text>
          <ScrollView stickyHeaderIndices={[1]}>
            <OrderLIst ordenes={pedid} />

          </ScrollView>
        </View>
        <View style={styles.butom}>
          <Text
            style={{
              textAlign: "center",
              marginRight: 30,
              marginBottom: 4,
              fontSize: 25,
              fontWeight: "bold",
              opacity: 0.7,

            }}
          >
            SubTotal: {currencyFormat(total)}
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginRight: 30,
              marginBottom: 4,
              fontSize: 25,
              fontWeight: "bold",
              opacity: 0.7,

            }}
          >
            IVA(10%): {currencyFormat(getIva())}
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginRight: 30,
              marginBottom: 4,
              fontSize: 25,
              fontWeight: "bold",
              opacity: 0.7,

            }}
          >
            Total: {currencyFormat(total + getIva())}
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
              onPress={() =>
                navigation.navigate("ImpCuenta", {
                  mesa: mesa,
                  cuenta: cuenta,
                })
              }
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
    width: '100%'
  },
  formContainer: {
    flex: 5,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: '100%'

  },
  opciones: {
    // backgroundColor: theme.colors.secondary,
    flex: 3,
    width: '90%'

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

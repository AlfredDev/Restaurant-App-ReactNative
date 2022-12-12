import {
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { HeaderBlue } from "../components/HeaderBlue";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Button, Stack } from "@react-native-material/core";
import { OrdenItem } from "../components/OrdenItem";
import { useEffect, useState, useContext, useCallback } from "react";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../database/firebase";
import { UserContext } from "../hooks/UserContext";
import {
  deleteDocument,
  deleteDocWhere,
  generateUUID,
} from "../helpers/Backed";
import { actualizarCampo, addDocumento, uid } from "../helpers/Backed";
import { async } from "@firebase/util";
import moment from "moment/moment";

export const Ordenes = ({ navigation, route }) => {
  const { ItemId, mesa, cuenta, orden } = route.params;
  const [ordenes, setOrdenes] = useState([]);
  const [total, setTotal] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  });

  const { usuario } = useContext(UserContext);

  const [lista, setLista] = useState([]);
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

  // const [pedidos, setPedidos] = useState();

  const fecthOrdenes = async () => {
    const objRef = collection(db, "Orden");
    const q = query(
      objRef,
      where("fk_mesa_id", "==", mesa.id),
      where("fk_cuenta_id", "==", cuenta.id)
    );
    const querySnapshot = await getDocs(q);

    const cuentas = [];
    // const pedido = [];

    querySnapshot.forEach((doc) => {
      const { estatus, fk_mesa_id, fk_cuenta_id, folio, pedidos } = doc.data();

      let cuenta = {
        fk_cuenta_id: fk_cuenta_id,
        fk_mesa_id: fk_mesa_id,
        folio: folio,
        pedidos: pedidos,
        // estatus:estatus,
      };

      // pedido.push(pedidos);
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

  const getFecha = () => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return year + "/" + month + "/" + day;

    // return new Date(fecha);
  };

  const momentDate = () => {
    var date = moment();

    var currentDate = date.format('D/MM/YYYY');
    return currentDate;
  }


  const despideMesa = () => {
    const tiket = {
      fecha: getFecha(),
      mesa: mesa.Description,
      total: total,
      cliente: cuenta.nombre,
      mesero: usuario.nombre,
      id: generateUUID(),
    };
    console.log(tiket);
    addDocumento("Venta", tiket);
    //console.log(cuenta.id);
    //console.log(ordenes.estatus)
    deleteDocWhere("Orden", "fk_cuenta_id", cuenta.id);
    
    navigation.navigate("MesaCuenta", {
      mesa: table,
    });
    // alert(momentDate());
    // console.log(momentDate ());
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

          <ScrollView stickyHeaderIndices={[1]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
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
              onPress={() =>
                navigation.navigate("ImpCuenta", {
                  mesa: mesa,
                  cuenta: cuenta,
                })
              }
            />
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 50 }}
              title="Pagar cuenta"
              width={347}
              height={60}
              color={"#D8D2CB"}
              uppercase={false}
              onPress={() => despideMesa()}
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

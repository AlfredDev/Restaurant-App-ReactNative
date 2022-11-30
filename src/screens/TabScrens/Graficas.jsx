import { Button, Stack } from "@react-native-material/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../../database/firebase";
import { HeaderOnly } from "../../components/HeaderOnly";
import { theme } from "../../core/theme";
import { getFecha } from "../../helpers/Backed";

export const Graficas = () => {
  const [venta, setVenta] = useState([]);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  });

  const fecthOrdenes = async () => {
    const objRef = collection(db, "Venta");
    const q = query(objRef, where("fecha", "==", getFecha()));
    const querySnapshot = await getDocs(q);

    const cuentas = [];
    // const pedido = [];

    querySnapshot.forEach((doc) => {
      const { cliente, fecha, id, mesa, total } = doc.data();

      let cuenta = {
        cliente: cliente,
        fecha: fecha,
        id: id,
        mesa: mesa,
        total: total,
      };

      // pedido.push(pedidos);
      cuentas.push(cuenta);
    });
    setVenta(cuentas);

    let t = 0;

    venta.forEach((obj) => {
      t += obj.total;
    });

    setTotal(t);
  };

  useEffect(() => {
    fecthOrdenes();
    console.log(venta);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderOnly descripcion={"Reporte ventas"} />
      <View style={styles.child}>
        <View style={styles.venta}>
          <Text style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}>
            Venta de hoy:{" "}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "450" }}>{getFecha()}</Text>
        </View>
        <View style={styles.total}>
          <Text>$ {total}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.link}>Ver detalles</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.botones}>
        <Stack spacing={2} style={{ margin: 16 }}>
          <Button
            titleStyle={{ fontSize: 17, textAlign: "center" }}
            contentContainerStyle={{
              height: 55,
              width: 340,
              textAlign: "center",
            }}
            title="Semanal"
            color={theme.colors.primary}
            uppercase={false}
          />
          <Button
            titleStyle={{ fontSize: 17, textAlign: "center" }}
            contentContainerStyle={{
              height: 55,
              width: 340,
              textAlign: "center",
            }}
            title="Mensual"
            color={theme.colors.primary}
            uppercase={false}
          />
          <Button
            titleStyle={{ fontSize: 17, textAlign: "center" }}
            contentContainerStyle={{
              height: 55,
              width: 340,
              textAlign: "center",
            }}
            title="Anual"
            color={theme.colors.primary}
            uppercase={false}
          />
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: theme.colors.secondary,
    // paddingTop: 10,
  },
  child: {
    flex: 3,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    marginTop: -20,
    // justifyContent: "center",
  },
  botones: {
    flex: 2,
    backgroundColor: theme.colors.text,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.colors.secondary,
  },
  venta: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  total: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#D8D2CB",
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  link: {
    textAlign: "right",
    marginRight: 20,
    color: theme.colors.primary,
  },
});

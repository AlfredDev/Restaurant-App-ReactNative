import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button, Stack } from "@react-native-material/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  DatePickerIOSBase,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../../database/firebase";
import { HeaderOnly } from "../../components/HeaderOnly";
import { theme } from "../../core/theme";
import { currencyFormat, getDate, getFecha } from "../../helpers/Backed";

export const Graficas = ({ navigation }) => {
  const [venta, setVenta] = useState([]);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(getDate());

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fecthOrdenes();
    setRefreshing(false);
  });

  const fecthOrdenes = async () => {
    const objRef = collection(db, "Venta");
    const q = query(objRef, where("fecha", "==", FechaBien(date)));
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

    setTotal(currencyFormat(t));
  };

  useEffect(() => {
    fecthOrdenes();
    // console.log(venta);
  }, []);

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
    fecthOrdenes();
  }

  const FechaBien = (date) => {
    var dateObj = date;
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return year + "/" + month + "/" + day;
  };

  const forceRemount = () => {
    fecthOrdenes();
  };

  return (
    <View style={styles.container}>
      <HeaderOnly descripcion={"Reporte ventas"} />
      <View
        style={styles.child}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.venta}>
          <Text style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}>
            Venta de hoy:
          </Text>

          <TouchableOpacity
            style={styles.fecha}
            onPress={() => setDatePicker(true)}
          >
            <Text>{FechaBien(date)}</Text>
          </TouchableOpacity>

          {datePicker && (
            <RNDateTimePicker
              value={date}
              mode="date"
              maximumDate={getDate()}
              positiveButton={{ label: "OK", textColor: "green" }}
              onChange={onDateSelected}
            />
          )}
        </View>
        <TouchableOpacity onPress={forceRemount}>
          <View style={styles.total}>
            <Text>{total}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate("VentaDiaria", {
            venta: venta,
          });
        }}>
          <Text style={styles.link}>Ver detalles</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.botones}>
        <Stack spacing={4} style={{ margin: 16 }}>
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
            onPress={() => navigation.navigate("VentaSemanal")}
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
            onPress={() => navigation.navigate("VentaAnual")}
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
    marginTop: -50,
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
  fecha: {
    marginLeft: 5,
    color: theme.colors.primary,
    backgroundColor: '#EEEDDE',
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    borderRadius: 5,
    borderWidth: 2
  },
});

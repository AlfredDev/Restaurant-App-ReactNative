import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { Button } from "@react-native-material/core";
import { theme } from "../../core/theme";
import * as Animatable from "react-native-animatable";
import { HeaderOnly } from "../../components/HeaderOnly";
import React, { useEffect, useState } from "react";
import { InsumoItem } from "../../components/InsumoItem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../database/firebase";
import { SearchInsumos } from "../../components/SearchInsumos";

export const Insumos = ({ navigation }) => {
  const [insums, setInsumos] = useState([]);
  const [table, setTableIns] = useState([]);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  });

  async function fetchData() {
    const q = query(collection(db, "Insumos"), orderBy("Nombre"));
    const querySnapshot = await getDocs(q);
    const Insumos = [];
    querySnapshot.forEach((doc) => {
      const {
        Id,
        Nombre,
        Cantidad,
        idDoc,
      } = doc.data();
      Insumos.push({
        id: Id,
        nombre: Nombre,
        cantidad: Cantidad,
        idDoc: doc.id,
      });
    });
    setInsumos(Insumos);
    setTableIns(Insumos);
    console.log(Insumos);
   
  }

  

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HeaderOnly descripcion={"Inventario"} subtitle={"Insumos"} />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.search}>
          <SearchInsumos
           insums={insums}
           setInsumos={setInsumos}
           table={table}
           navigation={navigation}
          />
        </View>
        <View style={styles.list}>
          <View style={styles.header}>
            <View
              style={{
                width: "25%",
                height: 29,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  padding: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Id
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                borderLeftWidth: 1,
                height: 29,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ padding: 4, fontWeight: "bold", letterSpacing: 1 }}
              >
                Producto
              </Text>
            </View>
            <View
              style={{
                width: "25%",
                borderLeftWidth: 1,
                height: 29,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ padding: 4, fontWeight: "bold", letterSpacing: 1 }}
              >
                Cantidad
              </Text>
            </View>
            
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {insums.map((pro) => (
              <InsumoItem
                id={pro.id}
                nombre={pro.nombre}
                cantidad={pro.cantidad}
                key={pro.idDoc}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.botones}>
          <Button
             titleStyle={{ fontSize: 17 }}
             contentContainerStyle={{ height: 50 }}
             title="Agregar"
             width="40%"
             height={50}
             color={theme.colors.primary}
             uppercase={false}
          />
          <Button
             titleStyle={{ fontSize: 17 }}
             contentContainerStyle={{ height: 50 }}
             title="Ingresar"
             width="40%"
             height={50}
             color={theme.colors.primary}
             uppercase={false}
          />
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
    padding: 10,
    justifyContent: "center",
  },
  search: {
    flex: 1,
  },
  list: {
    flex: 4,
  },
  botones: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header: {
    backgroundColor: "#D8D2CB",
    width: "95%",
    height: 30,
    marginLeft: 10,
    marginTop: 15,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

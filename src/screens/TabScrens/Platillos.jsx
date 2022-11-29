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
import { PlatilloItem } from "../../components/PlatilloItem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../database/firebase";
import { SearchProduct } from "../../components/SearchProduct";

export const Platillos = ({ navigation }) => {
  const [plats, setPlatillos] = useState([]);
  const [table, setTable] = useState([]);
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
    const q = query(collection(db, "Platillos"), orderBy("nombre"));
    const querySnapshot = await getDocs(q);
    const platillos = [];
    querySnapshot.forEach((doc) => {
      const {
        id,
        nombre,
        precio,
        //categoria,
        //tamaño,
        idDoc,
      } = doc.data();
      platillos.push({
        id: id,
        nombre: nombre,
        precio: precio,
        //categoria: categoria,
        //tamaño: tamaño,
        idDoc: doc.id,
      });
    });
    setPlatillos(platillos);
    setTable(platillos);
    console.log(platillos);
   
  }

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HeaderOnly descripcion={"Platillos"} />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.search}>
          


        </View>
        <View style={styles.list}>
          <View style={styles.header}>
            <View
              style={{
                width: "12%",
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
                width: "35%",
                borderLeftWidth: 1,
                height: 29,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ padding: 4, fontWeight: "bold", letterSpacing: 1 }}
              >
                Nombre
              </Text>
            </View>
            <View
              style={{
                width: "23%",
                borderLeftWidth: 1,
                height: 29,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ padding: 4, fontWeight: "bold", letterSpacing: 1 }}
              >
                precio
              </Text>
            </View>
            
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {plats.map((pro) => (
              <PlatilloItem
                id={pro.id}
                nombre={pro.nombre}
                precio={pro.precio}
                key={pro.idDoc}
                
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.botones}>
          <Button
             titleStyle={{ fontSize: 17 }}
             contentContainerStyle={{ height: 50 }}
             title="Agregar Platillo"
             width="90%"
             height={50}
             color={theme.colors.primary}
             uppercase={false}
             onPress={() => navigation.navigate("AddProducto")}

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

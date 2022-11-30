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
import { ProductItem } from "../../components/ProductItem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../database/firebase";
import { SearchProduct } from "../../components/SearchProduct";

export const Productos = ({ navigation }) => {
  const [products, setProductos] = useState([]);
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
    const q = query(collection(db, "Productos"), orderBy("Producto"));
    const querySnapshot = await getDocs(q);
    const productos = [];
    querySnapshot.forEach((doc) => {
      const {
        Id,
        Producto,
        Precio,
        Cantidad,
        idDoc,
      } = doc.data();
      productos.push({
        id: Id,
        producto: Producto,
        precio: Precio,
        cantidad: Cantidad,
        idDoc: doc.id,
      });
    });
    setProductos(productos);
    setTable(productos);
    console.log(productos);
   
  }

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HeaderOnly descripcion={"Inventario"} subtitle={"Productos"} />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.search}>
          <SearchProduct
           products={products}
           setProductos={setProductos}
           table={table}
           navigation={navigation}
          />
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
                Producto
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
                Cantidad
              </Text>
            </View>
            <View
              style={{
                width: "18%",
                borderLeftWidth: 1,
                height: 29,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ padding: 4, fontWeight: "bold", letterSpacing: 1 }}
              >
                Precio
              </Text>
            </View>
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {products.map((pro) => (
              <ProductItem
                id={pro.id}
                producto={pro.producto}
                cantidad={pro.cantidad}
                precio={pro.precio}
                key={pro.idDoc}
                product={pro}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.botones}>
          <Button
             titleStyle={{ fontSize: 17 }}
             contentContainerStyle={{ height: 50 }}
             title="Agregar Producto"
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

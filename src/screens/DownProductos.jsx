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
  import { theme } from "../core/theme";
  import * as Animatable from "react-native-animatable";
  import { HeaderOnly } from "../components/HeaderOnly";
  import React, { useEffect, useState } from "react";
  import { ProductItem } from "../components/ProductItem";
  import { collection, getDocs, orderBy, query,where } from "firebase/firestore";
  import { db } from "../../database/firebase";
  import { SearchProduct } from "../components/SearchProduct";
  import { InsumoItem } from "../components/InsumoItem";
  
  export const DownProductos = ({ navigation }) => {
    const [products, setProductos] = useState([]);
    const [table, setTable] = useState([]);
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
  
    useEffect(() => {
      pocos();
    }, []);
  
    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      pocos();
      setRefreshing(false);
    });
  
    async function pocos() {
        const docRef = query(
          collection(db, "Productos"),
          where("Cantidad", '<=',3)
        );
        const querySnapshot = await getDocs(docRef);
        const productos = [];
        if (!querySnapshot.empty) {
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
          } else {
            
            alert("Productos suficientes.");
          }
        
        setProductos(productos);
      };
  
    return (
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <HeaderOnly descripcion={"Comprar"} subtitle={"Productos"} />
        <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
          
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
              {products.map((pro) => (
                // pro.precio.forEach() mandar como arreglo 
                <InsumoItem
                  id={pro.id}
                  nombre={pro.producto}
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
               title="Finalizar Visualización"
               width="90%"
               height={50}
               color={theme.colors.primary}
               uppercase={false}
               onPress={() => navigation.navigate("Productos")}
  
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
  
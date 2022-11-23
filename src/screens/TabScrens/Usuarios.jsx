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
import { HeaderBlue } from "../../components/HeaderBlue";
import { theme } from "../../core/theme";
import * as Animatable from "react-native-animatable";
import { HeaderOnly } from "../../components/HeaderOnly";
import { Search } from "../../components/Search";
import React, { useEffect, useState } from "react";
import { UserItem } from "../../components/UserItem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../database/firebase";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "@react-native-material/core";

export const Usuarios = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [tabla, setTabla] = useState([]);
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
    const q = query(collection(db, "Trabajadores"), orderBy("idEmpleado"));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      const {
        idEmpleado,
        contraseña,
        correo,
        nombre,
        numCelular,
        rol,
        usuario,
        idDoc,
      } = doc.data();
      users.push({
        id: idEmpleado,
        contraseña: contraseña,
        correo: correo,
        nombre: nombre,
        numCelular: numCelular,
        rol: rol,
        usuario: usuario,
        idDoc: doc.id,
      });
    });
    setUsuarios(users);
    setTabla(users);
    // console.log(usuarios);
  }

  const cerrarSesion = () => {
    Alert.alert(
      "Cerrar Sesión",
      "Estas seguro de cerrar Sesion ?",
      [
        { text: "No", onPress: () => console.log("ok") },
        {
          text: "Si",
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            }),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HeaderOnly descripcion={"Usuarios"} subtitle={"Administra usuarios"} />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.search}>
          <Search
            users={usuarios}
            setUsuarios={setUsuarios}
            tabla={tabla}
            navigation={navigation}
          />
        </View>
        <View style={styles.list}>
          <View style={styles.header}>
            <View
              style={{
                width: "70%",
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
                Nombre
              </Text>
            </View>
            <View
              style={{
                width: "30%",

                borderLeftWidth: 1,
                height: 29,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ padding: 4, fontWeight: "bold", letterSpacing: 1 }}
              >
                Rol
              </Text>
            </View>
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {usuarios.map((user) => (
              <UserItem
                nombre={user.nombre}
                rol={user.rol}
                key={user.idDoc}
                usuario={user}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.botones}>
          <IconButton
            contentContainerStyle={{ backgroundColor: "red" }}
            style={{ width: 55, height: 55 }}
            icon={(props) => (
              <Icon name="exit-to-app" {...props} color={"white"} />
            )}
            onPress={cerrarSesion}
          />
          <IconButton
            contentContainerStyle={{ backgroundColor: theme.colors.primary }}
            style={{ width: 55, height: 55 }}
            icon={(props) => <Icon name="plus" {...props} color={"white"} />}
            onPress = {() => navigation.navigate('AgregarUsuario')}
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

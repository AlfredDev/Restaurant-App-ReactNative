import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { HeaderBlue } from "../../components/HeaderBlue";
import { theme } from "../../core/theme";
import * as Animatable from "react-native-animatable";
import { HeaderOnly } from "../../components/HeaderOnly";
import { Search } from "../../components/Search";
import { useEffect, useState } from "react";
import { UserItem } from "../../components/UserItem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../database/firebase";

export const Usuarios = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [tabla, setTabla] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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
      } = doc.data();
      users.push({
        id: idEmpleado,
        contraseña: contraseña,
        correo: correo,
        nombre: nombre,
        numCelular: numCelular,
        rol: rol,
        usuario: usuario,
      });
    });
    setUsuarios(users);
    setTabla(users);
    // console.log(usuarios);
  }

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HeaderOnly descripcion={"Usuarios"} subtitle={"Administra usuarios"} />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.search}>
          <Search users={usuarios} setUsuarios={setUsuarios} tabla={tabla} />
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

          <ScrollView>
            {usuarios.map((user) => (
              <UserItem nombre={user.nombre} rol={user.rol} key={user.id} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.botones}></View>
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
    backgroundColor: theme.colors.primary,
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

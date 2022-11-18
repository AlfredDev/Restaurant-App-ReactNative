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

export const Usuarios = ({ navigation }) => {
  const [search, setSearch] = useState("");

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HeaderOnly descripcion={"Usuarios"} subtitle={"Administra usuarios"} />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.search}>
          <Search />
        </View>
        <View style={styles.list}>
          <View style={styles.header}>
            <View>
              <Text style={{ padding: 4 }}>Nombre</Text>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                height: 29,
              }}
            >
              <Text style={{ padding: 4 }}> Rol</Text>
            </View>
          </View>

          <ScrollView></ScrollView>
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
    marginTop: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

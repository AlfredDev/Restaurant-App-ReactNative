import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../components/Header";
import { theme } from "../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { Stack, TextInput, Button } from "@react-native-material/core";
import { Checkbox } from "react-native-paper";
import { db } from "../../database/firebase";
import { doc, setDoc } from "firebase/firestore";
// import Ionicons from "react-native-vector-icons/Ionicons";

export const MesasConfig = ({ route, navigation }) => {
  const { mesa } = route.params;
  const [checked, setChecked] = React.useState(true);

  const config = () => {
    const docRef = doc(db, "Mesa", mesa.idDoc);
    mesa.Libre = false;
    mesa.Estatus = "Ocupada";
    setDoc(docRef, mesa)
      .then((docRef) => {
        console.log("Entire Document has been updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
      />

      <View style={styles.header2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.back}>
            <Ionicons name={"chevron-back"} size={40} />
          </View>
        </TouchableOpacity>

        <Header titulo={mesa.Description} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: theme.colors.text,
            // marginTop: 10,
            marginBottom: 10,
          }}
        >
          Disponible
        </Text>
      </View>

      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <Stack spacing={30} style={[{ margin: 16 }, { marginTop: 25 }]}>
          <TextInput
            variant="standard"
            label="Nombre"
            style={{ margin: 16 }}
            inputStyle={{ letterSpacing: 1 }}
            color={theme.colors.primary}
            leading={(props) => (
              <View style={styles.icon}>
                <Ionicons
                  name={"person"}
                  size={25}
                  color={theme.colors.primary}
                />
              </View>
            )}
          />

          <TextInput
            variant="standard"
            label="Adultos"
            style={{ margin: 16 }}
            inputStyle={{ letterSpacing: 1 }}
            color={theme.colors.primary}
            leading={(props) => (
              <View style={styles.icon}>
                <Ionicons
                  name={"person"}
                  size={25}
                  color={theme.colors.primary}
                />
              </View>
            )}
          />
          <TextInput
            variant="standard"
            label="Niños"
            style={{ margin: 16 }}
            inputStyle={{ letterSpacing: 1 }}
            color={theme.colors.primary}
            leading={(props) => (
              <View style={styles.icon}>
                <Ionicons
                  name={"person"}
                  size={25}
                  color={theme.colors.primary}
                />
              </View>
            )}
          />

          <View style={styles.checkbox}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(true);
              }}
            />
            <Text style={{ fontSize: 20, textAlign: "center" }}>Activar</Text>
          </View>
          <View style={styles.checkbox}>
            <Checkbox
              status={checked ? "unchecked" : "checked"}
              onPress={() => {
                setChecked(false);
              }}
            />
            <Text style={{ fontSize: 20, textAlign: "center" }}>Reservar</Text>
          </View>

          <Button
            titleStyle={{ fontSize: 17 }}
            contentContainerStyle={{ height: 50 }}
            title="Aplicar Configuración"
            color={theme.colors.primary}
            uppercase={false}
            onPress={() => config()}
          />
        </Stack>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: "#D8D2CB",
    width: 340,
    marginLeft: 10,
    height: 60,
    borderRadius: 10,
    opacity: 0.6,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: theme.colors.secondary,
    paddingTop: 10,
  },
  header2: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    marginTop: 24,
    // position: 'relative',
    height: 500,
    // top: 5,
  },
  formContainer: {
    flex: 4.5,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    // paddingTop: 5,
  },
  back: {
    backgroundColor: theme.colors.text,
    heigh: 30,
    width: 40,
    position: "absolute",
    top: 37,
    left: 15,
    borderRadius: 10,
  },
  icon: {
    backgroundColor: "#FFFFFF",
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

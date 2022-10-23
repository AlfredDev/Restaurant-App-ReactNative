import React, { useEffect } from "react";
import {
  BackHandler,
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
import { actualizarCampo, addDocumento } from "../helpers/Backed";
import { useForm } from "../hooks/useForm";
// import Ionicons from "react-native-vector-icons/Ionicons";

export const MesasConfig = ({ route, navigation }) => {
  const { mesa } = route.params;
  const [checked, setChecked] = React.useState(true);

  const {
    onInputChange,
    nombre,
    adultos,
    niños = 0,
  } = useForm({
    nombre: nombre,
    adultos: adultos,
    niños: niños,
    mesa_id: mesa.id,
  });

  const cliente = {
    nombre: nombre,
    adultos: adultos,
    niños: niños,
    mesa_id: mesa.id,
  };

  const table = {
    Description: mesa.Description,
    Libre: mesa.Libre,
    Estatus: mesa.Estatus,
    id: mesa.id,
  };

  const config = () => {
    if (validar()) {
      table.Libre = false;
      table.Estatus = "Ocupada";
      actualizarCampo(table, "Mesa", mesa.idDoc);
      addDocumento("Cliente", cliente);
      navigation.navigate("MesaCuenta", {
        mesa: mesa,
      });
    }
  };

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  function validar() {
    if (!nombre) {
      alert("El nombre no puede estar vacio");
      return false;
    }

    if (parseInt(adultos) < 0 || parseInt(adultos) == 0 || !adultos) {
      alert("El valor no puede ser 0");
      return false;
    }
    if (parseInt(niños) < 0) {
      alert("El valor no puede ser 0");
      return false;
    }
    return true;
  }

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
            value={nombre}
            onChangeText={(value) => onInputChange("nombre", value)}
            leading={(props) => (
              <View style={styles.icon}>
                <Ionicons
                  name={"person"}
                  size={25}
                  color={theme.colors.primary}
                />
              </View>
            )}
            maxLength={25} //setting limit of input
          />

          <TextInput
            variant="standard"
            label="Adultos"
            keyboardType="numeric"
            style={{ margin: 16 }}
            inputStyle={{ letterSpacing: 1 }}
            color={theme.colors.primary}
            value={adultos}
            onChangeText={(value) => onInputChange("adultos", value)}
            leading={(props) => (
              <View style={styles.icon}>
                <Ionicons
                  name={"person"}
                  size={25}
                  color={theme.colors.primary}
                />
              </View>
            )}
            maxLength={2} //setting limit of input
          />
          <TextInput
            variant="standard"
            label="Niños"
            style={{ margin: 16 }}
            inputStyle={{ letterSpacing: 1 }}
            color={theme.colors.primary}
            value={niños}
            onChangeText={(value) => onInputChange("niños", value)}
            leading={(props) => (
              <View style={styles.icon}>
                <Ionicons
                  name={"person"}
                  size={25}
                  color={theme.colors.primary}
                />
              </View>
            )}
            keyboardType="numeric"
            maxLength={2} //setting limit of input
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

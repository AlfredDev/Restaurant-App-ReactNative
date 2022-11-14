import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
  BackHandler,
} from "react-native";
import { HeaderBlue } from "../components/HeaderBlue";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Stack, TextInput, Button } from "@react-native-material/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useForm } from "../hooks/useForm";
import { addDocumento, uid } from "../helpers/Backed";

export const AddAccount = ({ navigation, route }) => {
  const { mesa } = route.params;
  const { onInputChange, nombre } = useForm({
    nombre: nombre,
    mesa_id: mesa.id,
  });

  const model_cuenta = {
    fk_mesa_id: mesa.id,
    nombre: nombre,
    id: uid(),
  };

  const addRepreCuneta = () => {
    if (!nombre) {
      return alert("Nombre vacio");
    }
    addDocumento("Cuenta_cliente", model_cuenta);
    // navigation.goBack();
    navigation.reset({
      index: 0,
      routes: [{ name: "MesaCuenta", params: { mesa } }],
    });
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled
    >
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
      />

      <HeaderBlue
        
        description={mesa.Description}
        subtitle={"Agregar Cuenta"}
        navigation={navigation}
        goHome={navigation.goBack}
      />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <Stack spacing={50} style={[{ margin: 16 }, { marginTop: 50 }]}>
          <View style={styles.input}>
            <View
              style={{
                backgroundColor: "#d3dde2",
                width: 45,
                height: 48,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={"person"}
                size={25}
                color={theme.colors.primary}
              />
            </View>
            <TextInput
              variant="standard"
              label="Nombre"
              style={{ margin: 16, width: 250 }}
              color={theme.colors.primary}
              value={nombre}
              onChangeText={(value) => onInputChange("nombre", value)}
            />
          </View>
          <View style={styles.buton}>
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 58 }}
              title="Agregar Cuenta"
              width="98%"
              color={theme.colors.primary}
              uppercase={false}
              onPress={addRepreCuneta}
            />
          </View>
        </Stack>
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
    flex: 4.5,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    // paddingTop: 5,
  },
  input: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buton: {
    // marginTop: 200,
  },
  titulo: {
    color: 'write'
  },
});

import { Button, Stack, TextInput } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { HeaderBlue } from "../components";
import { theme } from "../core/theme";
import { addDocumento } from "../helpers/Backed";
import { useForm } from "../hooks/useForm";

export const AgregarUsuario = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };

  const [opcion, setOpcion] = useState("");

  function handleChangeOption(val) {
    if (val !== 0) {
      setOpcion(val);
    }
  }

  const { nombre, correo, usuario, contraseña, celular, onInputChange } =
    useForm({});

  const onAddUser = () => {
    if (
      Boolean(nombre) &&
      Boolean(contraseña) &&
      Boolean(usuario) &&
      Boolean(opcion)
    ) {
      const newUser = {
        nombre: nombre,
        usuario: usuario,
        rol: opcion,
        numCelular: celular,
        contraseña: contraseña,
        correo: correo,
        idEmpleado: Math.floor(Math.random() * 4000 + Math.random() * 180),
      };
      addDocumento("Trabajadores", newUser);
      alert("Nuevo usuario agregado");
      goBack();
    } else {
      alert("Necesitas llenar todos los campos");
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HeaderBlue goHome={goBack} description="Nuevo Usuario" />

      <View style={styles.formContainer}>
        <Stack spacing={15} style={{ margin: 16 }}>
          <TextInput
            label="Nombre"
            variant="standard"
            color={theme.colors.secondary}
            value={nombre}
            onChangeText={(value) => onInputChange("nombre", value)}
          />
          <Picker selectedValue={opcion} onValueChange={handleChangeOption}>
            <Picker.Item label="Por favor seleccione el rol" value="0" />
            <Picker.Item label="Mesero" value="Mesero" />
            <Picker.Item label="Barman" value="Barman" />
          </Picker>
          <TextInput
            label="Usuario"
            variant="standard"
            color={theme.colors.secondary}
            value={usuario}
            onChangeText={(value) => onInputChange("usuario", value)}
          />
          <TextInput
            label="Contraseña"
            variant="standard"
            color={theme.colors.secondary}
            value={contraseña}
            onChangeText={(value) => onInputChange("contraseña", value)}
          />
          <TextInput
            label="Celular"
            variant="standard"
            color={theme.colors.secondary}
            value={celular}
            onChangeText={(value) => onInputChange("celular", value)}
          />
          <TextInput
            label="Correo"
            variant="standard"
            color={theme.colors.secondary}
            value={correo}
            onChangeText={(value) => onInputChange("correo", value)}
          />
        </Stack>
      </View>
      <View style={styles.botones}>
        <Button
          titleStyle={{ fontSize: 17, textAlign: "center" }}
          contentContainerStyle={{
            height: 60,
            width: 340,
            textAlign: "center",
          }}
          title="Agregar Usuario"
          color={theme.colors.primary}
          uppercase={false}
          onPress={onAddUser}
        />
      </View>
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
    marginTop: 30,
    // justifyContent: "center",
  },
  botones: {
    flex: 1,
    backgroundColor: theme.colors.text,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.colors.secondary,
  },
});

import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  KeyboardAvoidingViewComponent,
  StyleSheet,
  Text,
  TextInputBase,
  View,
} from "react-native";
import { HeaderBlue } from "../components/HeaderBlue";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Button, TextInput, Stack } from "@react-native-material/core";
import { actualizarCampo, deleteDocument } from "../helpers/Backed";
import { useForm } from "../hooks/useForm";

export const ModificaUsuario = ({ navigation, route }) => {
  const { usuario } = route.params;

  const { onInputChange, Nusuario, contraseña } = useForm({
    Nusuario: Nusuario,
    contraseña: contraseña,
  });

  const goBack = () => {
    navigation.goBack();
  };
  const ElimnarUsuario = () => {
    Alert.alert(
      "Eliminar Usuario",
      "Estas seguro de eliminar a " + usuario.nombre,
      [
        { text: "No", onPress: () => console.log("ok") },
        {
          text: "Si",
          onPress: handleDelete,
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = () => {
    if (usuario.rol !== "Encargado" && usuario.rol !== "Gerente") {
      deleteDocument("Trabajadores", usuario.idDoc);
      goBack();
    } else {
      alert("NO PUDES ELIMINAR USUARIOS CON PRIVELEGIOS");
    }
  };

  const changedUsuario = () => {
    const user = {
      idEmpleado: usuario.id,
      contraseña: contraseña,
      correo: usuario.correo,
      nombre: usuario.nombre,
      numCelular: usuario.numCelular,
      rol: usuario.rol,
      usuario: Nusuario,
    };

    if (!Nusuario || !contraseña) {
      alert("Campos vacios");
    } else {
      actualizarCampo(user, "Trabajadores", usuario.idDoc);
      
      alert("Usuario actualizado");
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <HeaderBlue goHome={goBack} description="Modifica Usuario" />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.formulario}>
          <View style={styles.content}>
            <Text
              style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}
            >
              Nombre:
            </Text>
            <Text
              style={{
                fontWeight: "400",
                letterSpacing: 1,
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              {usuario.nombre}
            </Text>
          </View>
          <View style={styles.content}>
            <Text
              style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}
            >
              Rol:
            </Text>
            <Text
              style={{
                fontWeight: "400",
                letterSpacing: 1,
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              {usuario.rol}
            </Text>
          </View>
          <View style={styles.content}>
            <Text
              style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}
            >
              Usuario:
            </Text>
            <TextInput
              variant="standard"
              color={theme.colors.primary}
              value={Nusuario}
              onChangeText={(value) => onInputChange("Nusuario", value)}
              style={{
                width: "70%",
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
              }}
            />
          </View>
          <View style={styles.content}>
            <Text
              style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}
            >
              Contraseña:
            </Text>
            <TextInput
              variant="standard"
              color={theme.colors.primary}
              value={contraseña}
              onChangeText={(value) => onInputChange("contraseña", value)}
              style={{
                width: "60%",
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
              }}
            />
          </View>
        </View>
        <View style={styles.botones}>
          <Stack
            spacing={10}
            style={[
              { margin: 5 },
              { marginRight: 5 },
              { alignItems: "center" },
            ]}
          >
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 60, width: 340 }}
              title="Guardar Cambios"
              color={theme.colors.primary}
              uppercase={false}
              onPress={changedUsuario}
            />
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 60, width: 340 }}
              title="Eliminar Usuario"
              color={"#D8D2CB"}
              uppercase={false}
              onPress={ElimnarUsuario}
            />
          </Stack>
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
    marginTop: 15,
    justifyContent: "center",
  },
  formulario: {
    flex: 4,
    padding: 20,
  },
  botones: {
    flex: 1.5,
  },
  content: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
});

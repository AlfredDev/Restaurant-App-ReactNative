import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Header } from "../../components/Header";
import { theme } from "../../core/theme";
import * as Animatable from "react-native-animatable";
import { Stack, TextInput, Button } from "@react-native-material/core";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";

export const UserSetting = ({ navigation }) => {
  const { usuario } = useContext(UserContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled
    >
      <Header titulo={"Perfil"} />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <Stack
          spacing={50}
          style={[{ margin: 16 }, { marginTop: 50 }, { alignItems:"flex-start" }]}
        >
          //Nombre del trabajador
          <View style={styles.input}>
            <Text style={{ fontSize: 17, }}>
              Nombre:{" "}
            </Text>
            <Text style={{ fontSize: 16, opacity: 0.7 }}>
              {usuario.nombre}
            </Text>
            
          </View>
          //Nombre de usuario
          <View style={styles.input}>
            <Text style={{ fontSize: 17,}}>
              Usuario:{" "}
            </Text>
            <Text style={{ fontSize: 16, opacity: 0.7 }}>
              {usuario.usuario}
            </Text>
          </View>
          //Correo electronico
          <View style={styles.input}>
            <Text style={{ fontSize: 17, }}>
              Correo:{" "}
            </Text>
            <Text style={{ fontSize: 16, opacity: 0.7 }}>
              {usuario.correo}
            </Text>
          </View>
          <View style={styles.input}>
            <Text style={{ fontSize: 17, }}>
              Rol:{" "}
            </Text>
            <Text style={{ fontSize: 16, opacity: 0.7 }}>
              {usuario.rol}
            </Text>
          </View>
          //boton cerrar sesion
          <Button 
            titleStyle={{ fontSize: 17 }}
            contentContainerStyle={{ height: 50 }}
            title="Cerrar Sesión"
            justifyContent = "center"
            width="98%"
            //alignItems= 'center'
            height= "15%" //20
            color={"#D8D2CB"}
            uppercase={false}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            }
          />
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
    flex: 5,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    // paddingTop: 5,
    marginTop: 30,
    alignItems: "center",
    // justifyContent:'space-between'
  },
  input: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft:20
  },
});

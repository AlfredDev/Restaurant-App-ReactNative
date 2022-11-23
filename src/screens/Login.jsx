import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Header, Logo } from "../components/index";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import {
  Stack,
  TextInput,
  IconButton,
  Button,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useContext, useState } from "react";
import { useForm } from "../hooks/useForm";
import { db } from "../../database/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../hooks/UserContext";

export const Login = ({ navigation }) => {
  const { onInputChange, user, password } = useForm({
    user: "chipule",
    password: "admin",
  });

  const [secure, setSecure] = useState(true);

  // Implementando el userContext(hook), por la complejidad de pasar los datos a otros componenetes
  //Analizar si es necesario implementar mas para las ventanas de ordenes
  const { setUser } = useContext(UserContext);

  const getUser = async () => {
    const userRef = collection(db, "Trabajadores");
    const q = query(
      userRef,
      where("usuario", "==", user),
      where("contraseña", "==", password)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        setUser({
          nombre: doc.data().nombre,
          usuario: doc.data().usuario,
          id: doc.data().id,
          contraseña: doc.data().contraseña,
          correo: doc.data().correo,
          rol: doc.data().rol,
          idDoc: doc.id,
        });
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "MainContainer" }],
      });
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
      />
      <Header titulo={"Iniciar Sesión"} />
      <View style={styles.log}>
        <Logo />
      </View>
      <Animatable.View animation="fadeInLeft" style={styles.form}>
        <Stack spacing={20} style={[{ margin: 16 }, { marginTop: 25 }]}>
          <TextInput
            variant="standard"
            label="Usuario"
            style={{ margin: 16 }}
            inputStyle={{ letterSpacing: 1 }}
            leading={(props) => <Icon name="account" {...props} />}
            color={theme.colors.primary}
            value={user}
            onChangeText={(value) => onInputChange("user", value)}
          />
          <TextInput
            label="Contraseña"
            variant="standard"
            style={{ margin: 16 }}
            color={theme.colors.primary}
            onChangeText={(value) => onInputChange("password", value)}
            value={password}
            secureTextEntry={secure}
            leading={(props) => (
              <Icon name="form-textbox-password" {...props} />
            )}
            trailing={(props) => (
              <IconButton
                onPress={() => {
                  secure ? setSecure(false) : setSecure(true);
                }}
                icon={(props) => <Icon name="eye" {...props} />}
                {...props}
              />
            )}
          />

          <View style={styles.select_container}>
            {/* <View style={{ flexDirection: "row" }}>
                <Switch
                  style={{ paddingLeft: 8 }}
                  value={checked}
                  onValueChange={() => setChecked(!checked)}
                />
                <Text style={styles.label}>Recordar</Text>
              </View> */}

            <TouchableOpacity>
              <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ paddingLeft: 15 }, { paddingRight: 15 }]}>
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 45 }}
              title="Iniciar Sesión"
              color={theme.colors.primary}
              uppercase={false}
              onPress={() => getUser()}
            />
          </View>
        </Stack>
      </Animatable.View>
      <View style={styles.footer}>
        <Image source={require("../assets/svg.png")} style={styles.image} />
      </View>
    </KeyboardAvoidingView>
  );
  s;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  log: {
    flex: 1.1,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    // backgroundColor: theme.colors.primary,
    paddingBottom: 30,
  },
  form: {
    flex: 3,
    marginTop: 20,
    // backgroundColor: theme.colors.secondary,
  },
  footer: {
    flex: 1,
    // backgroundColor: theme.colors.primary,
  },
  link: {
    paddingTop: 10,
    fontWeight: "bold",
    color: theme.colors.secondary,
    // textAlign: "right",
    fontSize: 15,
    paddingRight: 15,
    textAlign: "right",
  },
  select_container: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginTop: -10,
  },
  label: {
    margin: 8,
    opacity: 0.5,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // justifyContent: "flex-end",
    // marginTop: 35,
    // position: "absolute",
  },
});

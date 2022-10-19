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
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import {
  Stack,
  TextInput,
  IconButton,
  Switch,
  Button,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";

export const Login = ({ navigation }) => {
  const [checked, setChecked] = useState(true);

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
            />
            <TextInput
              label="Contraseña"
              variant="standard"
              style={{ margin: 16 }}
              color={theme.colors.primary}
              leading={(props) => (
                <Icon name="form-textbox-password" {...props} />
              )}
              trailing={(props) => (
                <IconButton
                  icon={(props) => <Icon name="eye" {...props} />}
                  {...props}
                />
              )}
            />

            <View style={styles.select_container}>
              <View style={{ flexDirection: "row" }}>
                <Switch
                  style={{ paddingLeft: 8 }}
                  value={checked}
                  onValueChange={() => setChecked(!checked)}
                />
                <Text style={styles.label}>Recordar</Text>
              </View>

              <TouchableOpacity>
                <Text style={styles.link}>Olvide la contraseña</Text>
              </TouchableOpacity>
            </View>
            <View style={[{ paddingLeft: 15 }, { paddingRight: 15 }]}>
              <Button
                titleStyle={{ fontSize: 17 }}
                contentContainerStyle={{ height: 45 }}
                title="Iniciar Sesión"
                color={theme.colors.primary}
                uppercase={false}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "MainContainer" }],
                  })
                }
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
  },
  select_container: {
    flexDirection: "row",
    justifyContent: "space-between",
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
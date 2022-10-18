import React from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { HeaderBlue } from "../components/HeaderBlue";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Stack, TextInput, Button } from "@react-native-material/core";
import Ionicons from "react-native-vector-icons/Ionicons";

export const AddAccount = ({ navigation, route }) => {
  const { Itemid, description } = route.params;

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
        description={description}
        subtitle={"Agregar Cuneta"}
        navigation={navigation}
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
            />
          </View>
          <View style={styles.buton}>
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 58 }}
              title="Agregar Cuenta"
              width={350}
              color={theme.colors.primary}
              uppercase={false}
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
  buton:{
    // marginTop: 200,
  }
});

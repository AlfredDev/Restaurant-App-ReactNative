import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { HeaderBlue } from "../components";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-picker/picker";
import { PIckerCum } from "../components/PIckerCum";
import { Button } from "@react-native-material/core";
import { OrderLIst } from "../components/OrderLIst";

export const AddOrden = ({ navigation, route }) => {
  const { mesa, cuenta } = route.params;
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [value, onChangeText] = useState("");
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
        description={"Orden"}
        subtitle={"Agregar Producto"}
        navigation={navigation}
        goHome={navigation.goBack}
      />

      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 10 }}>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Categoria:</Text>
            <PIckerCum
              selected={selectedLanguage}
              setSelected={setSelectedLanguage}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Producto:</Text>
            <PIckerCum
              selected={selectedLanguage}
              setSelected={setSelectedLanguage}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Tamaño:</Text>
            <PIckerCum
              selected={selectedLanguage}
              setSelected={setSelectedLanguage}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Cantidad:</Text>
          </View>
          <Text style={styles.text}>Descripcion</Text>
          <View
            style={{
              borderColor: "#000000",
              height: 56,
              borderWidth: 2,
              marginTop: 5,
              borderRadius: 3,
              padding: 2,
            }}
          >
            <TextInput
              multiline
              onChangeText={(text) => onChangeText(text)}
              value={value}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 50 }}
              title="+  Agregar Orden"
              width={250}
              height={50}
              color={'#002B5B'}
              uppercase={false}
            />
          </View>
        </View>
        <OrderLIst />
        <Button
          titleStyle={{ fontSize: 17 }}
          contentContainerStyle={{ height: 50 }}
          title="Generar Orden"
          width={350}
          height={55}
          color={theme.colors.primary}
          uppercase={false}
        />
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
    flex: 6,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    // paddingTop: 10,
    marginTop: 10,
    alignItems: "center",
    paddingBottom: 3,
  },
  pickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginRight: 40,
  },
});

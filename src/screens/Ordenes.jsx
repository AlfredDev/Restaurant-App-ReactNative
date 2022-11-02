import {
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderBlue } from "../components/HeaderBlue";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Button, Stack } from "@react-native-material/core";
import { CuentaRepre } from "../components/CuentaRepre";
import { OrdenItem } from "../components/OrdenItem";
import { useEffect } from "react";

export const Ordenes = ({ navigation, route }) => {
  const { ItemId, description, nombre, mesa, cuenta } = route.params;

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
        subtitle={cuenta.nombre}
        navigation={navigation}
        goHome={navigation.goBack}
      />
      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.opciones}>
          <Text
            style={{
              textAlign: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            Órdenes
          </Text>
          <ScrollView stickyHeaderIndices={[1]}>
            <View style={styles.orderContainer}>
              <Stack spacing={10} style={[{ margin: 16 }, { marginTop: 10 }]}>
                <OrdenItem folio={2210083001} id={ItemId} />
              </Stack>
            </View>
            <View style={styles.botones}>
              <Stack spacing={10} style={[{ margin: 16 }, { marginTop: 10 }]}>
                <Button
                  titleStyle={{ fontSize: 17 }}
                  contentContainerStyle={{ height: 50 }}
                  title="Renta"
                  width={253}
                  height={60}
                  color={theme.colors.secondary}
                  uppercase={false}
                  disabled
                />
                <Button
                  titleStyle={{ fontSize: 17 }}
                  contentContainerStyle={{ height: 50 }}
                  title="+  Agregar Orden"
                  width={253}
                  height={60}
                  color={theme.colors.primary}
                  uppercase={false}
                  onPress={() =>
                    navigation.navigate("AddOrden", {
                      mesa: mesa,
                      cuenta: cuenta,
                    })
                  }
                />
              </Stack>
            </View>
          </ScrollView>
        </View>
        <View style={styles.butom}>
          <Text
            style={{
              textAlign: "right",
              marginRight: 30,
              marginBottom: 4,
              fontSize: 16,
            }}
          >
            Total: $ 500.00
          </Text>
          <Stack
            spacing={10}
            style={[
              { margin: 16 },
              { marginTop: 0 },
              { justifyContent: "center" },
              { alignItems: "center" },
            ]}
          >
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 50 }}
              title="Imprimir Cuenta"
              width={347}
              height={60}
              color={theme.colors.primary}
              uppercase={false}
              borderRadius={10}
            />
            <Button
              titleStyle={{ fontSize: 17 }}
              contentContainerStyle={{ height: 50 }}
              title="Despedir Mesa"
              width={347}
              height={60}
              color={"#D8D2CB"}
              uppercase={false}
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
    paddingTop: 10,
  },
  opciones: {
    // backgroundColor: theme.colors.secondary,
    flex: 3,
  },
  botones: {
    backgroundColor: theme.colors.secondary,
  },
  botones: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.colors.secondary,
  },
  butom: {
    flex: 1.3,

    // backgroundColor: theme.colors.secondary,
  },
});

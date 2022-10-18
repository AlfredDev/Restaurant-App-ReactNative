import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import {  Button } from "@react-native-material/core";
import { CuentaRepre } from "../components/CuentaRepre";
import { HeaderBlue } from "../components/HeaderBlue";

export const MesaCuenta = ({ route, navigation }) => {
  const { itemId, description } = route.params;

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
        subtitle={"Cuentas"}
        navigation={navigation}
      />

      <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
        <View style={styles.ordenes}>
          <ScrollView stickyHeaderIndices={[1]}>
            <View style={styles.scroll}>
              <CuentaRepre />
              <CuentaRepre />
            </View>
            <View style={styles.scroll}>
              <Button
                titleStyle={{ fontSize: 17 }}
                contentContainerStyle={{ height: 50 }}
                title="Agregar Cuenta"
                width={250}
                color={theme.colors.primary}
                uppercase={false}
                onPress={() =>
                  navigation.navigate("AddCuenta", {
                    itemId: itemId,
                    description: description,
                  })
                }
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.button_section}>
          <Text style={styles.text}>Consumo Minimo: $650.00</Text>
          <Text style={styles.text}>Total:</Text>
          <Text style={styles.text}>Diferencia:</Text>
        </View>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    margin: 4,
  },
  scroll: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
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
  ordenes: {
    flex: 4,
  },
  button_section: {
    flex: 1,
    // backgroundColor: theme.colors.secondary,
    alignItems: "flex-end",
    marginRight: 20,
  },
});

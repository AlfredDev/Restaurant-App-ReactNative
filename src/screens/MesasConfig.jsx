import React from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../components/Header";
import { theme } from "../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";

export const MesasConfig = ({ route, navigation }) => {
  const { itemId, description } = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
      />

      <View style={styles.header2}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name={"chevron-back"} size={40} />
          </TouchableOpacity>
        </View>
        <Header titulo={description} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: theme.colors.text,
            marginTop: 10,
          }}
        >
          Disponible{" "}
        </Text>
      </View>

      <View style={styles.formContainer}></View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: theme.colors.secondary,
  },
  header2: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingTop: 18,
    // position: 'relative',
    height: 500,
    // top: 5,
  },
  formContainer: {
    flex: 6,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  back: {
    backgroundColor: theme.colors.text,
    heigh: 30,
    width: 40,
    position: "absolute",
    top: 32,
    left: 15,
    borderRadius: 10,
  },
});

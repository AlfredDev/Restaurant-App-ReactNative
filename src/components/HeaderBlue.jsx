import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Header } from "./Header";
import { BackBtn } from "./BackBtn";

export const HeaderBlue = ({ description, subtitle, navigation, goHome }) => {
  return (
    <View style={styles.header2}>
      <BackBtn navigation={navigation} goHome={goHome} />

      <Header titulo={description} />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          color: theme.colors.text,
          // marginTop: 10,
          marginBottom: 10,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header2: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    marginTop: 24,
    // position: 'relative',
    height: 500,
    // top: 5,
  },
});

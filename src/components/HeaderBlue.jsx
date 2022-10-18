import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Header } from "./Header";

export const HeaderBlue = ({ description, subtitle,navigation }) => {
  return (
    <View style={styles.header2}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.back}>
          <Ionicons name={"chevron-back"} size={40} />
        </View>
      </TouchableOpacity>

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
  back: {
    backgroundColor: theme.colors.text,
    heigh: 30,
    width: 40,
    position: "absolute",
    top: 37,
    left: 15,
    borderRadius: 10,
  },
});

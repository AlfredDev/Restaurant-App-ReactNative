import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import { Header } from "../../components/Header";

export const Account = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Header titulo={"Órdenes"} />
      <ScrollView stickyHeaderIndices={[1]}></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const PedidoItem = () => {
  return (
    <View style={styles.head}>
      <View style={styles.des}>
        <Text>Limonada</Text>
      </View>
      <View style={styles.des}>
        <Text>Jarra</Text>
      </View>
      <View style={styles.des}>
        <Text>1</Text>
      </View>
      <View style={styles.des}>
        <Text>Sin limon y sin agua</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 35,
    // borderColor: "#D8D2CB",
    padding: 2,
    width: "90%",
    marginTop: 2,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  des: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
    padding: 3,
  },
});

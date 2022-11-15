import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";

export const OrdenesListas = ({ id, folio,fk_mesa_id, navigation }) => {
  return (
    <TouchableOpacity>
      <View style={styles.addcompont}>
      <Text
          style={{
            textAlign: "left",
            fontSize: 15,
            color: "black",
            // marginTop: 10,
            marginBottom: 10,
            fontWeight: 'bold'
          }}
        > 
         Mesa: {fk_mesa_id}
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontSize: 12,
            color: "black",
            // marginTop: 10,
            marginBottom: 10,
            fontWeight: 'bold'
            //marginLeft: 10,
          }}
        > 
          Folio: {folio}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addcompont: {
    backgroundColor: theme.colors.terciario,
    justifyContent: "center",
    alignItems: "flex-start",
    //marginLeft: 10,
    width: "98%",
    height: 70,
    borderRadius: 12,
    margin: 5,
  },
});
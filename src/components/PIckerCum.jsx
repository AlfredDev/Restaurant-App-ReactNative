import { Picker } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

export const PIckerCum = ({ selected, setSelected, opciones = [] }) => {
  return (
    <Picker
      selectedValue={selected}
      onValueChange={(itemValue) => setSelected(itemValue)}
      style={styles.picker}
    >
      {opciones.map((op) => (
        <Picker.Item label={op} value={op} key={op} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 175,
    height: 25,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    // borderWidth :1,
    // borderColor: "black",
  },
});

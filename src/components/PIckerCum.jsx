import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet } from "react-native";

export const PIckerCum = ({ selected, setSelected }) => {
  return (
    <Picker
      selectedValue={selected}
      onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 175,
    height: 25,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
  },
});

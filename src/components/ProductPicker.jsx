import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

export const ProductPicker = ({
  selected,
  setSelected,
  opciones,
  categoria,
}) => {
  function handleChangeOption(val) {
    if (val !== 0) {
      setSelected(val);
    }
  }
  return (
    <Picker
      selectedValue={selected}
      onValueChange={handleChangeOption}
      style={styles.picker}
    >
      <Picker.Item label="Por favor selecciona una opción..." value="0" />

      {opciones.map((op) => (
        <Picker.Item label={op.nombre} value={op.nombre} key={op.nombre} />
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

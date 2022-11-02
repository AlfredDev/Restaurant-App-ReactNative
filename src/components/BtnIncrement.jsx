import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const BtnIncrement = ({ count, setCount }) => {
  const decre = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.btn_form}>
      <TouchableOpacity style={styles.btn} onPress={decre}>
        <Text style={styles.txt}>-</Text>
      </TouchableOpacity>
      <Text style={styles.txt}> {count} </Text>
      <TouchableOpacity style={styles.btn} onPress={() => setCount(count + 1)}>
        <Text style={styles.txt}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn_form: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#EEEEEE",
    height: 23,
    width: 23,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});

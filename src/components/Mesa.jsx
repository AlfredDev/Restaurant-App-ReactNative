import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";

export const Mesa = ({ table, navigation }) => {
  const presabble = () => {
    table.libre
      ? navigation.navigate("MesaConfig", {
          itemId: table.id,
          description: table.description,
        })
      : navigation.navigate("MesaCuenta", {
          itemId: table.id,
          description: table.description,
        });
  };

  return (
    <TouchableOpacity
      // onPress={() => {
      //   navigation.navigate("MesaConfig", {
      //     itemId: table.id,
      //     description: table.description,
      //   });
      // }}
      onPress={presabble}
    >
      <View
        style={[
          styles.table,
          table.libre ? styles.table_libre : styles.table_ocupada,
        ]}
      >
        <Text style={[styles.text_table, { fontSize: 17 }]}>
          {table.description}
        </Text>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.text_table}>Estatus:</Text>
          <Text style={styles.text_table}>{table.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  table: {
    width: 81,
    height: 80,
    margin: 4,
    borderRadius: 5,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    padding: 5,
  },
  table_libre: {
    backgroundColor: "#1C658C",
    opacity: 0.7,
  },
  table_ocupada: {
    backgroundColor: "#398AB9",
  },
  text_table: {
    color: "#FFFFFF",
  },
});

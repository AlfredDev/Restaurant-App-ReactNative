import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";

export const Mesa = ({ table, navigation }) => {
  const presabble = () => {
    // if (table.reservada) {
    //   navigation.navigate("Reservada", {
    //     mesa: table,
    //   });
    //   return;
    // }

    table.Libre || table.reservada
      ? navigation.navigate("MesaConfig", {
          mesa: table,
        })
      : navigation.navigate("MesaCuenta", {
          mesa: table,
        });
  };

  return (
    <TouchableOpacity onPress={presabble}>
      <View
        style={[
          styles.table,
          table.Estatus == "Reservada" ? styles.table_reservada : 
          table.Estatus == "Ocupada" ? styles.table_ocupada : styles.table_libre,
         
        ]}
      >
        <Text style={[styles.text_table, { fontSize: 16 }]}>
          {table.Description}
        </Text>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  table: {
    width: 82,
    height: 80,
    margin: 4,
    borderRadius: 5,
    padding: 4,
    shadowColor: "#000",
    alignItems: "center",
    
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
    backgroundColor: "skyblue",
    opacity: 0.7,
  },
  table_ocupada: {
    backgroundColor: "#2196f3",
  },
  table_reservada: {
    backgroundColor: "#398AB9",
  },
  text_table: {
    color: "#FFFFFF",
    
  },
});

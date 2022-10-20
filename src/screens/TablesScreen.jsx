import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { Mesa } from "../components/Mesa";
import { theme } from "../core/theme";

const initialTable = [
  {
    id: 1,
    status: "Libre",
    description: "Mesa 1",
    libre: true,
  },
  {
    id: 2,
    status: "Libre",
    description: "Mesa 2",
    libre: true,
  },
  {
    id: 3,
    status: "Libre",
    description: "Mesa 3",
    libre: true,
  },
  {
    id: 4,
    status: "Ocupada",
    description: "Mesa 4",
    libre: false,
  },
  {
    id: 5,
    status: "Libre",
    description: "Mesa 5",
    libre: true,
  },
  {
    id: 6,
    status: "Libre",
    description: "Mesa 6",
    libre: true,
  },
  {
    id: 7,
    status: "Ocupada",
    description: "Mesa 7",
    libre: false,
  },
  {
    id: 8,
    status: "Ocupada",
    description: "Mesa 8",
    libre: false,
  },
];

export const TablesScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
      />
      <Header titulo={"Mesas"} />

      <View style={styles.scroll}>
        <ScrollView stickyHeaderIndices={[1]}>
          <View style={styles.container_tables}>
            {initialTable.map((table) => (
              <Mesa key={table.id} table={table} navigation={navigation} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 20,
  },
  scroll: {
    flex: 5,
    // backgroundColor: theme.colors.secondary,
    paddingTop: 5,
  },
  //   footer: {
  //     flex: 1,
  //     backgroundColor: theme.colors.primary,
  //     width: "100%",
  //   },
  container_tables: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
});

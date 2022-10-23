import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { Mesa } from "../components/Mesa";
import { theme } from "../core/theme";
import { db } from "../../database/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Stack, ActivityIndicator } from "@react-native-material/core";

export const TablesScreen = ({ navigation }) => {
  const [mesa, setMesas] = useState([]);
  const [loanding, setLoading] = useState(true);

  async function fetchData() {
    const q = query(collection(db, "Mesa"));
    const querySnapshot = await getDocs(q);
    const mesas = [];
    querySnapshot.forEach((doc) => {
      const { id, Estatus, Description, Libre } = doc.data();
      mesas.push({
        id: id,
        Estatus: Estatus,
        Description: Description,
        Libre: Libre,
      });
    });
    setMesas(mesas);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={theme.colors.secondary}
        barStyle="light-content"
      />
      <Header titulo={"Mesas"} />

      {loanding ? (
        <Stack fill center spacing={4}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Stack>
      ) : (
        <View style={styles.scroll}>
          <ScrollView stickyHeaderIndices={[1]}>
            <View style={styles.container_tables}>
              {mesa.map((table) => (
                <Mesa key={table.id} table={table} navigation={navigation} />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
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

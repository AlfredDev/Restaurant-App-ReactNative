import React, { useContext, useEffect,useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import { Header } from "../../components/Header";
import { Button, Stack } from "@react-native-material/core";
import { collection, deleteDoc, getDocs, query, where, doc,orderBy } from "firebase/firestore";
import { db } from "../../../database/firebase";
import { OrdenesListas } from "../../components/OrdenesListas";


export const Account = () => {
  const [ordenes, setOrdenes] = useState([]);
  useEffect(() => {}, []);

  async function fetchData() {
    const q = query(collection(db, "Orden"),orderBy("fk_mesa_id"));
    const querySnapshot = await getDocs(q);
    const orden = [];
    querySnapshot.forEach((doc) => {
      const { fk_mesa_id,folio } = doc.data();
      orden.push({
        folio: folio,
        fk_mesa_id: fk_mesa_id,
        //idDoc: doc.id,
      });
    });
    setOrdenes(orden);
    //setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header titulo={"Órdenes"} />
      <ScrollView stickyHeaderIndices={[1]}>
      <View style={styles.container}>
      <Stack spacing={10} style={[{ margin: 16 }, { marginTop: 10 }]}>
                {ordenes.map((op) => (
                  <OrdenesListas
                    folio={op.folio}
                    fk_mesa_id={op.fk_mesa_id}
                  />
                ))}
              </Stack>
              </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

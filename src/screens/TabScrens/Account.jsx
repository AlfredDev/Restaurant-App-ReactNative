import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import { Header } from "../../components/Header";
import { Button, Stack } from "@react-native-material/core";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../database/firebase";
import { OrdenesListas } from "../../components/OrdenesListas";
import { Checkbox } from "react-native-paper";

import { UserContext } from "../../hooks/UserContext";

export const Account = ({ navigation }) => {
  // const [checked, setChecked] = React.useState(false);
  const [orden, setOrdenes] = useState([]);
  const { ordenes } = useContext(UserContext);

  async function fetchData() {
    const q = query(collection(db, "Orden"), orderBy("fk_mesa_id"));
    const querySnapshot = await getDocs(q);
    const ordenes = [];
    querySnapshot.forEach((doc) => {
      const { fk_mesa_id, folio, estatus, fk_cuenta_id } = doc.data();
      ordenes.push({
        //id: id,
        idDoc: doc.id,
        estatus: estatus,
        folio: folio,
        fk_mesa_id: fk_mesa_id,
        fk_cuenta_id: fk_cuenta_id,
        //idDoc: doc.id,
      });
    });
    setOrdenes(ordenes);
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
            {orden.map((op) => (
              <OrdenesListas
                key={op.idDoc}
                folio={op.folio}
                fk_mesa_id={op.fk_mesa_id}
                fk_cuenta_id={op.fk_cuenta_id}
                estatus={op.estatus}
                navigation={navigation}
                op={op}
                //estatus={op.estatus}
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

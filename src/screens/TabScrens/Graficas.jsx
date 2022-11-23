import { Button, Stack } from "@react-native-material/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderOnly } from "../../components/HeaderOnly";
import { theme } from "../../core/theme";
import { getFecha } from "../../helpers/Backed";

export const Graficas = () => {
  return (
    <View style={styles.container}>
      <HeaderOnly descripcion={"Reporte ventas"} />
      <View style={styles.child}>
        <View style={styles.venta}>
          <Text style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}>
            Venta de hoy:{" "}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "450" }}>{getFecha()}</Text>
        </View>
      </View>
      <View style={styles.botones}>
        <Stack spacing={2} style={{ margin: 16 }}>
          <Button
            titleStyle={{ fontSize: 17, textAlign: "center" }}
            contentContainerStyle={{
              height: 55,
              width: 340,
              textAlign: "center",
            }}
            title="Semanal"
            color={theme.colors.primary}
            uppercase={false}
          />
          <Button
            titleStyle={{ fontSize: 17, textAlign: "center" }}
            contentContainerStyle={{
              height: 55,
              width: 340,
              textAlign: "center",
            }}
            title="Mensual"
            color={theme.colors.primary}
            uppercase={false}
          />
          <Button
            titleStyle={{ fontSize: 17, textAlign: "center" }}
            contentContainerStyle={{
              height: 55,
              width: 340,
              textAlign: "center",
            }}
            title="Anual"
            color={theme.colors.primary}
            uppercase={false}
          />
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: theme.colors.secondary,
    // paddingTop: 10,
  },
  child: {
    flex: 3,
    backgroundColor: theme.colors.text,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    marginTop: -20,
    // justifyContent: "center",
  },
  botones: {
    flex: 2,
    backgroundColor: theme.colors.text,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.colors.secondary,
  },
  venta: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import { theme } from "../core/theme";
import Ionicons from "react-native-vector-icons/Ionicons";

export const Search = () => {
  return (
    <View>
      <Stack spacing={2} style={{ margin: 16 }}>
        <TextInput
          color={theme.colors.primary}
          inputStyle={{
            letterSpacing: 1,
            marginLeft: 10,
            fontSize: 18,
            backgroundColor: "#EEEEEE",
          }}
          placeholder={"Buscar usuario"}
          leading={(props) => (
            <View style={styles.icon}>
              <Ionicons
                name={"search"}
                size={25}
                color={theme.colors.primary}
              />
            </View>
          )}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#FFFFFF",
    height: 55,
    width: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

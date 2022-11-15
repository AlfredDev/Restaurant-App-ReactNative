
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../core/theme";
import { Checkbox } from "react-native-paper";
import { Stack } from "@react-native-material/core";
import { collection, deleteDoc, getDocs, query, where, doc,orderBy } from "firebase/firestore";
import { async } from "@firebase/util";
import React, { useContext, useEffect,useState } from "react";
import { db } from "../../database/firebase";
import { actualizarCampo, addDocumento, uid } from "../helpers/Backed"; 
import { UserContext } from "../hooks/UserContext";
export const OrdenesListas = ({ fk_cuenta_id,estatus, folio, fk_mesa_id, navigation,route }) => {
    const { ordenes } = useContext(UserContext);

    const cancelar = async () => {
        ordenes.estatus = true;
        console.log(ordenes.estatus);
        console.log(folio);
        actualizarCampo(ordenes, "Orden", ordenes.idDoc);
        setChecked(true);
      };

    const [checked, setChecked] = React.useState(false);
    return (
        <TouchableOpacity>
            <Stack >
                <View style={styles.checkbox}>
                    <Text
                        style={{
                            //textAlign: "left",
                            fontSize: 15,
                            color: "black",
                            // marginTop: 10,
                            marginBottom: 10,
                            fontWeight: 'bold',
                           // opacity: 1,
                        }}
                    >
                        Mesa: {fk_mesa_id}
                    </Text>
                    <Text
                        style={{
                            //textAlign: "left",
                            fontSize: 12,
                            color: "black",
                            // marginTop: 10,
                            marginBottom: 10,
                            fontWeight: 'bold',
                            opacity: 0.7,
                            //marginLeft: 10,
                        }}
                    >
                        Folio: {folio}
                    </Text>
                    <Checkbox
                        status={checked ? "checked" : "unchecked"}
                        onPress={() => {
                            cancelar();
                        }}
                    />

                </View>
            </Stack>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addcompont: {
        backgroundColor: theme.colors.terciario,
        justifyContent: "center",
        alignItems: "flex-start",
        //marginLeft: 10,
        width: "98%",
        height: 70,
        borderRadius: 12,
        margin: 5,
        elevation: 5,
        opacity: 0.9,
    },
    checkbox: {
        backgroundColor: "#D8D2CB",
        width: "98%",
        //marginLeft: 10,
        //marginRight: 10,
        height: 60,
        borderRadius: 10,
        opacity: 0.6,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        justifyContent: "space-around",
        //alignContent: "space-around",
    },

});
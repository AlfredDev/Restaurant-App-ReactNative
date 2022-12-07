import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    Text,

    View,
} from "react-native";
import { TextInput, Stack } from "@react-native-material/core";
import { HeaderBlue } from "../components";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Button } from "@react-native-material/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../database/firebase";
import { async } from "@firebase/util";
import { addDocumento, generateUUID, uid, unicoId } from "../helpers/Backed";
import { useForm } from "../hooks/useForm";
import { validarContraseña, validarCorreo, validarNum, validarUsuario, validarNombre, validarCantidad } from "../helpers/Validaciones";

export const AddInsumo = ({ navigation, route }) => {
    const { onInputChange, Id, Nombre, Cantidad } = useForm({
        Id: Id,
        Nombre: Nombre,
        Cantidad: Cantidad,

    });

    const agregarInsumo = () => {
        const insum = {
            Id: unicoId("I"),
            Nombre: Nombre,
            Cantidad: Cantidad,
        };
        if (!Nombre || !Cantidad) {
            alert("Campos vacios");
        } else {
            if(validarCantidad(Cantidad)){
                addDocumento("Insumos", insum);
                alert("Insumo añadido");
                navigation.navigate("Insumos");
            }
            
        }
        


    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            enabled
        >
            <StatusBar
                backgroundColor={theme.colors.secondary}
                barStyle="light-content"
            />
            <HeaderBlue
                description={"Agregar"}
                subtitle={"Insumo"}
                navigation={navigation}
                goHome={navigation.goBack}
            />

            <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
                <Stack>
                    <View style={{ paddingTop: 10, spacing: 20 }}>


                        <View style={styles.pickerContainer}>
                            <Text style={styles.text}>Nombre:</Text>
                            <TextInput style={styles.inputs}
                                variant="standard"
                                color={theme.colors.primary}
                                borderColor="black"
                                value={Nombre}
                                onChangeText={(value) => onInputChange("Nombre", value)}
                            />
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text style={styles.text}>Cantidad:</Text>
                            <TextInput style={styles.inputs}
                                variant="standard"
                                color={theme.colors.primary}
                                borderColor="black"
                                value={Cantidad}
                                onChangeText={(value) => onInputChange("Cantidad", value)}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </Stack>

                <Stack
                    spacing={10}
                    style={styles.botnes}
                >
                    <View>
                        <Button
                            titleStyle={{ fontSize: 17 }}
                            contentContainerStyle={{ height: 50 }}
                            title="Agregar Producto"
                            width={330}
                            color={theme.colors.primary}
                            uppercase={false}
                            onPress={agregarInsumo}
                        />
                    </View>
                    <View>
                        <Button
                            titleStyle={{ fontSize: 17 }}
                            contentContainerStyle={{ height: 50 }}
                            title="Cancelar"
                            width={330}
                            color={"#D8D2CB"}
                            uppercase={false}
                            onPress={() => navigation.navigate("Insumos")}
                        />
                    </View>
                </Stack>
            </Animatable.View>
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    botnes: {
        alignItems: "center",
        marginTop: 10,
        flexWrap: "wrap",
        flexDirection: "column",
        margin: 5,
    },
    inputs: {
        width: "60%",
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
        paddingTop: 10,
    },
    formContainer: {
        flex: 6,
        backgroundColor: theme.colors.text,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 10,
        alignItems: "center",
        paddingBottom: 3,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    pickerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25,
        height: 56,
    },
    text: {
        fontSize: 16,

        fontWeight: "bold",
    },
    scroll: {
        padding: 10,
        justifyContent: "center",
    },
});

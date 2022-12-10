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
import { addDocIf, addDocumento, generateUUID, uid, unicosId, checking } from "../helpers/Backed";
import { useForm } from "../hooks/useForm";
import { Picker } from "@react-native-picker/picker";
import { validarContraseña, validarCorreo, validarNum, validarUsuario, validarNombre, validarCantidad, validarPrecio } from "../helpers/Validaciones";

export const AddPlatillo = ({ navigation, route }) => {

    const [opcion, setOpcion] = useState("");

    function handleChangeOption(val) {
        if (val !== 0) {
            setOpcion(val);
        }
    }

    const [opciont, setOpciont] = useState("");

    function handleChangeOptiont(vale) {
        if (vale !== 0) {
            setOpciont(vale);
        }
    }

    const { onInputChange, id, nombre, categoria, precio, tamaño } = useForm({});

    const agregarPlatillo = () => {
        const idp = unicosId("PL");
        const platillo = {
            
            id: idp,
            nombre: nombre,
            categoria: opcion,
            precio: {opciont: +precio},
            tamaño: opciont,
        };

        if (!nombre || !opcion || !precio || !opciont) {
            alert("Campos vacios");
        } else {
            if (
                validarNombre(nombre) &&
                validarPrecio(precio)
            ) {
                addDocIf("Platillos", "nombre", platillo.nombre, platillo, "Platillo")
                navigation.navigate("Platillos");
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
                subtitle={"Platillo"}
                navigation={navigation}
                goHome={navigation.goBack}
            />

            <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
                <Stack>
                    <View style={{ paddingTop: 10, spacing: 20 }}>
                    <Picker selectedValue={opcion} onValueChange={handleChangeOption}>
                                <Picker.Item label="Seleccione una categoria..." value="0" />
                                <Picker.Item label="Cocteles" value="Cocteles" />
                                <Picker.Item label="Tostadas" value="Tostadas" />
                                <Picker.Item label="Centro" value="Centro" />
                                <Picker.Item label="Sopas" value="Sopas" />
                                <Picker.Item label="Pescados y mariscos" value="Pescados y mariscos" />
                                <Picker.Item label="Especialidades" value="Especialidades" />
                                <Picker.Item label="Botanas" value="Botanas" />
                                <Picker.Item label="Postres" value="Postres" />
                                <Picker.Item label="Bebidas" value="Bebidas" />
                                <Picker.Item label="Infantil" value="Infantil" />
                            </Picker>
                            
                            <Picker selectedValue={opciont} onValueChange={handleChangeOptiont}>
                                <Picker.Item label="Seleccione un tamaño..." value="0" />
                                <Picker.Item label="chico" value="chico" />
                                <Picker.Item label="mediano" value="mediano" />
                                <Picker.Item label="grande" value="grande" />
                                <Picker.Item label="orden" value="orden" />
                                
                            </Picker>
                       

                        <View style={styles.pickerContainer}>
                            <Text style={styles.text}>Nombre:</Text>
                            <TextInput style={styles.inputs}
                                variant="standard"
                                color={theme.colors.primary}
                                borderColor="black"
                                value={nombre}
                                onChangeText={(value) => onInputChange("nombre", value)}
                            />
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text style={styles.text}>Precio:</Text>
                            <TextInput style={styles.inputs}
                                variant="standard"
                                color={theme.colors.primary}
                                borderColor="black"
                                inputStyle={{ letterSpacing: 1 }}
                                value={precio}
                                onChangeText={(value) => onInputChange("precio", value)}
                                keyboardType="numeric"
                            />
                        </View>
                    
                    </View>
                </Stack>

                <Stack>
                    <View style={styles.botnes}>
                        <Button
                            titleStyle={{ fontSize: 17 }}
                            contentContainerStyle={{ height: 50 }}
                            title="Agregar Producto"
                            width={330}
                            color={theme.colors.primary}
                            uppercase={false}
                            onPress={agregarPlatillo}

                        />
                    </View>
                    <View style={styles.botnes}>
                        <Button
                            titleStyle={{ fontSize: 17 }}
                            contentContainerStyle={{ height: 50 }}
                            title="Cancelar"
                            width={330}
                            color={"#D8D2CB"}
                            uppercase={false}
                            onPress={() => navigation.navigate("Productos")}
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
    pickerContaine: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
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

import React from "react";
import {
    Alert,
    KeyboardAvoidingView,
    KeyboardAvoidingViewBase,
    KeyboardAvoidingViewComponent,
    StyleSheet,
    Text,
    TextInputBase,
    View,
} from "react-native";
import { HeaderBlue } from "../components/HeaderBlue";
import { HeaderOnly } from "../components/HeaderOnly";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { Button, TextInput, Stack } from "@react-native-material/core";
import { actualizarCampo, deleteDocument } from "../helpers/Backed";
import { useForm } from "../hooks/useForm";
import { validarContraseña, validarCorreo, validarNum, validarUsuario, validarNombre, validarPrecio, validarCantidad } from "../helpers/Validaciones";

export const ModificarInsumos = ({ navigation, route }) => {
    const { insu } = route.params;

    const { onInputChange, ncantidad, nnombre } = useForm({
        ncantidad: insu.cantidad,
        nnombre: insu.nombre,
    });

    const goBack = () => {
        navigation.goBack();
    };
    const ElimnarInsumo = () => {
        Alert.alert(
            "Eliminar Insumo",
            "Esta seguro de eliminar " + insu.nombre,
            [
                { text: "No", onPress: () => console.log("ok") },
                {
                    text: "Si",
                    onPress: handleDelete,
                },
            ],
            { cancelable: false }
        );
    };

    const handleDelete = () => {
        deleteDocument("Insumos", insu.idDoc);
        goBack();
        alert("Insumo Eliminado");

    };

    const changedInsumo = () => {
        const insum = {
            Id: insu.id,
            Cantidad: +ncantidad,
            Nombre: nnombre,
        };

        if (!ncantidad || !nnombre) {
            alert("Campos vacios");
        } else {
            if (
                validarNombre(nnombre) &&
                validarCantidad(ncantidad)
                
            ) {
                actualizarCampo(insum, "Insumos", insu.idDoc);
                navigation.navigate("Insumos");
                alert("Insumo actualizado");
            }
        }
    };

    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <HeaderBlue
        description={"Modificar"}
        subtitle={"Insumo"}
        navigation={navigation}
        goHome={goBack}
      />
            <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
                <View style={styles.formulario}>
                    <View style={styles.content}>
                        <Text
                            style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}
                        >
                            Id:
                        </Text>
                        <Text
                            style={{
                                fontWeight: "400",
                                letterSpacing: 1,
                                fontSize: 16,
                                marginLeft: 5,
                            }}
                        >
                            {insu.id}
                        </Text>
                    </View>

                    <View style={styles.content}>
                        <Text
                            style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}
                        >
                            Nombre:
                        </Text>
                        <TextInput style={styles.inputs}
                            variant="standard"
                            color={theme.colors.primary}
                            value={nnombre}
                            onChangeText={(value) => onInputChange("nnombre", value)}
                            
                        />
                    </View>
                    <View style={styles.content}>
                        <Text
                            style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}
                        >
                            Cantidad:
                        </Text>
                        <TextInput style={styles.inputs}
                            variant="standard"
                            color={theme.colors.primary}
                            value={ncantidad}
                            onChangeText={(value) => onInputChange("ncantidad", value)}
                            keyboardType="numeric"
                        />
                    </View>
                    
                    
                </View>

                <View style={styles.botones}>
                    <Stack
                        spacing={10}
                        style={[
                            { margin: 5 },
                            { marginRight: 5 },
                            { alignItems: "center" },
                        ]}
                    >
                        <Button
                            titleStyle={{ fontSize: 17 }}
                            contentContainerStyle={{ height: 60, width: 340 }}
                            title="Guardar Cambios"
                            color={theme.colors.primary}
                            uppercase={false}
                            onPress={changedInsumo}
                        />
                        <Button
                            titleStyle={{ fontSize: 17 }}
                            contentContainerStyle={{ height: 60, width: 340 }}
                            title="Eliminar Insumo"
                            color={"#D8D2CB"}
                            uppercase={false}
                            onPress={ElimnarInsumo}
                        />
                    </Stack>
                </View>
            </Animatable.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: theme.colors.secondary,
        paddingTop: 10,
    },
    inputs: {
        width: "60%",
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
      },
    formContainer: {
        flex: 5,
        backgroundColor: theme.colors.text,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        padding: 10,
        marginTop: 15,
        justifyContent: "center",
    },
    formulario: {
        flex: 4,
        padding: 20,
    },
    botones: {
        flex: 1.5,
    },
    content: {
        flexDirection: "row",
        marginTop: 20,
        width: "98%",
        textAlign: "center",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        
    },
});

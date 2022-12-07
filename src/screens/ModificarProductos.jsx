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
import { actualizarCampo, deleteDocument, deleteDocWhere } from "../helpers/Backed";
import { useForm } from "../hooks/useForm";
import { validarContraseña, validarCorreo, validarNum, validarUsuario, validarNombre, validarPrecio, validarCantidad } from "../helpers/Validaciones";

export const ModificarProductos = ({ navigation, route }) => {
    const { product } = route.params;

    const { onInputChange, ncantidad, nprecio, nproducto } = useForm({
        ncantidad: product.cantidad.toString(),
        nprecio: product.precio.toString(),
        nproducto: product.producto,
    });

    const goBack = () => {
        navigation.goBack();
    };
    const ElimnarProducto = () => {
        Alert.alert(
            "Eliminar Producto",
            "Esta seguro de eliminar " + product.producto,
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
        deleteDocWhere("Platillos","nombre",product.producto);
        deleteDocument("Productos", product.idDoc);
        goBack();
        alert("Producto Eliminado");
    };

    const changedProducto = () => {
        const prod = {
            Id: product.id,
            Cantidad: +ncantidad,
            Precio: +nprecio,
            Producto: nproducto,
        };

        if (!ncantidad || !nprecio || !nproducto) {
            alert("Campos vacios");
        } else {
            if (
                validarNombre(nproducto) &&
                validarCantidad(ncantidad)&&
                validarPrecio(nprecio)
            ) {
                actualizarCampo(prod, "Productos", product.idDoc);
                navigation.navigate("Productos");
                alert("Producto actualizado");
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
        subtitle={"Producto"}
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
                            {product.id}
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
                            value={nproducto}
                            onChangeText={(value) => onInputChange("nproducto", value)}
                            
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
                    <View style={styles.content}>
                        <Text
                            style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}
                        >
                            Precio:
                        </Text>
                        <TextInput style={styles.inputs}
                            variant="standard"
                            color={theme.colors.primary}
                            value={nprecio}
                            onChangeText={(value) => onInputChange("nprecio", value)}
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
                            onPress={changedProducto}
                        />
                        <Button
                            titleStyle={{ fontSize: 17 }}
                            contentContainerStyle={{ height: 60, width: 340 }}
                            title="Eliminar Producto"
                            color={"#D8D2CB"}
                            uppercase={false}
                            onPress={ElimnarProducto}
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

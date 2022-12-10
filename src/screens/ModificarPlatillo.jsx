
import React, { useEffect, useState } from "react";
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
import { updateCampIf, deleteDocument, deleteDocWhere } from "../helpers/Backed";
import { useForm } from "../hooks/useForm";
import { Picker } from "@react-native-picker/picker";
import { validarContraseña, validarCorreo, validarNum, validarUsuario, validarNombre, validarPrecio, validarCantidad } from "../helpers/Validaciones";

export const ModificarPlatillo = ({ navigation, route }) => {
    const { plat } = route.params;

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
    const { onInputChange, nprecio, nnombre } = useForm({
       // ncantidad: product.cantidad.toString(),
        nprecio: nprecio,
        nnombre: plat.nombre.toString(),
    });

    const goBack = () => {
        navigation.goBack();
    };
    const ElimnarPlatillo = () => {
        Alert.alert(
            "Eliminar Platillo",
            "Esta seguro de eliminar " + plat.nombre,
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
        deleteDocWhere("Platillos","nombre",plat.nombre);
        //deleteDocument("Productos", product.idDoc);
        goBack();
        alert("Platillo Eliminado");
    };

    const changedPlatillo = () => {
        const plati = {
            id: plat.id,
            nombre: nnombre,
            categoria: opcion,
            precio: {opciont: +nprecio},
            tamaño: opciont,
        };

        if (!nprecio || !nnombre || !opcion || !opciont) {
            alert("Campos vacios");
        } else {
            if (
                validarNombre(nnombre) &&
                validarPrecio(nprecio)
            ) {
                updateCampIf("Platillos","nombre",plati.nombre, plati,plat.idDoc,"Platillo")
                navigation.navigate("Platillos");
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
        subtitle={"Platillo"}
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
                            {plat.id}
                        </Text>
                    </View>
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
                            onPress={changedPlatillo}
                        />
                        <Button
                            titleStyle={{ fontSize: 17 }}
                            contentContainerStyle={{ height: 60, width: 340 }}
                            title="Eliminar Producto"
                            color={"#D8D2CB"}
                            uppercase={false}
                            onPress={ElimnarPlatillo}
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

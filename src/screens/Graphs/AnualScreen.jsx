import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HeaderBlue } from '../../components'
import { theme } from '../../core/theme'
import * as Animatable from "react-native-animatable";

export const AnualScreen = ({ navigation }) => {

    const goHome = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}
        >
            <HeaderBlue description={'Venta Anual'} goHome={goHome} />
            <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
                <View style={styles.fecha}>

                </View>
                <View style={styles.tabla}>

                </View>
                <View style={styles.butones}></View>
            </Animatable.View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: theme.colors.secondary,
        paddingTop: 10,
    },
    formContainer: {
        flex: 5,
        backgroundColor: theme.colors.text,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        // paddingTop: 5,
    },
    fecha: {
        flex: .8,
        backgroundColor: theme.colors.border,
    },
    tabla: {
        flex: 4,
        backgroundColor: theme.colors.primary,
    },
    butones: {
        flex: 1,
        backgroundColor: theme.colors.error
    }
})
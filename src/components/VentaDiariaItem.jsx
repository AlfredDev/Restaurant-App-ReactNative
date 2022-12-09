import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const VentaDiariaItem = ({ cliente, mesa, venta }) => {
    return (
        <View style={styles.table}>
            <View style={{ flex: 2, alignItems: 'center', overflow: 'hidden' }}>
                <Text>{cliente}</Text>
            </View>
            <View style={{ flex: 1, height: 20, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center' }}> {mesa}</Text>
            </View>
            <View style={{ flex: 1.5,  height: 20 }}>
                <Text style={{ textAlign: 'center' }}> ${venta}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    table: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent:'space-around',
        height: 30,
        borderBottomWidth: 1,
    }
})
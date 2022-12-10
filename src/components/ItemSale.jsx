import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const ItemSale = ({ dia, venta }) => {
    return (
        <View style={styles.table}>
            <View style={{ flex: 3, alignItems: 'center', overflow: 'hidden' }}>
                <Text>{dia}</Text>
            </View>

            <View style={{ flex: 1.5, height: 20 }}>
                <Text style={{ textAlign: 'center' }}> ${venta}</Text>
            </View>
        </View>)
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
});
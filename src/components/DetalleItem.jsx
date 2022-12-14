import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { theme } from '../core/theme'

export const DetalleItem = ({producto,tamaño,cantidad,precio}) => {
    return (
        <View style={styles.table}>
            <View style={styles.row}>
                <Text style={styles.txt}>{producto}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.txt}>{tamaño}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.txt}>{cantidad}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.txt}>{precio}</Text>
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
        height: 40
      },
      row: {
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        overflow: "hidden",
        marginTop:10,
        marginBottom:10,
        height: 35

      },
      txt: {
        textAlign: "center",
        marginLeft: 9,
      },
})
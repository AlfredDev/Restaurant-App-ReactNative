import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { currencyFormat } from '../helpers/Backed';
import { ItemSale } from './ItemSale';

export const TableSales = ({ fecha, semana }) => {


    return (

        <View>
            <View style={styles.table}>
                <View style={{ flex: 3, alignItems: 'center' }}>
                    <Text>{fecha}</Text>
                </View>
                <View style={{ flex: 1.5, borderLeftWidth: 2, height: 20 }}>
                    <Text style={{ textAlign: 'center' }}> Venta</Text>
                </View>
            </View>
            <ScrollView

            >

                {semana.map((dia) => (
                    <ItemSale dia={dia.dia} venta={currencyFormat(dia.total)} key={dia.id} />

                ))}

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    table: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent:'space-around',
        borderWidth: 1.3,
        height: 30,
        backgroundColor: '#D8D2CB',
    },
});
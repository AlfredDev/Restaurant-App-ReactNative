import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderBlue } from '../../components/HeaderBlue';
import { VentaDiariaItem } from '../../components/VentaDiariaItem';
import { theme } from '../../core/theme';
import { getDate } from '../../helpers/Backed';

export const SaleDaily = ({ navigation, route }) => {
    const [datePicker, setDatePicker] = useState(false);
    const { venta } = route.params;

    const [date, setDate] = useState(getDate());
    // const  [total,set]

    const goHome = () => {
        navigation.goBack();
    }

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        fecthOrdenes();
    }

    const total = () => {
        let to = 0;

        venta.forEach((o) => {
            to += o.total;

        });

        // console.log(to);

        return to;
    }

    const FechaBien = (date) => {
        var dateObj = date;
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        return year + "/" + month + "/" + day;
    };

    return (
        <View style={styles.container}>
            <HeaderBlue goHome={goHome} description={'Venta Diaria'} />
            <View style={styles.child}>
                <View style={styles.venta}>
                    <Text style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}>
                        Fecha :
                    </Text>

                    <TouchableOpacity
                        style={styles.fecha}
                        onPress={() => setDatePicker(true)}
                        
                    >
                        <Text>{FechaBien(date)}</Text>
                    </TouchableOpacity>

                    {datePicker && (
                        <RNDateTimePicker
                            value={date}
                            mode="date"
                            maximumDate={getDate()}
                            positiveButton={{ label: "OK", textColor: "green" }}
                            onChange={onDateSelected}
                        />
                    )}
                </View>

                <ScrollView style={{ flex: 4 }}>
                    <View style={styles.table}>
                        <View style={{ flex: 2, alignItems: 'center' }}>
                            <Text>Cliente</Text>
                        </View>
                        <View style={{ flex: 1, borderLeftWidth: 2, height: 20, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center' }}> Mesa</Text>
                        </View>
                        <View style={{ flex: 1.5, borderLeftWidth: 2, height: 20 }}>
                            <Text style={{ textAlign: 'center' }}> Venta</Text>
                        </View>
                    </View>

                    {venta.map((venta) => (
                        <VentaDiariaItem key={venta.id} venta={venta.total} cliente={venta.cliente} mesa={venta.mesa} />

                    ))}
                </ScrollView>



                <View style={styles.bottom}>
                    <Text style={{ fontSize: 17 }}>Venta Total:</Text>
                    <View style={styles.total}>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>
                            $ {total()}
                        </Text>
                    </View>
                </View>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: theme.colors.secondary,
        // paddingTop: 10,
    },
    child: {
        flex: 5,
        backgroundColor: theme.colors.text,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        padding: 15,
        marginTop: -10,
        // justifyContent: "center",
    },
    venta: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    fecha: {
        marginLeft: 5,
        color: theme.colors.primary,
        backgroundColor: '#EEEDDD',
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        width: 180,
        borderRadius: 5,
        borderWidth:2
    },
    table: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent:'space-around',
        borderWidth: 1.3,
        height: 30,
        backgroundColor: '#D8D2CB',
    },
    bottom: {
        flex: .3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    total: {
        backgroundColor: '#D8D2CB',
        width: '90%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1
    }
});
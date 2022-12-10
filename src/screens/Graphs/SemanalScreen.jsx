import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderBlue } from '../../components'
import { theme } from '../../core/theme'
import * as Animatable from "react-native-animatable";
import { DatePicker } from '../../components/DatePicker';
import { getDate } from '../../helpers/Backed';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TableSales } from '../../components/TableSales';
import { Button } from '@react-native-material/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../database/firebase';

export const SemanalScreen = ({ navigation }) => {
    const [date, setDate] = useState(getDate());
    const [datePicker, setDatePicker] = useState(false);
    const [Venta, setVenta] = useState([]);
    const fecthOrdenes = async () => {
        const q = query(collection(db, "Venta"));
        const querySnapshot = await getDocs(q);

        const cuentas = [];
        // const pedido = [];

        querySnapshot.forEach((doc) => {
            const { cliente, fecha, id, mesa, total } = doc.data();
            let date  = new Date(fecha);
            let cuenta = {
                cliente: cliente,
                fecha: date,
                id: id,
                mesa: mesa,
                total: total,
            };

            // pedido.push(pedidos);
            cuentas.push(cuenta);
        });
        setVenta(cuentas);

        let t = 0;
    };

    useEffect(() => {
        fecthOrdenes();
        console.log(Venta);
    }, [])
    

    const goHome = () => {
        navigation.goBack();
    }


    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        fecthOrdenes();
    }

    const FechaBien = (date) => {
        var dateObj = date;
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        return year + "/" + month + "/" + day;
    };

    return (
        <View style={styles.container}
        >
            <HeaderBlue description={'Venta Semanal'} goHome={goHome} />
            <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
                <View style={styles.fecha}>
                    <View style={styles.venta}>
                        <Text style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 17 }}>
                            Fecha :
                        </Text>

                        <TouchableOpacity
                            style={styles.date}
                            onPress={() => setDatePicker(true)}
                        >
                            <Text style={{ fontSize: 17 }}>{FechaBien(date)}</Text>
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
                </View>
                <View style={styles.tabla}>
                    <TableSales fecha={'Dia'} />
                </View>
                <View style={styles.butones}>
                    <View style={styles.bottom}>
                        <Text style={{ fontSize: 17 }}>Venta Total:</Text>
                        <View style={styles.total}>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                $150
                            </Text>
                        </View>
                    </View>
                    <Button
                        titleStyle={{ fontSize: 17 }}
                        contentContainerStyle={{ height: 50, }}
                        title="Comparar Semana"
                        width={347}
                        height={60}
                        color={theme.colors.primary}
                        uppercase={false}
                        borderRadius={15}
                        style={{ marginBottom: 10 }}
                    />
                </View>
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
        padding: 10,
        // justifyContent: 'center',
        paddingTop: 15,
    },
    fecha: {
        flex: .8,
        // padding: ,
        // paddingTop: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },


    tabla: {
        flex: 4,
        // backgroundColor: theme.colors.primary,
    },
    butones: {
        flex: 2,
        // backgroundColor: theme.colors.error
        alignItems: "center",
        justifyContent: "center",
    },
    venta: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        // padding: 10,
    },
    date: {
        marginLeft: 5,
        color: theme.colors.primary,
        backgroundColor: '#EEEDDD',
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        width: 180,
        borderRadius: 5,
        borderWidth: 2
    },
    bottom: {
        // flex: .3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    total: {
        backgroundColor: '#D8D2CB',
        width: 310,
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1,
        marginBottom: 10,
    },
})
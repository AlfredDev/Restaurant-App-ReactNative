import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderBlue } from '../../components'
import { theme } from '../../core/theme'
import * as Animatable from "react-native-animatable";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { getDate } from '../../helpers/Backed';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../database/firebase';

export const AnualScreen = ({ navigation }) => {
    const [date, setDate] = useState(getDate());
    const [datePicker, setDatePicker] = useState(false);
    const [Venta, setVenta] = useState([]);
    const [ventaAño, setEventaAño] = useState([]);
    const goHome = () => {
        navigation.goBack();
    }
    async function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        // fecthOrdenes();
        filtrarAño();
        getTotalAnual();
    }

    const FechaBien = (date) => {
        var dateObj = date;
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        return year + "/" + month + "/" + day;
    };

    const FechaBienYear = (date) => {
        var dateObj = date;
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        return year;
    };

    const fecthOrdenes = async () => {
        const q = query(collection(db, "Venta"));
        const querySnapshot = await getDocs(q);

        const cuentas = [];
        // const pedido = [];

        querySnapshot.forEach((doc) => {
            const { cliente, fecha, id, mesa, total } = doc.data();
            let date = new Date(fecha);
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
        filtrarAño();
        getTotalAnual();
    }, [])

    const filtrarAño = () => {
        var años = date.getFullYear();

        var resultProductData = Venta.filter(a => {
            var dates = a.fecha.getUTCFullYear();
            console.log(dates);
            return (dates == años);
        });

        // console.log(resultProductData);
        setEventaAño(resultProductData);
    }

    const [total, setTotal] = useState();

    const getTotalAnual = () => {
        let total = 0;
        ventaAño.forEach(a => {
            total += a.total;
        })


        setTotal(currencyFormat(total));
    }
    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
  

    return (
        <View style={styles.container}
        >
            <HeaderBlue description={'Venta Anual'} goHome={goHome} />
            <Animatable.View animation="fadeInLeft" style={styles.formContainer}>
                <View style={styles.fecha}>
                    <View style={styles.venta}>
                        <Text style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 17 }}>
                            Año :
                        </Text>

                        <TouchableOpacity
                            style={styles.date}
                            onPress={() => setDatePicker(true)}
                        >
                            <Text style={{ fontSize: 17 }}>{FechaBienYear(date)}</Text>
                        </TouchableOpacity>

                        {datePicker && (
                            <RNDateTimePicker
                                value={date}
                                mode="date"
                                maximumDate={getDate()}
                                positiveButton={{ label: "OK", textColor: "green" }}
                                onChange={onDateSelected}
                                locale="es-ES"
                            />
                        )}
                    </View>
                </View>
                <View style={styles.tabla}>

                </View>
                <View style={styles.butones}>
                    <View style={styles.bottom}>
                        <Text style={{ fontSize: 17 }}>Venta Anual:</Text>
                        <TouchableOpacity style={styles.total} onPress={getTotalAnual}>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                {total}
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    },
    fecha: {
        flex: .8,
        // padding: ,
        // paddingTop: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
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
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 10,
        borderWidth: 1,
        // marginBottom: 10,
    },
})
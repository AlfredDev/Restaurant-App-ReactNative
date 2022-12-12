import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderBlue } from '../../components'
import { theme } from '../../core/theme'
import * as Animatable from "react-native-animatable";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { getDate } from '../../helpers/Backed';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../database/firebase';
import { TableSales } from '../../components/TableSales';

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
        totales();

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
            // console.log(dates);
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
        totales();
    }
    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const months = [
        {
            id: 1,
            dia: 'Enero',
            total: 0
        },
        {
            id: 2,
            dia: 'Febrero',
            total: 0
        },
        {
            id: 3,
            dia: 'Marzo',
            total: 0
        },
        {
            id: 4,
            dia: 'Abril',
            total: 0
        },
        {
            id: 5,
            dia: 'Mayo',
            total: 0
        },
        {
            id: 6,
            dia: 'Junio',
            total: 0
        },
        {
            id: 7,
            dia: 'Julio',
            total: 0
        },
        {
            id: 8,
            dia: 'Agosto',
            total: 0
        },
        {
            id: 9,
            dia: 'Septiembre',
            total: 0
        },
        {
            id: 10,
            dia: 'Octubre',
            total: 0
        },
        {
            id: 11,
            dia: 'Noviembre',
            total: 0
        },
        {
            id: 12,
            dia: 'Diciembre',
            total: 0
        },
    ];


    const [meses, setMeses] = useState(months);


    const totales = () => {
        ventaAño.forEach(m => {
            var mes = m.fecha.getMonth();
            if (mes == 0) {
                months[0].total += m.total;

            }
            if (mes == 1) {
                months[1].total += m.total;

            }
            if (mes == 2) {
                months[2].total += m.total;

            }
            if (mes == 3) {
                months[3].total += m.total;

            }
            if (mes == 4) {
                months[4].total += m.total;

            }
            if (mes == 5) {
                months[5].total += m.total;

            }
            if (mes == 6) {
                months[6].total += m.total;

            }
            if (mes == 7) {
                months[7].total += m.total;

            }
            if (mes == 8) {
                months[8].total += m.total;

            }
            if (mes == 9) {
                months[9].total += m.total;

            }
            if (mes == 10) {
                months[10].total += m.total;

            }
            if (mes == 11) {
                months[11].total += m.total;

            }

        })
        setMeses(months);
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
                    <TableSales fecha={'Mes'} semana={meses} />
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
        padding: 15,
    },
    fecha: {
        flex: .8,
        backgroundColor: theme.colors.border,
    },
    tabla: {
        flex: 4,
        // backgroundColor: theme.colors.primary,
    },
    butones: {
        flex: 1,
        // backgroundColor: theme.colors.error
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
        shadowColor: "#000",
        alignItems: "center",

        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,

        elevation: 13,
    },
})
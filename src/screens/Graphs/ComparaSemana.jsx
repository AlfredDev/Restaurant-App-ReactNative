import RNDateTimePicker from '@react-native-community/datetimepicker'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderBlue } from '../../components'
import { theme } from '../../core/theme'
import { currencyFormat, getDate } from '../../helpers/Backed'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../database/firebase';

export const ComparaSemana = ({ navigation }) => {
    const [date, setDate] = useState(getDate());
    const [datePicker, setDatePicker] = useState(false);
    const [Venta, setVenta] = useState([]);
    const [semana, setSemana] = useState([]);
    const [total, setTotal] = useState();

    const goHome = () => {
        navigation.goBack();
    }

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
        // console.log(semana);}
        calcularTotal();
        // semanaAñoPasado();
    }, [])

    const porSemana = async () => {
        var HaceUnaSemana = new Date(date - (24 * 60 * 60 * 1000) * 7);
        var resultProductData = Venta.filter(a => {
            var dates = new Date(a.fecha);
            return (dates >= HaceUnaSemana && dates <= date);
        });
        // console.log(resultProductData);
        setSemana(resultProductData);
    }

    const [pasada, setPasada] = useState([]);

    const semanaAñoPasado = () => {
        let d = date;
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var c = new Date(year - 1, month, day);
        var HaceUnaSemana = new Date(c - (24 * 60 * 60 * 1000) * 7);

        var resultProductData = Venta.filter(a => {
            var dates = new Date(a.fecha);
            return (dates >= HaceUnaSemana && dates <= c);
        });

        setPasada(resultProductData);
        if (resultProductData.length == 0) {
            alert('No hay ventas en la semana ' + FechaBien(c));
        }
    }


    async function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        // fecthOrdenes();
        porSemana();
        semanaAñoPasado();
    }

    const FechaBien = (date) => {
        var dateObj = date;
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        return year + "/" + month + "/" + day;
    };

    const calcularTotal = () => {
        let total = 0;
        semana.forEach(a => {
            total += a.total;
        })
        setTotal(currencyFormat(total));
        calcularTotalPasado();
    }

    const [tpasado, setTpasado] = useState();
    const calcularTotalPasado = () => {
        let total = 0;
        pasada.forEach(a => {
            total += a.total;
        })
        setTpasado(currencyFormat(total));
    }

    return (
        <View style={styles.container}
        >
            <HeaderBlue description={'Venta Semanal'} goHome={goHome} />

            <View style={styles.formContainer}>
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
                <View style={styles.grafica}>


                </View>
                <View style={styles.butones}>
                    <View style={styles.bottom}>
                        <Text style={{ fontSize: 17 }}>Venta semana seleccionada:</Text>
                        <TouchableOpacity style={styles.total} onPress={calcularTotal}>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                {total}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={{ fontSize: 17 }}>Venta semana del año anterior:</Text>
                        <TouchableOpacity style={styles.total} >
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                {tpasado}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
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
    grafica: {
        flex: 4
    },
    butones: {
        flex: 2,
        // backgroundColor: theme.colors.error
        alignItems: "center",
        justifyContent: "center",
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
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 10,
        borderWidth: 1,
        // marginBottom: 10,
    },
});
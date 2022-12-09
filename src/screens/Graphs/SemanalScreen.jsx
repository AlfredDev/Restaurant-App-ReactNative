import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderBlue } from '../../components'
import { theme } from '../../core/theme'
import * as Animatable from "react-native-animatable";
import { DatePicker } from '../../components/DatePicker';
import { getDate } from '../../helpers/Backed';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export const SemanalScreen = ({ navigation }) => {
    const [date, setDate] = useState(getDate());
    const [datePicker, setDatePicker] = useState(false);

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
                            <Text style= {{fontSize:17}}>{FechaBien(date)}</Text>
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
        padding: 10,
        // justifyContent: 'center',
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
        backgroundColor: theme.colors.primary,
    },
    butones: {
        flex: 1,
        backgroundColor: theme.colors.error
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
        borderWidth:2
    }
})
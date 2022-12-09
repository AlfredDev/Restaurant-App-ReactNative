import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { getDate } from '../helpers/Backed';

export const DatePicker = ({ date, setDate }) => {
    const [datePicker, setDatePicker] = useState(false);
    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        fecthOrdenes();
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => setDatePicker(true)}
        >
            {datePicker && (
                <RNDateTimePicker
                    value={date}
                    mode="date"
                    maximumDate={getDate()}
                    positiveButton={{ label: "OK", textColor: "green" }}
                    onChange={onDateSelected}
                />
            )}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#D8D2CB',
    }
})

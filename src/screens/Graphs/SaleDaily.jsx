import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderBlue } from '../../components/HeaderBlue';
import { theme } from '../../core/theme';
import { getDate } from '../../helpers/Backed';

export const SaleDaily = ({ navigation }) => {
    const [datePicker, setDatePicker] = useState(false);

    const [date, setDate] = useState(getDate());
  

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
        <View style={styles.container}>
            <HeaderBlue goHome={goHome} description={'Venta Diaria'} />
            <View style={styles.child}>
            <View style={styles.venta}>
          <Text style={{ fontWeight: "bold", letterSpacing: 1, fontSize: 16 }}>
            Venta de hoy:
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
        flex: 3.5,
        backgroundColor: theme.colors.text,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        padding: 15,
        marginTop: -50,
        // justifyContent: "center",
    },
});
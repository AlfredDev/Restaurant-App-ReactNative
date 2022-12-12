import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes'
export default function MyLineChart({ ChartData }) {
    return (
        <View>
            <Text>
                My Line Chart
            </Text>
            <LineChart
                data={props.data}
                width={Dimensions.get('window').width}
                height={200}
                yAxisLabel={'$'}
                chartConfig={{
                    backgroundGradientFrom: 'darkblue',
                    backgroundGradientTo: 'blue',
                    color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
                }}
            />
        </View>
    )
}
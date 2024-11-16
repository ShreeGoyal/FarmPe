import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FertlizerCalculator({ navigation }) {
    const [desiredRate, setDesiredRate] = useState('');
    const [fertilizerGrade, setFertilizerGrade] = useState('');
    const [nitrogenRate, setNitrogenRate] = useState(null);
    const [phosphorusRate, setPhosphorusRate] = useState(null);
    const [potassiumRate, setPotassiumRate] = useState(null);

    const calculateFertilizerRate = () => {
        const desiredRateValue = parseFloat(desiredRate);
        const fertilizerGradeArray = fertilizerGrade.split(' ').map(parseFloat);

        if (
            !isNaN(desiredRateValue) &&
            fertilizerGradeArray.length === 3 &&
            fertilizerGradeArray.every(val => !isNaN(val))
        ) {
            const nitrogen = (desiredRateValue * 100) / fertilizerGradeArray[0];
            const phosphorus = (desiredRateValue * 100) / fertilizerGradeArray[1];
            const potassium = (desiredRateValue * 100) / fertilizerGradeArray[2];

            setNitrogenRate(nitrogen.toFixed(2));
            setPhosphorusRate(phosphorus.toFixed(2));
            setPotassiumRate(potassium.toFixed(2));
        } else {
            setNitrogenRate(null);
            setPhosphorusRate(null);
            setPotassiumRate(null);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.desiredInput}>
                <Text style={{ fontWeight: '600', backgroundColor: '#2E7D43', padding: 10, borderTopLeftRadius: 15 }}>Desired Nutrient</Text>
                <TextInput
                    style={{ marginLeft: 10 }}
                    placeholder="Desired Nutrient Rate (kg/ha)"
                    keyboardType="numeric"
                    value={desiredRate}
                    onChangeText={text => setDesiredRate(text)}
                />
            </View>
            <View style={styles.NPKValue}>
                <Text style={{ fontWeight: '600', backgroundColor: '#2E7D43', padding: 10, borderBottomLeftRadius: 15 }}>NPK Values        </Text>
                <TextInput
                    placeholder="Fertilizer Grade (N P K, separated by spaces)"
                    value={fertilizerGrade}
                    onChangeText={text => setFertilizerGrade(text)}
                />
            </View>
            <TouchableOpacity style={styles.Fertilizer} onPress={calculateFertilizerRate}><Text style={{fontWeight: '600'}}>Calculate Fertilizer Rates</Text></TouchableOpacity>
            {nitrogenRate !== null && phosphorusRate !== null && potassiumRate !== null && (
                <View style={styles.resultContainer}>
                    <Text style={styles.result}>Required Fertilizer Rates:</Text>
                    <Text style={styles.result}>Nitrogen: {nitrogenRate} kg/ha</Text>
                    <Text style={styles.result}>Phosphorus: {phosphorusRate} kg/ha</Text>
                    <Text style={styles.result}>Potassium: {potassiumRate} kg/ha</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '80%',
        height: 40,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    result: {
        fontSize: 16,
        marginBottom: 5,
    },
    desiredInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        width: '80%',
        borderRadius: 15
    },
    NPKValue: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        width: '80%',
        borderRadius: 15,
        marginTop: 3
    },
    Fertilizer: {
        backgroundColor: '#999999',
        width: '80%',
        marginTop: 60,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center'
    }
});
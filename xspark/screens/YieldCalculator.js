import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function YieldCalculator({ navigation }) {
    const [area, setArea] = useState('');
    const [density, setDensity] = useState('');
    const [efficiency, setEfficiency] = useState('');
    const [yieldProduction, setYieldProduction] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeUnit, setActiveUnit] = useState('Sq m');

    const calculateYieldProduction = () => {
        const areaValue = parseFloat(area);
        const densityValue = parseFloat(density);
        const efficiencyValue = parseFloat(efficiency);

        if (!isNaN(areaValue) && !isNaN(densityValue) && !isNaN(efficiencyValue)) {
            if (efficiencyValue < 0 || efficiencyValue > 1) {
                setYieldProduction(null);
                setErrorMessage('Harvest Efficiency must be between 0 and 1');
            } else {
                const result = areaValue * densityValue * efficiencyValue;
                setYieldProduction(result.toFixed(2));
                setErrorMessage('');
            }
        } else {
            setYieldProduction(null);
            setErrorMessage('Please enter valid values for all fields');
        }
    };

    return (
        <View style={styles.container}>     
            <Text style={styles.header}>Yield Calculator</Text>
            <View style={styles.input}>
            <View style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginBottom: 15
                }}>
            <TextInput
                placeholder="Farm Area (square meters)"
                keyboardType="numeric"
                value={area}
                onChangeText={text => setArea(text)}
            />
            </View>
            <View style={{
                    backgroundColor: '#4682b4',
                    height: 65,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                      }}>
                        <Text style={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            marginLeft: 18,
                            marginBottom: 10,
                            marginTop: 3
                            
                        }}>
                            Plot Size: 
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent:'space-evenly'
                        }}>
                        <Button 
                            title='Sq m' 
                            color={activeUnit === 'Sq m' ? '#ffa500' : 'black'} 
                            onPress={() => setActiveUnit('Sq m')} 
                        />
                        <Button 
                            title='Arce' 
                            color={activeUnit === 'Arce' ? '#ffa500' : 'black'} 
                            onPress={() => setActiveUnit('Arce')} 
                        />
                        <Button 
                            title='Hector'
                            color={activeUnit === 'Hector' ? '#ffa500' : 'black'} 
                            onPress={() => setActiveUnit('Hector')} 
                        />
                        <Button 
                            title='Gunta' 
                            color={activeUnit === 'Gunta' ? '#ffa500' : 'black'} 
                            onPress={() => setActiveUnit('Gunta')} 
                        />
                        </View>
            </View></View>
            <View style={styles.input}>
                <View style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginBottom: 15
                }}>
                    <TextInput
                     placeholder="Enter the value"
                     keyboardType="numeric"
                     value={density}
                     onChangeText={text => setDensity(text)}
                      />
                </View>
                <View style={{
                    backgroundColor: '#4682b4',
                    height: 65,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                      }}>
                        <Text style={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            marginLeft: 18,
                            marginBottom: 10,
                            marginTop: 3
                        }}>
                            Planting Density:(no. of plants per unit sq)
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent:'space-evenly'
                        }}>
                        <Button 
                            title='Sq m' 
                            color={activeUnit === 'Sq m' ? '#ffa500' : 'black'} 
                            onPress={() => setActiveUnit('Sq m')} 
                        />
                        <Button 
                            title='Arce' 
                            color={activeUnit === 'Arce' ? '#ffa500' : 'black'} 
                            onPress={() => setActiveUnit('Arce')} 
                        />
                        <Button 
                            title='Hector'
                            color={activeUnit === 'Hector' ? '#ffa500' : 'black'} 
                            onPress={() => setActiveUnit('Hector')} 
                        />
                        <Button 
                            title='Gunta' 
                            color={activeUnit === 'Gunta' ? '#ffa500' : 'black'} 
                            onPress={() => setActiveUnit('Gunta')} 
                        />
                        </View>
                </View>
            </View>
            <View style={styles.input}>
            <View style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginBottom: 15
                }}>
            <TextInput
                placeholder="Harvest Efficiency (0-1)"
                keyboardType="numeric"
                value={efficiency}
                onChangeText={text => setEfficiency(text)}
            />
            </View>
            <View style={{
                    backgroundColor: '#4682b4',
                    height: 65,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                      }}>
                        <Text style={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            marginLeft: 18,
                            marginBottom: 10,
                            marginTop: 3
                        }}>
                            Harvesting Efficiency: 
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent:'space-around'
                        }}>
                        <Button 
                            title='Set' 
                            color= '#ffa500' 
                        />
                        <Button 
                            title='Edit' 
                            color= '#000000'
                        />
                        </View>
            </View>
            </View>
            <Button
                title="Calculate Yield Production"
                onPress={calculateYieldProduction}
                color="#696969" // White button text color
            />
            {yieldProduction !== null && (
                <Text style={styles.result}>Yield production: {yieldProduction}</Text>
            )}
            {errorMessage !== '' && (
                <Text style={styles.error}>{errorMessage}</Text>
            )}
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
    },
    input: {
        width: '90%',
        height: 120,
        marginBottom: 30,
        borderColor: '#d3d3d3',
        borderWidth: 2,
        borderRadius: 7,
        backgroundColor: '#f5f5f5', // White input fields
        fontSize: 16,
    },
    button: {
        width: '90%',
        height: 50,
        backgroundColor: '#f57c00', // Orange button
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15,
    },
    buttonText: {
        color: '#ffffff', // White button text
        fontSize: 18,
        fontWeight: 'bold',
    },
    result: {
        marginTop: 25,
        fontSize: 20,
        color: '#4caf50', // Green result text
        fontWeight: 'bold',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#212121', // Dark gray header text
        marginBottom: 30,
    },
    error: {
        color: 'red',
        fontStyle: 'italic',
        marginTop: 5,
    },
    button2: {
        borderRadius: '10',
        color: '#000000'
    }
});

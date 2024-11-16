import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Button, ImageBackground, handleSubmit, ScrollView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';
import Background from "./Background";
import axios from 'axios';
import { ReqIP } from '@env';


export default function Signup({ navigation }) {
    const [userType, setUserType] = useState();
    const [registerData, setRegisterData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    });


    const [isOpen, setIsOpen] = useState(false);

    const items = [
        { label: 'Farmer', value: 'Farmer' },
        { label: 'Trader', value: 'Trader' },
    ]

    function handleInputChange(key, value) {
        setRegisterData({
            ...registerData,
            [key]: value
        })
    }

    async function handleSubmit() {
        console.log(registerData, userType);
        let response = await axios.post(`http://${ReqIP}:8080/api/auth/signup`, { registerData, userType: userType });
        console.log(response);
        navigation.navigate("Login");
    }

    return (
        <ScrollView>
            <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#000000", fontSize: 36, fontWeight: '400', marginTop: 60 }}>Sign Up</Text>
                <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', backgroundColor: "transparent", width: '90%', height: '90%', alignItems: 'center' }}>
                    <Text style={{ color: 'grey', fontSize: 15, fontWeight: 'bold', marginBottom: 10, }}> Create your account</Text>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full Name"
                            value={registerData.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter 12 Digit Aadhar No."
                        // value={registerData.name}
                        /*onChangeText={(text) => handleInputChange('name', text)*/
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter KCC No."
                        // value={registerData.name}
                        /*onChangeText={(text) => handleInputChange('name', text)*/
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Mobile No."
                        // value={registerData.name}
                        /*onChangeText={(text) => handleInputChange('name', text)*/
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter OTP"
                        // value={registerData.name}
                        /*onChangeText={(text) => handleInputChange('name', text)*/
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={registerData.username}
                            onChangeText={(text) => handleInputChange('username', text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={registerData.password}
                            onChangeText={(text) => handleInputChange('password', text)}
                            secureTextEntry />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={registerData.confirmPassword}
                            onChangeText={(text) => handleInputChange('confirmPassword', text)}
                            secureTextEntry />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            value={registerData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                        <View style={{ padding: 5, }}>
                            <DropDownPicker
                                items={items}
                                open={isOpen}
                                setOpen={() => setIsOpen(!isOpen)}
                                value={userType}
                                setValue={(val) => setUserType(val)}
                                maxHeight={200}
                                autoScroll
                                placeholder="Select State"
                                placeholderStyle={{ fontWeight: '300', fontSize: 15 }}
                                showTickIcon={true}
                                showArrowIcon={true}
                                dropDownDirection="TOP"
                                theme='LIGHT'
                            />
                        </View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                            <Text style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={{ color: "#7CAA1A", fontWeight: 'bold', fontSize: 14, textDecorationLine: 'underline' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Change to 'flex-start'
        alignItems: 'center',
    },
    input: {
        height: 54,
        width: 300,
        borderBottomWidth: 1,
        borderColor: 'black', // Border color
        color: 'black', // Text color
        paddingHorizontal: 5,
        fontSize: 16,
        fontWeight: '600'
    },
    button: {
        marginTop: 20,
        backgroundColor: '#7CAA1A', // Button background color
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 189,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // Button text color
        fontSize: 16,
    },
});

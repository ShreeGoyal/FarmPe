import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Button, ImageBackground } from "react-native";
import React, { useState } from 'react';
import axios from "axios";
import { ReqIP } from '@env';
import Background from "./Background";
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {

    const [authData, setAuthData] = useState({
        username: "",
        password: ""
    });

    const handleAuthInputChange = (key, value) => {
        setAuthData({
            ...authData,
            [key]: value
        });
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://${ReqIP}:8080/api/auth/login`, {
                username: authData.username,
                password: authData.password
            });

            if (response.status === 200) {
                await AsyncStorage.setItem('user', JSON.stringify(response.data.userData));
                navigation.navigate("Home");
                Alert.alert('Success', 'Logged in successfully');
            } else {
                Alert.alert('Error', 'Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while logging in');
        }
    };

    return (
        <Background>
            <View style={{ alignItems: "center", marginTop: "90%"}}>
                <Text style={{ color: "#000000", fontSize: 36, fontWeight: '400'}}>Login</Text>
                <View style={{display:'flex',justifyContent: 'center', alignContent:'center', backgroundColor: "transparent"}}>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={authData.username}
                            onChangeText={(text) => handleAuthInputChange('username', text)} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={authData.password}
                            onChangeText={(text) => handleAuthInputChange('password', text)}
                            secureTextEntry />
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                            <Text style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <Text style={{ color: "#38761D", fontWeight: 'bold', fontSize: 14, textDecorationLine: 'underline',}}> Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Change to 'flex-start'
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'black', // Border color
        color: 'black', // Text color
        marginTop: 10,
        marginBottom: 18,
        paddingHorizontal: 5,
        fontSize: 13,
        fontWeight: '600'
    },
    button: {
        marginTop: 50,
        backgroundColor: '#38761D', // Button background color
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 270,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // Button text color
        fontSize: 18,
    },
});

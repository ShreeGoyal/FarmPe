import { Button } from "react-native"
import { Text, View } from "react-native-animatable"
import Welcome from "../components/welcome/Welcome"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen({ navigation }) {
    const [user, setUser] = useState({});

    const getUser = async () => {
        try {
            const retrievedUser = await AsyncStorage.getItem('user');
            console.log(retrievedUser)
            if (retrievedUser !== null) {
                setTimeout(()=>{navigation.navigate("Home")}, 1500);
                setUser(JSON.parse(retrievedUser));
            } else {
                console.log("You're not logged in");
                setUser(false);
                setTimeout(()=>{navigation.navigate("Login")}, 1500);
            }
        } catch (error) {
            console.log(error);
            setUser(false);
        }
    };


    useEffect(() => {
        getUser();
    }, []);
    
    // console.log(user);
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log(user);
    //         console.log(user.name);
    //         navigation.navigate(!user.name ? "Login" : "Home");
    //     }, 1500);
    // }, []);

    return (
        <Welcome navigation={navigation} />
    )
}
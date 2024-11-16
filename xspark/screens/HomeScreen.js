import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReqIP } from '@env';
import Navbar from '../components/navbar/Navbar.js';
import Home from '../components/home/Home.js';
import { addPost, deleteAllPost } from '../features/post/postSlice.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser } from '../features/auth/userSlice.js';
import { Alert } from 'react-native';
import { deleteUser } from '../features/auth/userSlice.js';


export default function HomeScreen({ route, navigation }) {
    const dispatch = useDispatch();
    const refresh = true;

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        dispatch(deleteAllPost());
        await getData();
        setRefreshing(false);
    }, []);

    const logout = async () => {
        try {
            console.log("Logout Button Clicked");
            const response = await axios.get(`http://${ReqIP}:8080/api/auth/logout`);
            if (response.status === 200) {
                await AsyncStorage.removeItem('user');
                console.log("Item Deleted");
            }
        } catch (e) {
            console.log("Error while Logging out");
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <View>
                        <TouchableOpacity onPress={logout}><Text>Logout</Text></TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../components/home/assets/logo.png')} // Update the path to your image
                                style={{ height: wp(12), width: wp(12) }}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }, [])

    async function getData() {
        try {
            console.log(ReqIP);
            let data = await axios.get(`http://${ReqIP}:8080/home`);
            let postData = data.data;
            postData.map((post) => (dispatch(addPost(post))));
        } catch (e) {
            console.log(e);
        }
    }


    const getUser = async () => {
        try {
            const retrievedUser = await AsyncStorage.getItem('user');
            console.log(retrievedUser)
            if (retrievedUser !== null) {
                dispatch(addUser(JSON.parse(retrievedUser)));
            } else {
                Alert.alert('Error', 'Item not found.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to retrieve item.');
        }
    };

    useEffect(() => {
        dispatch(deleteAllPost());
        getData();
        getUser();
    }, [])

    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View styles={styles.component}>
                    <Home navigation={navigation} />
                    {<StatusBar style="auto" />}
                </View>
            </ScrollView>
            <Navbar navigation={navigation} />
        </>
    )
}

const styles = StyleSheet.create({
    component: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});
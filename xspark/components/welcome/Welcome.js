import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Background from './Background';
import { darkGreen } from './Constants';
import Btn from './Btn.js';


export default function Welcome({ navigation }) {
  return (
    <Background>
      <View style={styles.container}>
        {/* <Btn bgColor={darkGreen} textColor={'white'} btnLabel="Login" Press={() => navigation.navigate("Login")} />
      <Btn bgColor={'white'} textColor={darkGreen} btnLabel="Sign Up" Press={() => navigation.navigate("Signup")} /> */}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#355D24'
  },
  title: {
    marginTop: 40,
    color: darkGreen,
    fontSize: 35,
    fontWeight: '900',
    marginBottom: 20,
  },
  subtitle: {
    color: '#6F4E37',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 350,
  },
});

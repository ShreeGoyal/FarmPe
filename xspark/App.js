import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Image, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { View, Text, StyleSheet } from 'react-native';
import KrishiRX from './screens/KrishiRX.js';
import KrishiRXResult from './screens/KrishiRXResult.js';
import FertlizerCalculator from './screens/FertilizerCalculator.js';
import YieldCalculator from './screens/YieldCalculator.js';

export default function App() {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const retrievedUser = await AsyncStorage.getItem('user');
      console.log(retrievedUser)
      if (retrievedUser !== null) {
        setUser(JSON.parse(retrievedUser));
      } else {
        console.log("You're not logged in");
        setUser(false);
      }
    } catch (error) {
      console.log(error);
      setUser(false);
    }
  };


  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name='Welcome'
            component={WelcomeScreen}
            options={{ title: 'Welcome', headerShown: false }} />

          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ title: 'Login', headerShown: false }} />

          <Stack.Screen
            name='Signup'
            component={SignupScreen}
            screenOptions={{ headerShown: false }}
            options={{ title: 'Sign up', headerShown: false }} />
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            initialParams={getUser}
            options={{
              title: 'FarmPe', header: (props) =>
              (
                <View style={{ height: 150, paddingTop: 35, backgroundColor: '#5f8314' }}>
                  <View style={styles.upper}>
                    <View style={styles.left}>
                      <Image style={{ marginLeft: '5%', backgroundColor: 'white', padding: 5, borderRadius: 50 }} resizeMode='contain' source={require('./components/welcome/assets/image 128.png')}></Image>
                      <Image style={styles.logo} resizeMode='contain' source={require('./components/welcome/assets/WelcomeLogo.png')}></Image>
                    </View>
                    <View style={styles.right}>
                      <Image style={{ marginRight: '8%' }} resizeMode='contain' source={require('./components/welcome/assets/ph2.png')}></Image>
                      <Image style={{ marginRight: '10%' }} resizeMode='contain' source={require('./components/welcome/assets/sh1.png')}></Image>
                    </View>
                  </View>
                  <View style={styles.down}>
                    <View style={styles.downLogo}>
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <MagnifyingGlassIcon size={20} strokeWidth={3} color={'grey'} marginTop={4} marginRight={3} />
                        <TextInput style={styles.input} placeholder="Search" />
                      </View>
                      <Image style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }} resizeMode='contain' source={require('./components/welcome/assets/mic4.png')}></Image>
                    </View>
                  </View>
                </View>
              ),
            }} />

          <Stack.Screen
            name='KrishiRX'
            component={KrishiRX}
            options={{ title: 'KrishiRX' }} />
          <Stack.Screen
            name='KrishiRXResult'
            component={KrishiRXResult}
            options={{ title: 'Disease Information' }} />
          <Stack.Screen
            name='FertilizerCalculator'
            component={FertlizerCalculator}
            options={{ title: 'Fertilizer Calculator' }} />
          <Stack.Screen
            name='YieldCalculator'
            component={YieldCalculator}
            options={{ title: 'Yield Calculator' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  upper: {
    height: '45%',
    display: 'flex',
    flexDirection: 'row'
  },
  down: {
    marginTop: '2%',
    height: '45%'
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  right: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: '50%',
    height: '100%',
    marginLeft: '3%'
  },
  // input: {
  //   backgroundColor: 'white',
  //   width: '96%',
  //   height: '80%',
  //   margin: '2%',
  //   borderRadius: 10,
  //   padding: 5
  // },
  downLogo: {
    backgroundColor: 'white',
    width: '96%',
    height: '80%',
    margin: '2%',
    borderRadius: 10,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})

import React from 'react';
import { View, ImageBackground, StyleSheet} from 'react-native';

const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground style={styles.imageBackground} resizeMode='contain' source={require("./assets/FarmerWelcome.png")} />
      <ImageBackground style={styles.imageBackground1} resizeMode='contain' source={require("./assets/WelcomeLogo.png")} />
      <View>
        {children}
      </View>
    </View>
  );
};

const styles= StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '60%',
    backgroundColor: '#355D24'
  },
  imageBackground1:{
    width: '100%',
    height: '40%',
    marginBottom: '50%',
    backgroundColor: '#355D24'
  }
})

export default Background;

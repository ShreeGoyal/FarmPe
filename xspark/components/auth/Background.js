import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

const background = ({children}) => {
  return (
    <View>
      <ImageBackground style={styles.imageBackground} resizeMode='contain' source={require("./Lassests/LoginAsset.jpeg")}/>
      <ImageBackground style={styles.imageBackground2} resizeMode='contain' source={require("./Lassests/LoginAsset2.jpeg")}/>
      <View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground:{
    width:"100%",
    height: "100%",
    position: 'absolute',
    top: '-40%',
    left: '-90%',
    transform: [{rotate: '45deg'}, {scale: 2}]
  },
  imageBackground2:{
    width:"100%",
    height: "100%",
    position: 'absolute',
    top: '-49%',
    left: '',
    transform: [{rotate: '45deg'}],
    zIndex: -1
  }
});

export default background;
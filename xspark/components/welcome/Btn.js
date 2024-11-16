import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Btn({ bgColor, textColor, btnLabel, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 10,
        alignItems: 'center',
        width: 250,
        paddingVertical: 5,
        marginVertical: 15,
        width: wp('80%'),
      }}
    >
      <Text style={{ color: textColor, fontWeight: '400', fontSize: 21 }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}

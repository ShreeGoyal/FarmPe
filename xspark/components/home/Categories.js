import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { categoriesData } from './constants/index.js';

export default function Categories() {
  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: "#f97316" }}>Categories</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: wp(4), color: "#f97316" }}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={{ marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {categoriesData.map((cat, index) => (
          <TouchableOpacity key={index} style={{ flex: 1, alignItems: 'center', marginVertical: 2 }}>
            <Image source={cat.image} style={{ width: wp(19), height: wp(19), borderRadius: 10 }} />
            <Text style={{ fontSize: wp(3), color: '#f97316', fontWeight: 'bold' }}>{cat.title}</Text>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

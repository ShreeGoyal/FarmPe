import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { sortCategoriesData } from './constants/index.js';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from './theme/';
export default function SortCategories() {
  const [activeSort, setActiveSort] = useState('Popular');

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 4, backgroundColor: '#e5e5e5', borderRadius: 20, padding: 2, paddingHorizontal: 2, overflow: 'hidden', flexWrap: 'nowrap' }}>
      {
        sortCategoriesData.map((sort, index) => {
          let isActive = sort === activeSort;
          let activeButtonClass = isActive ? 'bg-white shadow' : '';  // Corrected the typo in the class name
          return (
            <TouchableOpacity onPress={() => setActiveSort(sort)} key={index} style={{ padding: 8, paddingHorizontal: 12, borderRadius: 999, flex: 1, alignItems: 'center', ...styles[activeButtonClass] }}>
              <Text style={{ fontSize: wp(4), color: isActive ? theme.text : 'rgba(0,0,0,0.6)', fontWeight: isActive ? 'bold' : 'normal' }}>{sort}</Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
}

const styles = {
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
};

// Replace `theme` with your actual theme object


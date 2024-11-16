import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, SafeAreaView, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ReqIP } from '@env';
import { Ionicons } from '@expo/vector-icons';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from './Categories';
import SortCategories from './sortCategories';
import { deletePost } from "../../features/post/postSlice";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);
  const [search, setSearch] = useState("");
  const [isLedger, setIsLedger] = useState('none');
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    setSearch(value);
    try {
      if (search.length > 3) {
        let res = await axios.get(`http://${ReqIP}:8080/home/search/${value}`);
        console.log(res.data.searchedData);
        setSearchData(res.data.searchedData);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const showLedger = () => {
    console.log(isLedger);
    if (isLedger === 'flex') {
      setIsLedger('none');
    } else {
      setIsLedger('flex');
    }
  }

  const card = (p, id, src) => {
    return (
      <TouchableWithoutFeedback key={id} onPress={() => navigation.navigate('ShowPost', { data: p, image: src })}>
        <View key={id} style={styles.card}>
          {/* <Text style={styles.title}>{p.owner.name}</Text> */}
          <Image source={{ uri: src }} style={styles.image} />
          <Text style={styles.title}>{p.title}</Text>
          <Text style={styles.description}>{p.description}</Text>
          <Text style={styles.countryLocation}>{p.country}, {p.location}</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.price}>Rs. {p.price}</Text>
            <Text style={styles.price}>Required Amount: {p.amountRequired}Kg</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
        <View >
          <View style={styles.upper}>
            <TouchableOpacity style={styles.purchase}><Text>Purchase</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sell}><Text>Sell</Text></TouchableOpacity>
          </View>
          <View style={styles.middle}>
            <TouchableOpacity style={styles.received}><Text style={{ fontWeight: '600', padding: 15 }}>Received</Text></TouchableOpacity>
            <TouchableOpacity style={styles.pending}><Text style={{ fontWeight: '600', padding: 15 }}>Pending</Text></TouchableOpacity>
            <TouchableOpacity style={styles.total}><Text style={{ fontWeight: '600', padding: 15 }}>Total</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={showLedger} style={styles.lower}><Text style={{ color: 'white', fontWeight: '600' }}>View Ledger</Text></TouchableOpacity>
          <View style={{ display: isLedger }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 20 }}>Today Sales</Text>
              <Text style={{ fontSize: 20, fontWeight: '500', marginRight: 20 }}>₹0.00</Text></View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20, fontWeight: '400', marginLeft: 20, backgroundColor: '#EE5454', padding: 10, borderRadius: 15, color: 'white' }}>₹  Have To Give</Text>
              <Text style={{ fontSize: 20, fontWeight: '400', marginRight: 20, backgroundColor: '#489158', padding: 10, borderRadius: 15, color: 'white' }}>₹  Have To Take</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ borderWidth: 0.5, borderRadius: 10, width: '22%', height: 70, marginBottom: 2, marginTop: 10 }}>
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Ionicons name="cash-outline" size={24} color="black" />
                  <Text>CASH</Text>
                  <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Text>Rs 0.00</Text>
                  </View>
                </View>
              </View>
              <View style={{ borderWidth: 0.5, borderRadius: 10, width: '22%', height: 70, marginBottom: 2, marginTop: 10 }}>
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Image style={{marginTop: 8}} resizeMode='contain' source={require('../welcome/assets/p0.png')}></Image>
                  <Text>ONLINE</Text>
                  <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Text>Rs 0.00</Text>
                  </View>
                </View>
              </View>
              <View style={{ borderWidth: 0.5, borderRadius: 10, width: '22%', height: 70, marginBottom: 2, marginTop: 10 }}>
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Image style={{marginTop: 6}} resizeMode='contain' source={require('../welcome/assets/p1.png')}></Image>
                  <Text>CHEQUE</Text>
                  <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Text>Rs 0.00</Text>
                  </View>
              </View>
              </View>
              <View style={{ borderWidth: 0.5, borderRadius: 10, width: '22%', height: 70, marginBottom: 2, marginTop: 10 }}>
              <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Image style={{marginTop: 8}} resizeMode='contain' source={require('../welcome/assets/p2.png')}></Image>
                  <Text>LOAN</Text>
                  <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Text>Rs 0.00</Text>
                  </View>
              </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center' }}><Image resizeMode='contain' source={require('../welcome/assets/n.png')}></Image></View>
      <ScrollView style={{
        marginBottom: 50
      }}>
        <View style={styles.outerCard}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <View style={styles.left}>
              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text>My crops</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '13%', height: '20%', justifyContent: 'space-around' }}>
                <View>
                  <Image resizeMode='contain' source={require('../welcome/assets/i1.png')}></Image>
                  <Text>Wheat</Text>
                </View>
                <View>
                  <Image resizeMode='contain' source={require('../welcome/assets/i2.png')}></Image>
                  <Text>Maize</Text>
                </View>
                <View>
                  <Image resizeMode='contain' source={require('../welcome/assets/i3.png')}></Image>
                  <Text>Carrot</Text>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '15%', height: '20%', justifyContent: 'space-evenly' }}>
                <View>
                  <Image resizeMode='contain' source={require('../welcome/assets/i4.png')}></Image>
                  <Text>Peas</Text>
                </View>
                <View>
                  <Image resizeMode='contain' source={require('../welcome/assets/i5.png')}></Image>
                  <Text>Tomato</Text>
                </View>
                <View>
                  <Image style={{ marginTop: '6' }} resizeMode='contain' source={require('../welcome/assets/i6.png')}></Image>
                  <Text>Add</Text>
                </View>
              </View>
            </View>
            <View style={styles.right}>
              <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center" }}>
                <Image style={{ width: '100%', borderTopLeftRadius: 15, borderTopRightRadius: 15, marginBottom: '3%' }} resizeMode='cover' source={require('../welcome/assets/i7.png')} />
                <Text>Rabi and Zaid season</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <View>
                  <Image resizeMode='cover' source={require('../welcome/assets/i8.png')} />
                  <Text>Weather</Text>
                </View>
                <View>
                  <Image resizeMode='cover' source={require('../welcome/assets/i9.png')} />
                  <Text>MSP</Text>
                </View>
                <View>
                  <Image resizeMode='cover' source={require('../welcome/assets/image 12.png')} />
                  <Text>Krishi</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.outerDownCard}>
            <TouchableOpacity onPress={() => { navigation.navigate("FertilizerCalculator") }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 5, marginTop: '5%' }}>
              <Image resizeMode='cover' source={require('../welcome/assets/image 124.png')} />
              <Text>Fertlizer Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5, alignItems: 'center', marginTop: '5%' }}>
              <Image resizeMode='cover' source={require('../welcome/assets/image 16.png')} />
              <Text>Krishi Mudra</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5, alignItems: 'center', marginTop: '5%' }}>
              <Image resizeMode='cover' source={require('../welcome/assets/image 12.png')} />
              <Text>Krishi Pali</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("YieldCalculator") }} style={{ marginLeft: 5, alignItems: 'center', marginTop: '5%' }}>
              <Image resizeMode='cover' source={require('../welcome/assets/Rectangle 4377.png')} />
              <Text>Yield Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("YieldCalculator") }} style={{ marginLeft: 5, alignItems: 'center', marginTop: '5%' }}>
              <Image resizeMode='cover' source={require('../welcome/assets/Rectangle 4377.png')} />
              <Text>Plot Planner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5, alignItems: 'center', marginTop: '5%' }}>
              <Image resizeMode='cover' source={require('../welcome/assets/image 19.png')} />
              <Text>Crop Protection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5, alignItems: 'center', marginTop: '5%' }}>
              <Image resizeMode='cover' source={require('../welcome/assets/Rectangle 4383.png')} />
              <Text>Crop Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5, alignItems: 'center', marginTop: '5%' }}>
              <Image resizeMode='cover' source={require('../welcome/assets/Rectangle 4384.png')} />
              <Text>Livestock</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 5, alignItems: 'center', marginTop: '5%' }}>
              <Image resizeMode='cover' source={require('../welcome/assets/Rectangle 4379.png')} />
              <Text>Expert Talk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerCard: {
    marginHorizontal: 5,
    marginTop: 15
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '400'
  },
  countryLocation: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  deleteButtonText: {
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  upper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  middle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 10
  },
  lower: {
    backgroundColor: '#1B1B78',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10
  },
  received: {
    width: '30%',
    backgroundColor: 'rgba(237, 168, 118, 0.52)',
    borderRadius: 10
  },
  pending: {
    width: '30%',
    backgroundColor: '#F1CBCB',
    borderRadius: 10
  },
  total: {
    width: '30%',
    backgroundColor: '#BAE8C7',
    borderRadius: 10
  },
  purchase: {
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15
  },
  sell: {
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15
  },
  left: {
    borderWidth: 0.5,
    width: '45%',
    height: 132,
    borderRadius: 15,
  },
  right: {
    borderWidth: 0.5,
    width: '45%',
    height: 132,
    borderRadius: 15

  },
  outerDownCard: {
    borderWidth: 0.5,
    marginTop: 15,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  }
});
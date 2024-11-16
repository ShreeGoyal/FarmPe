import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
export default function Navbar({ navigation }) {
    const user = useSelector((state) => state.user.user);
    console.log(user);

    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={{
                marginTop: 10,
                paddingTop: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} onPress={() => navigation.navigate("Home")}>
                <Image resizeMode='contain' source={require('../welcome/assets/hom.png')}></Image>
                <Text>Home</Text>
            </TouchableOpacity>
            <View>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("KrishiRX")
                }} style={{alignItems: 'center'}}>
                    <Image resizeMode='contain' source={require('../welcome/assets/n2.png')}></Image>
                    <Text>Krishi Rx</Text>
                </TouchableOpacity>
            </View>
            {/* {user.userType === "Trader" ? <View><TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
                <AntDesign name="pluscircleo" size={24} color="black" />
                <Text>Post</Text>   
            </TouchableOpacity></View> : <View></View>} */}
            <View>
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <Image resizeMode='contain' source={require('../welcome/assets/image 12.png')}></Image>
                    <Text>Krish Pali</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                    <Image resizeMode='contain' source={require('../welcome/assets/ew.png')}></Image>
                    <Text>Bazaar</Text>
                </TouchableOpacity>
            </View>
            <View ><TouchableOpacity>
                <Image resizeMode='contain' source={require('../welcome/assets/ba.png')}></Image>
                <Text>Store</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flex: 0,
        position: 'absolute',
        display: 'flex',
        bottom: 0,
        height: 50,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 2,
        borderWidth: 0.2,
    }
});
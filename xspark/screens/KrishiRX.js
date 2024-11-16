import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../components/navbar/Navbar';

export default function KrishiRX({ navigation }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            console.log(image);
        }
    };
    return (
        <View style={styles.container}>
            {!image && <View><Text>Upload Photo to detect the Disease</Text>
                <Button title="Upload the photo" onPress={pickImage} /></View>}
            {image && <View>
                <Image resizeMode='cover' source={{ uri: image }} style={styles.image} />
                <Text style={{ fontWeight: '600', fontSize: 30 }}>Healthy Crop!</Text>
                <Text style={{ fontWeight: '600', fontSize: 15, color: 'green' }}>Healthy Leaves</Text>
                <Text style={{ fontWeight: '500', fontSize: 15, backgroundColor: '#E8E8E8', marginTop: 30, margin: '5%', width: '90%', borderRadius: 10 }}>Hurray!! it’s a healthy crop.
                    No disease or pest detected. The image you have uploaded is visually appealing and economically beneficial, We suggest for making it more attractive, you may consult our doctor free consultation.
                    Happy Farming!!!!!</Text>
                <TouchableOpacity style={{ backgroundColor: '#EE9510', marginLeft: 40, marginRight: 40, alignItems: 'center', paddingTop: 10, paddingBottom: 10, borderRadius: 50 }}>
                    <Text style={{fontWeight: 600}}>Know More</Text>
                </TouchableOpacity>
            </View>}
            <Navbar navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
    },
});
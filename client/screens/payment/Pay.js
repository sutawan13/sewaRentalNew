import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    TextInput,
    Image
} from 'react-native';

export default class Pay extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={{ uri: 'https://i.ibb.co/55dtDTK/undraw-order-confirmed-aaw7.png' }}
                    style={{ height: 200, width: 200 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'blue' }}>Sewa Berhasil</Text>
                <Text style={{ fontSize: 15 }}>Silahkan cek notifikasi untuk melihat detail</Text>
                <Text style={{ fontSize: 15 }}>barang yang disewa</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Home')} style={{ top: 20, justifyContent: 'center', alignItems: 'center', width: 100, height: 50, backgroundColor: 'blue', borderRadius: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Home</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


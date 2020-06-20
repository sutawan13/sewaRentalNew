import React, { Component } from 'react'
import {
  Text, View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  Animated,
  params,
  Alert,
  AppRegistry,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { MaterialCommunityIcons, AntDesign, Ionicons, FontAwesome, Feather } from 'react-native-vector-icons';
import { default as NumberFormat } from 'react-number-format';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');
export default class SubKategori extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      dataProduct: []
    }
  }

  componentDidMount() {
    const { data } = this.props.navigation.state.params
    const { title } = this.props.navigation.state.params


    const newData = data.filter(item => item.subkategori === title)
    this.setState({ dataProduct: newData })


    console.log('data newData', newData)
    // console.log('title product', title)
    // console.log('data product', data)
  }

  render() {
    const { dataProduct } = this.state

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Image
            source={{ uri: 'https://i.ibb.co/BHkP0rj/bg-edit.png' }}
            style={styles.imageBanner}
          />
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 10, top: 30, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50 }}>
            <Feather
              name="arrow-left" size={24} color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} style={{ position: 'absolute', right: 20, top: 30, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50 }}>
            <Feather
              name="shopping-cart" size={24} color={'white'}
            />
          </TouchableOpacity>
          <View style={styles.wrapper}>
            <Feather name="search" size={24} color={'white'} style={{ marginTop: 13, left: 10 }} />
            <TextInput
              style={{ flex: 1, marginLeft: 15, backgroundColor: 'white', borderBottomRightRadius: 15, borderTopRightRadius: 15 }}
              underlineColorAndroid="transparent"
              placeholder="Cari sesuai keinginan mu"
              placeholderStyle={{ left: 10 }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              clearButtonMode="always"
              clearTextOnFocus
            />
          </View>
          <ScrollView style={{ marginTop: 10 }}>


            {/* ini batas nya ?? ow batas code hehe */}
            {dataProduct.length > 0 ? dataProduct.map((item, index) => {
              return (

                <TouchableOpacity>
                  <View style={styles.card}>
                    <Image
                      source={{ uri: item.gambarBarang }}
                      style={{ height: 80, width: 85, borderRadius: 20, resizeMode: 'stretch', right: 20, top: 20 }}
                    />
                    <Text style={{ left: 70, top: -40, fontWeight: 'bold', fontSize: 17 }}>{item.namaBarang}</Text>
                    <NumberFormat
                      value={item.harga}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                      renderText={(value) => (
                        <Text
                          style={{
                            left: 70, top: -40, fontWeight: 'bold', fontSize: 17, color: 'green'
                          }}
                        >
                          {value}/Hari
                        </Text>
                      )}
                    />
                  </View>
                </TouchableOpacity>
              )
            }) : <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 15, fontWeight: 'bold' }}>Data Belum Tersedia</Text></View>}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
  imageBanner: {
    width: width,
    height: 160
  },
  wrapper: {
    marginHorizontal: 18,
    height: 50,
    marginTop: -25,
    backgroundColor: 'blue',
    elevation: 4,
    borderRadius: 15,
    flexDirection: 'row',
  },
  card: {
    height: 120,
    width: '80%',
    marginLeft: 40,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#efefef',
    borderRadius: 25,
  }
});

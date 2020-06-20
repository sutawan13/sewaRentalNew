import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Keyboard,
    Button,
    Image,
    Animated,
    Easing,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import Slider from 'react-native-slider';
import { LinearGradient } from 'expo-linear-gradient';
import {
    MaterialCommunityIcons,
    AntDesign,
    Ionicons,
    FontAwesome,
    Feather,
} from 'react-native-vector-icons';
import { default as NumberFormat } from 'react-number-format';
import * as Animatable from 'react-native-animatable';
import ToggleButton from './ToggleButton';
import ToggleButtonColor from './ToogleButtonColor';
import axios from 'axios';
import { apiUrl } from '../../config';

import Modal, { SlideAnimation, ScaleAnimation, ModalFooter, ModalButton, ModalContent, ModalTitle } from 'react-native-modals';

const { height, width } = Dimensions.get('window');
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Value: 1,
            text: '',
            searchBarFocused: false,
            opendModal: '',
            bounceValue: new Animated.Value(5000),
            searchModal: new Animated.Value(-5000),
            blackBackOpcity: new Animated.Value(-5000),
            product: [],
            productFilter: [],
            bottomModalAndTitle: false,
            bottomModal: false,
        };
        this.animatedValue = new Animated.Value(0);
    }

    updateChoice(type) {
        let newState = { ...this.state };
        newState[type] = !newState[type];
        this.setState(newState);
    }
    _openModal() {
        Animated.sequence([
            Animated.timing(this.state.blackBackOpcity, {
                toValue: 0,
                velocity: 3,
                tension: 2,
                friction: 8,
                duration: 300,
            }).start(),
            Animated.timing(this.state.bounceValue, {
                toValue: 0,
                velocity: 3,
                tension: 2,
                friction: 8,
            }).start(),
        ]);

        this.setState({ opendModal: 'filter' });
    }
    _hideModal() {
        Animated.sequence([
            Animated.timing(this.state.blackBackOpcity, {
                toValue: -height,
                velocity: 3,
                tension: 2,
                friction: 8,
                duration: 300,
            }).start(),
            Animated.timing(this.state.bounceValue, {
                toValue: height,
                velocity: 3,
                tension: 2,
                friction: 8,
            }).start(),
        ]);

        this.setState({ opendModal: '' });
    }
    _handelClose() {
        //console.log(this.state.opendModal)
        if (this.state.opendModal == 'search') {
            this._closeModalSearch();
        }
        // }else if(this.state.opendModal == 'filter'){
        // 	this._hideModal()
        // }
    }
    componentDidMount() {
        this.animatedValue.setValue(0);
        // apply scroll to top animation to search card
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
        }).start();
    }

    getData = () => {
        axios
            .get(`${apiUrl}/api/product`)
            .then((res) => {
                // console.log('respon data', res.data);
                this.setState({
                    product: res.data,
                    productFilter: res.data,
                });
            })
            .catch((err) => console.log('err', err));
    };

    // onSubmitSearch = value => {
    // 	const {dataFilter} = this.state;
    // 	const newDataFilter = dataFilter.filter(
    // 	  item => item.title.toUpperCase().indexOf(value.toUpperCase()) > -1,
    // 	);
    // 	this.setState({
    // 	  data: newDataFilter,
    // 	  text: value,
    // 	});
    //   };

    handleSearch = (text) => {
        const { productFilter } = this.state;
        const dataFilter = productFilter.filter((item) => {
            const itemData =
                item.namaBarang.toUpperCase() + item.kategori.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
            // const nama = item.namaBarang.toUpperCase
            // item.namaBarang.toUpperCase().indexOf(text.toUpperCase()) > -1
        });
        this.setState({
            product: dataFilter,
            text,
        });
    };

    componentDidMount() {
        this.getData();
    }

    submitAndClear = () => {
        this.props.writeText(this.state.text);

        this.setState({
            text: '',
        });
    };

    handleOpenModal = () => {
        this.setState({ bottomModalAndTitle: true })

    }

    render() {
        const marginTop = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [260, 0],
        });
        const { bottomModalAndTitle } = this.state
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        height: 90,
                        backgroundColor: 'blue',
                        justifyContent: 'center',
                        paddingHorizontal: 5,
                    }}
                >
                    <Animatable.View
                        animation="slideInRight"
                        duration={800}
                        style={{
                            right: 30,
                            borderRadius: 10,
                            height: 50,
                            width: '80%',
                            backgroundColor: 'white',
                            marginTop: 30,
                            alignItems: 'center',
                            padding: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <Animatable.View
                            animation={
                                this.state.searchBarFocused
                                    ? 'fadeInLeft'
                                    : 'fadeInRight'
                            }
                        >
                            <Feather
                                name={
                                    this.state.searchBarFocused
                                        ? 'arrow-left'
                                        : 'search'
                                }
                                size={24}
                                color={'grey'}
                            />
                        </Animatable.View>
                        <TextInput
                            style={{ fontSize: 15, marginLeft: 15, flex: 1 }}
                            underlineColorAndroid="transparent"
                            placeholder="Cari Produk"
                            autoFocus={true}
                            selectionColor={'blue'}
                            onChangeText={(text) => this.handleSearch(text)}
                            value={this.state.text}
                            clearButtonMode="always"
                            clearTextOnFocus
                        />
                    </Animatable.View>
                    <TouchableOpacity
                        onPress={() => {
                            this.handleOpenModal();
                        }}
                        style={{
                            position: 'absolute',
                            right: 15,
                            top: 35,
                            width: 45,
                            height: 45,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: 10,
                            borderRadius: 50,
                        }}
                    >
                        <Feather name="filter" size={24} color={'white'} />
                    </TouchableOpacity>
                </View>

                <Modal.BottomModal
                    visible={this.state.bottomModalAndTitle}
                    onTouchOutside={() => this.setState({ bottomModalAndTitle: false })}
                    height={0.5}
                    width={1}
                    onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
                    modalTitle={
                        <ModalTitle
                            title="Filter"
                            hasTitleBar
                        />
                    }
                >
                    <ModalContent
                        style={{
                            flex: 1,
                            backgroundColor: 'fff',
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontSize: 15,
                                        marginLeft: 5,
                                        marginTop: 10,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Kategori
                            </Text>
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    style={{ marginTop: 10 }}
                                >
                                    <ToggleButton
                                        label="Kendaraan"
                                        onPress={() => {
                                            this.updateChoice('sports');
                                        }}
                                        selected={this.state.sports}
                                    />
                                    <ToggleButton
                                        label="Pakaian"
                                        onPress={() => {
                                            this.updateChoice('exclusive');
                                        }}
                                        selected={this.state.exclusive}
                                    />
                                    <ToggleButton
                                        label="Sarana"
                                        onPress={() => {
                                            this.updateChoice('suv');
                                        }}
                                        selected={this.state.suv}
                                    />
                                    <ToggleButton
                                        label="Elektronik"
                                        onPress={() => {
                                            this.updateChoice('suv');
                                        }}
                                        selected={this.state.suv}
                                    />
                                </ScrollView>
                                <View>
                                    <Text
                                        style={{
                                            color: '#000',
                                            fontSize: 15,
                                            marginTop: 10,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Sub Kategori
                            </Text>
                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        style={{ marginTop: 10 }}
                                    >
                                        <ToggleButton
                                            label="Motor"
                                            onPress={() => {
                                                this.updateChoice('bmw');
                                            }}
                                            selected={this.state.bmw}
                                        />
                                        <ToggleButton
                                            label="Gedung"
                                            onPress={() => {
                                                this.updateChoice('chevy');
                                            }}
                                            selected={this.state.chevy}
                                        />
                                        <ToggleButton
                                            label="Jas"
                                            onPress={() => {
                                                this.updateChoice('lexus');
                                            }}
                                            selected={this.state.lexus}
                                        />
                                        <ToggleButton
                                            label="Laptop"
                                            onPress={() => {
                                                this.updateChoice('bmw');
                                            }}
                                            selected={this.state.bmw}
                                        />
                                    </ScrollView>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#000',
                                            fontSize: 15,
                                            marginTop: 10,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Kisaran Harga
                            </Text>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Slider
                                            style={{ marginBottom: 20 }}
                                            minimumValue={1}
                                            maximumValue={100}
                                            step={1}
                                            customMinimumTrack={
                                                <LinearGradient
                                                    start={{ x: 0.74, y: 0.26 }}
                                                    end={{ x: 0, y: 0.77 }}
                                                    colors={['#343333', '#BFBFBF']}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                />
                                            }
                                            customMaximumTrack={
                                                <LinearGradient
                                                    start={{ x: 0.74, y: 0.26 }}
                                                    end={{ x: 0, y: 0.77 }}
                                                    colors={['#343333', '#BFBFBF']}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                />
                                            }
                                            customThumb={
                                                <LinearGradient
                                                    start={{ x: 0.74, y: 0.26 }}
                                                    end={{ x: 0, y: 0.77 }}
                                                    colors={['#333333', '#333333']}
                                                    style={{
                                                        width: 36,
                                                        height: 36,
                                                        margin: 2,
                                                        borderRadius: 36 / 2,
                                                        borderWidth: 4,
                                                        borderColor: '#fff',
                                                        elevation: 1,
                                                    }}
                                                />
                                            }
                                            value={this.state.value}
                                            onValueChange={(value) =>
                                                this.setState({ value })
                                            }
                                        />
                                        <Text>Harga: Rp.{this.state.value}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._hideModal();
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            borderRadius: 7,
                                            width: '50%',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 14,
                                                color: 'red',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Ulang
                                </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ bottomModalAndTitle: false })}
                                        style={{
                                            backgroundColor: 'blue',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            borderRadius: 7,
                                            width: '40%',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 14,
                                                color: '#ffffff',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Submit
                                </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text></Text>
                            </View>
                        </View>
                    </ModalContent>
                </Modal.BottomModal>

                <ScrollView style={{ flex: 1 }}>
                    {this.state.text === '' ? null : this.state.product.length > 0 ?
                        this.state.product.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'Detail',
                                            { ...item },
                                        )
                                    }
                                    style={{
                                        flex: 1,
                                        marginHorizontal: 10,
                                        marginTop: 5,
                                        padding: 5
                                    }}
                                >
                                    <View style={styles.card}>
                                        <Image
                                            source={{ uri: item.gambarBarang }}
                                            style={{ height: 80, width: 85, borderRadius: 20, resizeMode: 'stretch', right: 20, top: 20 }}
                                        />
                                        <Text style={{ left: 70, top: -40, fontWeight: 'bold', fontSize: 15 }}>{item.namaBarang}</Text>
                                        <NumberFormat
                                            value={item.harga}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'Rp.'}
                                            renderText={(value) => (
                                                <Text
                                                    style={{
                                                        left: 70, top: -40, fontWeight: 'bold', fontSize: 15, color: 'green'
                                                    }}
                                                >
                                                    {value}/Hari
                                                </Text>
                                            )}
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        }) :
                        <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, marginVertical: 120 }}>
                            <Image source={{ uri: 'https://i.ibb.co/ZhbXS9g/undraw-file-searching-duff.png' }} style={{ height: 200, width: 200 }} />
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'red' }}>Oops! :(</Text>
                            <Text style={{ fontSize: 15 }}>barang yang anda cari tidak tersedia</Text>
                        </View>}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        right: 70,
        top: 25,
        borderRadius: 10,
        height: 50,
        width: '65%',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    card: {
        height: 120,
        width: '85%',
        marginLeft: 40,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: '#efefef',
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentView: {
        paddingLeft: 18,
        paddingRight: 18,
    },
    navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
    },
    navigationTitle: {
        padding: 10,
    },
    navigationButton: {
        padding: 10,
    },
    navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
    },
    navigator: {
        flex: 1,
        // backgroundColor: '#000000',
    },
    customBackgroundModal: {
        opacity: 0.5,
        backgroundColor: '#000',
    },
});

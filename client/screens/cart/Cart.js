import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image,
    StatusBar,
    Dimensions,
    ScrollView,
    RefreshControl,
    TouchableWithoutFeedback,
    Platform,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-ranges';
import NumericInput from 'react-native-numeric-input';
import { CheckBox } from 'react-native-elements';
import { default as NumberFormat } from 'react-number-format';
import GradientHeader from 'expo-gradient-header';
import TouchableScale from 'react-native-touchable-scale';
import { Footer } from 'native-base';
import { connect } from 'react-redux';
import { apiUrl } from '../../config';
import axios from 'axios';
import { getCurrentProfileData } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';
import Toast from 'react-native-tiny-toast';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const formatNumber = (num) =>
    `Rp.${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

import { scale, verticalScale } from 'react-native-size-matters';
import { greaterThan } from 'react-native-reanimated';

class Cart extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Order',
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
    });

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            total: 0,
            checked: false,
            check: false,
            showToast: false,
            modalVisible: false,
            allowPointerEvents: true,
            showContent: false,
            selected: '',
            startDate: null,
            endDate: null,
            date: new Date(),
            focus: 'startDate',
            currentDate: moment(),
            sewaItem: [],
            refreshing: false,
            ceklisSemua: 0,
            isLoading: false,
        };
    }

    MakeTotal = (amount) => {
        total = amount;
    };

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getData();
        this.setState({ refreshing: false });
        if (Platform.OS === 'android') {
            Toast.show(`data berhasil di update`, Toast.SHORT);
        } else {
            if (Platform.OS === 'ios') {
                Toast.show('data berhasil di update', Toast.SHORT);
            }
        }
    };

    checkBoxtest() {
        const { sewaItem, check } = this.state;
        if (check) {
            this.setState({
                check: !this.state.check,
                ceklisSemua: 0,
            });
        } else {
            this.setState({
                check: !this.state.check,
                ceklisSemua: sewaItem.length,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            const dataFilter = nextProps.profile.profile.sewaItem.filter(
                (item) => item.statusPemesanan === 'Belum dikonfirmasi',
            );
            this.setState({
                sewaItem: dataFilter,
            });

        }
    }

    componentWillMount() {
        // const id = this.props.auth.user._id;
        // this.props.getCurrentProfileData(id);
        // this.getDataUser();
        this.getData();
    }

    // getDataUser = () => {
    //     const { profile } = this.props.profile;
    //     this.setState({
    //         sewaItem: profile.sewaItem,
    //     });
    // };

    getData = () => {
        const id = this.props.auth.user._id;
        axios
            .get(`${apiUrl}/api/user/${id}`)
            .then((res) => {
                const dataFilter = res.data.sewaItem.filter(
                    (item) => item.statusPemesanan === 'Belum dikonfirmasi',
                );
                this.setState({
                    sewaItem: dataFilter,
                });
            })
            .catch((err) => console.log('error get by id', err));
    };

    handleDelete = (item) => {
        const id = this.props.auth.user._id;
        const idDelete = item._id;
        axios
            .delete(`${apiUrl}/api/sewaitem/${idDelete}`)
            .then((res) => {
                console.log('ini respon delete', res.data);
                this.getData();
                this.getDataUser();
                this.props.getCurrentProfileData(id);
                if (Platform.OS === 'android') {
                    ToastAndroid.show(
                        `berhasil hapus ${item.product.namaBarang}`,
                        ToastAndroid.SHORT,
                    );
                } else {
                    AlertIOS.alert(`Berhasil hapus ${item.namaBarang}`);
                }
            })
            .catch((err) => console.log('error get by id', err));
    };

    onSubmitLanjut = () => {
        const { sewaItem } = this.state;

        const idSewa = [];
        const idProduct = [];
        for (let i = 0; i < sewaItem.length; i++) {
            idSewa.push(sewaItem[i]._id);
            idProduct.push(sewaItem[i].product._id);
        }



        axios
            .post(`${apiUrl}/api/sewaitem/status`, {
                statusPemesanan: 'sudah dikonfirmasi',
                sewa_id: idSewa,
            })
            .then((res) => {
                console.log('sukses update status', res.data);
                this.setState({
                    check: true,
                });
                this.props.navigation.navigate('Pay');
                this.getData();
            })
            .catch((err) => {
                console.log('error update status', err);
            });
        this.setState({
            check: false,
        });
    };

    render() {
        // const { ...rest } = this.props;

        const { profile } = this.props.profile;
        const { sewaItem, check, ceklisSemua } = this.state;
        // console.log('data sewa', sewaItem);
        // console.log('endDate', endDate);
        const tombolLanjut = check === false ? 'grey' : 'blue';
        const tombolDisable = check === false ? true : false;
        //console.log('sewa item', sewaItem);
        const jumlah = [];

        for (let i = 0; i < sewaItem.length; i++) {
            jumlah.push(sewaItem[i].total);
        }

        const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;

        const total = jumlah !== [] ? jumlah.reduce(reducer, 0) : 0;

        return (
            <View
                style={{ flex: 1, backgroundColor: 'rgba(232, 232, 232, 1)' }}
            >
                <StatusBar barStyle="light-content" />
                <View style={{ flex: 1 }}>
                    <CheckBox
                        title={`Pilih Semua (${ceklisSemua}/${sewaItem.length})`}
                        checkedColor="blue"
                        uncheckedColor="blue"
                        checked={this.state.check}
                        textStyle={{ color: 'blue' }}
                        containerStyle={{
                            width: 200,
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderColor: 'rgba(0,0,0,0)',
                        }}
                        onPress={() => this.checkBoxtest()}
                    />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        {sewaItem.length !== 0 ? (
                            sewaItem.map((item, index) => {
                                return (
                                    <View >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: 'white',
                                                alignItems: 'center',
                                                marginBottom: 10,
                                                justifyContent: 'space-around',
                                            }}
                                        >
                                            <CheckBox
                                                checkedColor="blue"
                                                uncheckedColor="blue"
                                                checked={this.state.check}
                                                textStyle={{ color: 'blue' }}
                                                containerStyle={{
                                                    width: 200,
                                                    backgroundColor:
                                                        'transparent',
                                                    borderColor: 'transparent',
                                                }}
                                                onPress={() =>
                                                    this.checkBoxtest()
                                                }
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: 50,
                                                    height: verticalScale(30),
                                                }}
                                                onPress={() =>
                                                    this.handleDelete(item)
                                                }
                                            >
                                                <Image
                                                    source={{
                                                        uri:
                                                            'https://i.imgur.com/GBQkcxc.png',
                                                    }}
                                                    style={{
                                                        width: 15,
                                                        height: 20,
                                                        resizeMode: 'stretch',
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        <View
                                            style={{
                                                top: -20,
                                                shadowColor: '#000',
                                                shadowOpacity: 0.16,
                                                elevation: 1,
                                                shadowRadius: 4,
                                                shadowOffset: {
                                                    height: 2,
                                                    width: 2,
                                                },
                                                backgroundColor: '#fff',
                                                justifyContent: 'center',
                                                width: screenWidth,

                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    width: screenWidth
                                                }}
                                            >
                                                <Image
                                                    source={{
                                                        uri:
                                                            item.product
                                                                .gambarBarang,
                                                    }}
                                                    borderRadius={23}
                                                    style={{
                                                        borderRadius: 15,
                                                        width: verticalScale(
                                                            98,
                                                        ),
                                                        height: verticalScale(
                                                            98,
                                                        ),
                                                        marginLeft: 10,
                                                        alignSelf: 'center',
                                                        resizeMode: 'stretch',
                                                    }}
                                                />
                                                <View
                                                    style={{
                                                        alignItems:
                                                            'flex-start',
                                                        padding: 5,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            marginLeft: 10,
                                                        }}
                                                    >
                                                        <Text
                                                            numberOfLines={1} ellipsizeMode="tail"
                                                            style={{
                                                                height: verticalScale(
                                                                    20,
                                                                ),
                                                                color:
                                                                    '#404852',
                                                                width: 190,
                                                                fontSize: scale(
                                                                    14,
                                                                ),
                                                                fontWeight:
                                                                    '700',
                                                                letterSpacing: -0.36,
                                                                top: 10,
                                                            }}
                                                        >
                                                            {
                                                                item.product
                                                                    .namaBarang
                                                            }
                                                        </Text>
                                                        <View style={{ flexDirection: 'row', top: 10 }}>
                                                            <Text style={{ flex: 1, fontWeight: '700' }}>Harga :</Text>
                                                            <Text
                                                                numberOfLines={2} ellipsizeMode="tail"
                                                                style={{
                                                                    flex: 1,
                                                                    height: verticalScale(
                                                                        22,
                                                                    ),
                                                                    color: 'green',
                                                                    fontWeight:
                                                                        'bold',
                                                                    letterSpacing: -0.29,
                                                                    lineHeight: verticalScale(
                                                                        22,
                                                                    ),
                                                                }}
                                                            >
                                                                {formatNumber(
                                                                    item.product
                                                                        .harga,
                                                                )}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: 10,
                                                            marginTop: 10,
                                                            flexDirection:
                                                                'row',
                                                            justifyContent:
                                                                'space-around',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{ flex: 1, fontWeight: '700' }}
                                                        >
                                                            Peminjaman
                                                        </Text>
                                                        <Text
                                                            style={{ flex: 1, fontWeight: '700' }}
                                                        >
                                                            Pengembalian
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: 10,
                                                            marginTop: 10,
                                                            flexDirection:
                                                                'row',
                                                            justifyContent:
                                                                'space-around',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{ flex: 1 }}
                                                        >
                                                            {moment(
                                                                item.tanggalAwal,
                                                            ).format(
                                                                'DD MMM YYYY',
                                                            )}
                                                        </Text>
                                                        <Text
                                                            style={{ flex: 1 }}
                                                        >
                                                            {moment(
                                                                item.tanggalAkhir,
                                                            ).format(
                                                                'DD MMM YYYY',
                                                            )}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: 10,
                                                            marginTop: 10,
                                                            flexDirection:
                                                                'row',
                                                            justifyContent:
                                                                'space-around',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{ flex: 1, fontWeight: '700' }}
                                                        >
                                                            Durasi :
                                                        </Text>
                                                        <Text
                                                            style={{ flex: 1 }}
                                                        >
                                                            {item.jumlahHari}{' '}
                                                            Hari
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: 10,
                                                            marginVertical: 10,
                                                            flexDirection:
                                                                'row',
                                                            justifyContent:
                                                                'space-around',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{ flex: 1, fontWeight: '700' }}
                                                        >
                                                            Jumlah :
                                                        </Text>
                                                        <Text
                                                            numberOfLines={1} ellipsizeMode="tail"
                                                            style={{ flex: 1, color: 'green' }}
                                                        >
                                                            {formatNumber(
                                                                item.total,
                                                            )}
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            marginLeft: 10,
                                                            marginVertical: 10,
                                                            flexDirection:
                                                                'row',
                                                            justifyContent:
                                                                'space-around',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{ flex: 1 }}
                                                        >
                                                            STATUS :
                                                        </Text>
                                                        <Text
                                                            style={{ fontWeight: '700', flex: 1, width: screenWidth }}
                                                        >
                                                            {
                                                                item.statusPemesanan
                                                            }
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })
                        ) : (
                                <View style={{ flex: 1 }}>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            flex: 1,
                                            marginTop: '40%',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri:
                                                    'https://i.imgur.com/FSXpkHU.png',
                                            }}
                                            style={{
                                                ...Platform.select({
                                                    ios: {
                                                        width: 190,
                                                        height: 190,
                                                        resizeMode: 'stretch',
                                                        alignSelf: 'center',
                                                    },
                                                    android: {
                                                        width: 200,
                                                        height: 200,
                                                        resizeMode: 'stretch',
                                                        alignSelf: 'center',
                                                    },
                                                }),
                                            }}
                                        />
                                        <Text
                                            style={{
                                                ...Platform.select({
                                                    ios: {
                                                        marginTop: 5,
                                                        fontWeight: 'bold',
                                                        textAlign: 'center',
                                                    },
                                                    android: {
                                                        marginTop: 5,
                                                        fontWeight: 'bold',
                                                        textAlign: 'center',
                                                    },
                                                }),
                                            }}
                                        >
                                            Wah{' '}
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'blue',
                                                    textAlign: 'center',
                                                }}
                                            >{`${profile.nama}`}</Text>{' '}
                                        Belum Order Ya?
                                    </Text>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Yuk Order Sekarang!
                                    </Text>
                                    </View>
                                </View>
                            )}
                    </ScrollView>
                </View>

                {/* subtotal */}
                <View style={styles.footer}>
                    <View style={{ marginTop: 10, paddingLeft: 15 }}>
                        <Text
                            style={{
                                paddingBottom: 5,
                                color: '#95a5a6',
                                fontSize: 11,
                            }}
                        >
                            SUBTOTAL ({sewaItem.length} Item)
                        </Text>
                        <NumberFormat
                            value={total}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'Rp.'}
                            renderText={(value) => (
                                <Text
                                    style={{
                                        color: '#000',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        paddingBottom: 5,
                                    }}
                                >
                                    {value}
                                </Text>
                            )}
                        />

                        <Text
                            style={{
                                paddingBottom: 5,
                                color: '#95a5a6',
                                fontSize: 11,
                            }}
                        >
                            Belum termasuk biaya pengiriman
                        </Text>
                    </View>
                    <View style={{ paddingLeft: 70 }}>
                        <TouchableOpacity
                            onPress={this.onSubmitLanjut}
                            disabled={tombolDisable}
                        >
                            <View
                                style={{
                                    width: 80,
                                    height: 40,
                                    backgroundColor: tombolLanjut,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
                                    Submit
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

Cart.propTypes = {
    getCurrentProfileData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfileData })(Cart);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        flexDirection: 'row',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5,
        overflow: 'hidden',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    datePickerBox: {
        marginTop: 9,
        borderColor: '#000',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    anda: {
        flex: 1,
        paddingLeft: 70,
        marginTop: 130,
    },
    backgroundImage: {
        width: 220,
        height: 220,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingLeft: 100,
    },
    Textt: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 48,
    },
    Views: {
        paddingLeft: 10,
        marginTop: -100,
    },
    ket: {
        marginTop: 20,
        fontSize: 14,
    },
    footer: {
        // position: 'absolute',
        // flex: 0.1,
        // left: 0,
        // right: 0,
        // bottom: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        borderTopColor: '#95a5a6',
        borderTopWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    content: {
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    card: {
        flex: 1,
        borderTopWidth: 10,
        borderColor: '#eee',
        backgroundColor: 'white'

    },
});

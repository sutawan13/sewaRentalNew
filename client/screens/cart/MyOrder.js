import React, { Component } from 'react'
import { apiUrl } from '../../config'
import CustomModal from '../notifikasi/CustomModal'
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
    Vibration,
} from 'react-native';
import Toast from 'react-native-tiny-toast';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios'
import Modal, { ScaleAnimation, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';

const formatNumber = (num) =>
    `Rp.${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

class MyOrder extends Component {

    constructor() {
        super()
        this.state = {
            profile: {},
            showModal: false,
            product: {},
            expoPushToken: '',
        }
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile) {

            this.setState({
                profile: nextProps.profile.profile
            });

        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        const { profile } = this.props.profile;
        axios
            .get(`${apiUrl}/api/user/${profile._id}`)
            .then((res) => {

                this.setState({
                    profile: res.data,
                });
            })
            .catch((err) => console.log('error get by id', err));
    };


    handleReturn = () => {
        const { product } = this.state
        // console.log('id', product._id)
        const idProduct = [product._id]

        // efek tengah malam,... :vw

        axios
            .post(`${apiUrl}/api/sewaitem/return`, {
                statusPemesanan: 'sudah dikembalikan',
                sewa_id: idProduct,
            })
            .then((res) => {
                console.log('sukses return item', res.data);
                this.setState({ showModal: false })
                this.getData();
                Toast.show('sukses mengembalikan barang')
            })
            .catch((err) => {
                console.log('error return item', err);
                Toast.show('terjadi kesalahan')
                this.setState({ showModal: false })
            });


    }

    handleOpenModal = () => {
        this.setState({ showModal: true })

    }

    render() {
        const { profile, showModal, product } = this.state
        const newItem = profile.sewaItem !== undefined && profile.sewaItem
            .filter(item => item.statusPemesanan === 'sudah dikonfirmasi')
        const { handleOpenModal } = this


        return (
            <ScrollView>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle={'light-content'}
                />

                <Modal
                    visible={showModal}
                    width={0.9}
                    overlayOpacity={0.7}
                    rounded
                    useNativeDriver
                    actionsBordered
                    swipeDirection={['down', 'up']}
                    modalAnimation={new ScaleAnimation()}
                    onSwipeOut={() => this.setState({ showModal: false })}
                    onTouchOutside={() => this.setState({ showModal: false })}
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="Ya"
                                onPress={this.handleReturn}
                            />
                            <ModalButton
                                text="Tidak"
                                onPress={() => this.setState({ showModal: false })}
                            />
                        </ModalFooter>
                    }
                >
                    <ModalContent>
                        <View >
                            <Text>Anda yakin ingin mengembalikan barang?</Text>
                        </View>
                    </ModalContent>
                </Modal>




                {newItem.length > 0 ? newItem.map((item, index) => {

                    return (
                        <TouchableOpacity
                            // onPress ={this.handleReturn(item)}
                            onPress={() => this.setState({ showModal: true, product: item })}
                            key={index}
                            style={styles.card}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={{
                                        uri: item.product.gambarBarang,
                                    }}
                                    style={{ width: 100, height: 90 }}
                                />
                                <View style={{ paddingLeft: 20 }}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={{
                                            paddingBottom: 8,
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                        }}
                                    >
                                        {item.product.namaBarang}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingBottom: 8,
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Peminjaman
                                                </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                {moment(
                                                    item.tanggalAwal,
                                                ).format('DD MMM YY')}
                                            </Text>
                                        </View>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Pengembalian
                                                </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                {moment(
                                                    item.tanggalAkhir,
                                                ).format('DD MMM YY')}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingBottom: 8,
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Durasi Sewa
                                                </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                {item.jumlahHari} Hari
                                                </Text>
                                        </View>
                                        <View style={{ paddingLeft: 5 }}>
                                            <Text
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Biaya Sewa
                        </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                {formatNumber(
                                                    item.product.harga,
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, right: 50 }}>Status : </Text>
                                    <View
                                        style={{
                                            padding: 5,
                                            top: -20,
                                            borderRadius: 5,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderWidth: 0.8,
                                            width: 150,
                                            borderColor:
                                                item.statusPemesanan ===
                                                    'Belum dikonfirmasi'
                                                    ? 'blue'
                                                    : 'green',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                color:
                                                    item.statusPemesanan ===
                                                        'Belum dikonfirmasi'
                                                        ? 'blue'
                                                        : 'green',
                                            }}
                                        >
                                            {item.statusPemesanan}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                    );
                }) :
                    (
                        <View
                            style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                marginTop: 190,
                            }}
                        >
                            <Image source={{ uri: 'https://i.imgur.com/FSXpkHU.png' }} style={{ height: 200, width: 200, resizeMode: 'stretch' }} />
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red', fontSize: 20 }}>Oops, :(</Text>
                            <Text style={{ textAlign: 'center', color: 'black', fontSize: 15 }}>Order kamu kosong</Text>
                        </View>
                    )}
            </ScrollView>
        );
    }

    editProfile = () => {
        this.props.navigation.navigate('EditProfile');
    };
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps)(MyOrder);

const styles = StyleSheet.create({
    Text: {
        fontSize: 15,
        paddingLeft: 10,
        alignContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        padding: 8,
        height: 160,
        borderRadius: 4,
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
});


import React, { Component, Fragment } from 'react';
import { Ionicons } from '@expo/vector-icons';
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
  Dimensions
} from 'react-native';
import Toast from 'react-native-tiny-toast';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios'
import { apiUrl } from '../../config'
import CustomModal from './CustomModal';
import Modal, { ScaleAnimation, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
const formatNumber = (num) =>
  `Rp.${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

const { width } = Dimensions.get('window')

class Notifikasi extends Component {
  static navigationOptions = {
    title: 'Notifikasi',
    headerStyle: {
      backgroundColor: 'blue',
    },
    //   headerBackground: (
    //   <LinearGradient
    //     style={{flex: 1}}
    //     colors={['#00d2ff', '#3a7bd5']}
    //     start={{x: 0, y: 0}}
    //     end={{x: 1, y: 0}}
    //   />
    // ),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

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

  // registerForPushNotificationsAsync = async () => {
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = await Notifications.getExpoPushTokenAsync();
  //     console.log(token);
  //     this.setState({ profile: token });
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.createChannelAndroidAsync('default', {
  //       name: 'default',
  //       sound: true,
  //       priority: 'max',
  //       vibrate: [0, 250, 250, 250],
  //     });
  //   }

  //   if (Platform.OS === 'ios') {
  //     Notifications.createChannelIosAsync('default', {
  //       name: 'default',
  //       sound: true,
  //       priority: 'max',
  //       vibrate: [0, 250, 250, 250],
  //     });
  //   }
  // };

  // componentDidMount() {
  //   this.registerForPushNotificationsAsync();

  //   // Handle notifications that are received or selected while the app
  //   // is open. If the app was closed and then opened by tapping the
  //   // notification (rather than just tapping the app icon to open it),
  //   // this function will fire on the next tick after the app starts
  //   // with the notification data.
  //   this._notificationSubscription = Notifications.addListener(this._handleNotification);
  // }

  // _handleNotification = product => {
  //   Vibration.vibrate();
  //   console.log(product);
  //   this.setState({ product: product });
  // };

  // // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  // sendPushNotification = async () => {
  //   const message = {
  //     to: this.state.profile,
  //     sound: 'default',
  //     title: 'Original Title',
  //     body: 'And here is the body!',
  //     data: { data: 'goes here' },
  //     _displayInForeground: true,
  //   };
  //   const response = await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  // };

  handleReturn = () => {
    const { product } = this.state
    // console.log('id', product._id)
    const idProduct = [product._id]
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
    const { handleOpenModal } = this


    return (
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'light-content'}
        />
        {profile.sewaItem !== undefined && profile.sewaItem.length > 0 ? (
          profile.sewaItem.map((item, index) => {
            return (
              <View
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
                          ).format('DD MMM YYYY')}
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
                          ).format('DD MMM YYYY')}
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
                    <Text style={{ fontWeight: 'bold', fontSize: 13, right: 60 }}>Status : </Text>
                    <View
                      style={{
                        padding: 5,
                        top: -20,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 0.8,
                        width: 180,
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
              </View>

            );
          })
        ) : (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 210,
              }}
            >
              <Image source={{ uri: 'https://i.imgur.com/FSXpkHU.png' }} style={{ height: 200, width: 200, resizeMode: 'stretch' }} />
              <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'red', fontSize: 20 }}>Oops, :(</Text>
              <Text style={{ textAlign: 'center', color: 'black', fontSize: 15 }}>belum ada pesanan</Text>
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

export default connect(mapStateToProps)(Notifikasi);

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
    width: width,
    borderRadius: 4,
    marginVertical: 5,
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

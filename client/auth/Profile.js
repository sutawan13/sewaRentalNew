import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableWithoutFeedback, Alert, StyleSheet, Image, StatusBar, Button, Platform, RefreshControl, Dimensions, SafeAreaView, Animated, TouchableOpacity } from 'react-native';
import Modal, { ScaleAnimation, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import { Icon, ListItem, Avatar } from "react-native-elements";
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import Toast from 'react-native-tiny-toast';
import { Appbar } from 'react-native-paper';
import { Separator, Content } from 'native-base'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import TouchableScale from 'react-native-touchable-scale';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authAction';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-swipeable';

const { height, width } = Dimensions.get('window');

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      email: [],
      imageProfile: null,
      leftActionActivated: false,
      toggle: false,
      showModal: false,
      show: false,
      currentlyOpenSwipeable: null,
      isfetched: false,
      refreshing: false,
      isLoading: true,
      isVisible: false,
      scrollY: new Animated.Value(0),
      modalHapus: false,
    }
  }

  componentWillMount() {
    setTimeout(() => this.setState({ isfetched: true }), 8000);
  }

  onLogoutClick = () => {
    this.props.logoutUser();
    this.props.navigation.navigate('Login');
    this.setState({ show: false })
  };

  handleOpen = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  render() {

    const { profile } = this.props.profile;
    const { handleOpenModal } = this
    const { isfetched } = this.state;
    randomNumber = Math.floor(Math.random() * 7)
    const { currentlyOpenSwipeable } = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({ currentlyOpenSwipeable: swipeable });
      },
      onClose: () => this.setState({ currentlyOpenSwipeable: null })
    };
    const marginTopAnimated = this.state.scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [100, 0],
      extrapolate: "clamp"
    });

    return (
      <SafeAreaView style={styles.container}>
        <SCLAlert
          theme={null}
          headerIconComponent={
            <Image source={{ uri: 'https://i.ibb.co/H2px6nr/logout-01.png' }}
              style={{ height: 150, width: 160, resizeMode: 'stretch' }}
            />
          }

          slideAnimationDuration={1000}
          cancellable={false}
          titleStyle={{ fontWeight: 'bold' }}
          show={this.state.show}
          title="Keluar"
          subtitle="Anda yakin ingin keluar?"
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <SCLAlertButton containerStyle={{ width: 100, height: 50, backgroundColor: 'blue' }} theme="info" onPress={this.onLogoutClick}>Ya</SCLAlertButton>
            <SCLAlertButton containerStyle={{ width: 100, height: 50 }} theme="default" onPress={this.handleClose}>Tidak</SCLAlertButton>
          </View>
        </SCLAlert>
        <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
        <Image
          source={{ uri: 'https://i.imgur.com/KCZtjQPg.png' }}
          style={{ width: width + 30, height: 350, resizeMode: 'stretch', position: 'absolute' }}
        />
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>

        </Appbar.Header>
        <ShimmerPlaceHolder autoRun={true} visible={isfetched} duration={2000} style={{ borderRadius: 50, width: 80, height: 80, left: 30 }}>
          <Avatar
            rounded
            size="large"
            containerStyle={{ left: 30, borderWidth: 1, borderColor: 'blue' }}
            source={{
              uri:
                'https://econtrolling.jatengprov.go.id/themes/images/user.png',
            }}
          />
        </ShimmerPlaceHolder>
        <Animated.ScrollView
          style={[
            styles.scrollView,
            {
              transform: [{ translateY: marginTopAnimated }]
            }
          ]}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.state.scrollY } }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          <View style={{ height: 650 }}>

            {/* Content 1 */}
            <ShimmerPlaceHolder autoRun={true} visible={isfetched} duration={2000} style={{ width: 100, height: 15, borderRadius: 10, left: '37%', marginTop: 10 }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Nama Lengkap</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{profile.nama}</Text>
              </View>
            </ShimmerPlaceHolder>

            {/* Content 2 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', alignItems: 'center', marginTop: 20 }}>
              <ShimmerPlaceHolder autoRun={true} visible={isfetched} duration={2000} style={{ width: 100, height: 15, borderRadius: 10 }}>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <Text style={{ color: 'grey', fontWeight: 'bold' }}>Email</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 13 }}>{profile.email}</Text>
                </View>
              </ShimmerPlaceHolder>

              <ShimmerPlaceHolder autoRun={true} visible={isfetched} duration={2000} style={{ width: 100, height: 15, borderRadius: 10 }}>
                <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text style={{ color: 'grey', fontWeight: 'bold' }}>Tanggal Lahir</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 13 }}>{profile.tgl_lahir}</Text>
                </View>
              </ShimmerPlaceHolder>
            </View>

            {/* Content 3 */}
            <ShimmerPlaceHolder autoRun={true} visible={isfetched} duration={2000} style={{ width: 100, height: 15, borderRadius: 10, left: '37%', marginTop: 10 }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Alamat</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{profile.alamat}</Text>
              </View>
            </ShimmerPlaceHolder>

            <View style={{ ...styles.separator, borderTopWidth: 8 }}>
              <Text style={styles.separatorTitle}>Kelola Profile & Akun Toko Mu</Text>
            </View>

            {/* Content 4 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditProfil')}
                style={{ height: 50, width: 100, backgroundColor: 'blue', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>Edit Profil</Text>
              </TouchableOpacity>
              <Text style={{
                ...Platform.select({
                  ios: {
                    fontSize: 30
                  },
                  android: {
                    fontWeight: 'bold',
                    fontSize: 30
                  }
                })
              }}> | </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MemberVip')}
                style={{ height: 50, width: 100, backgroundColor: 'blue', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>Akun Toko</Text>
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.separator, borderTopWidth: 8 }}>
              <Text style={styles.separatorTitle}>Informasi Aplikasi</Text>
            </View>

            {/* Content 5 */}
            <View>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate('Tentang')
                }
              >
                <ListItem
                  title="Tentang Kami"
                  containerStyle={styles.listItemContainer}
                  leftIcon={
                    <Icon
                      size={25}
                      name="information-outline"
                      type="material-community"
                      color="blue"
                    />
                  }
                  rightIcon={
                    <Icon
                      size={25}
                      name="ios-arrow-forward"
                      type="ionicon"
                      color="grey"
                    />
                  }
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate('Faq')
                }
              >
                <ListItem
                  title="FAQ"
                  containerStyle={styles.listItemContainer}
                  leftIcon={
                    <Icon
                      size={25}
                      name="questioncircleo"
                      type="antdesign"
                      color="blue"
                    />
                  }
                  rightIcon={
                    <Icon
                      size={25}
                      name="ios-arrow-forward"
                      type="ionicon"
                      color="grey"
                    />
                  }
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate('Privacy')
                }
              >
                <ListItem
                  title="Privacy Policy"
                  containerStyle={styles.listItemContainer}
                  leftIcon={
                    <Icon
                      size={25}
                      name="shield-outline"
                      type="material-community"
                      color="blue"
                    />
                  }
                  rightIcon={
                    <Icon
                      size={25}
                      name="ios-arrow-forward"
                      type="ionicon"
                      color="grey"
                    />
                  }
                />
              </TouchableWithoutFeedback>
              <ListItem
                title="Keluar"
                containerStyle={styles.listItemContainer}
                onPress={this.handleOpen}
                leftIcon={
                  <Icon
                    size={25}
                    name="logout"
                    type="simple-line-icon"
                    color="blue"
                  />
                }
                rightIcon={
                  <Icon
                    size={25}
                    name="ios-arrow-forward"
                    type="ionicon"
                    color="grey"
                  />
                }
              />
            </View>

          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    )
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
});

export default connect(mapStateToProps, { logoutUser })(Profile);


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: "#FFF",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%'
  },
  separator: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: width,
    height: 55,
    marginTop: 10,
    borderColor: '#eee'
  },
  separatorTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  listItemContainer: {
    height: 70,
    borderBottomWidth: 10,
    borderColor: '#eee',
  },
})


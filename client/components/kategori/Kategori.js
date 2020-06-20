import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image, StatusBar, Platform, RefreshControl, Dimensions, SafeAreaView, Animated } from 'react-native';
import { MaterialCommunityIcons, AntDesign, Ionicons, FontAwesome, Feather } from 'react-native-vector-icons';
import { withNavigation } from 'react-navigation';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import TouchableScale from 'react-native-touchable-scale';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from 'react-native-whc-loading';
import Swipeable from 'react-native-swipeable';
import { apiUrl } from '../../config';
import Axios from 'axios';

var { height, width } = Dimensions.get('window');

const menus = [
  {
    icon: { uri: 'https://i.ibb.co/vsw4ck4/camera.png' },
    title: 'Kamera',
    navigate: 'Kamera',
    params: ''
  },
  {
    icon: { uri: 'https://i.ibb.co/vkcTm6T/laptop.png' },
    title: 'Laptop',
    navigate: 'Laptop',
    params: ''
  },
  {
    icon: { uri: 'https://i.ibb.co/8gnjgDm/sepeda.png' },
    title: 'Sepeda',
    navigate: 'Sepeda',
    params: ''
  },
  {
    icon: { uri: 'https://i.ibb.co/y4HFMKb/jas.png' },
    title: 'Jas',
    navigate: 'Jas',
    params: ''
  },
  {
    icon: { uri: 'https://i.ibb.co/KK0hgmn/kebaya.png' },
    title: 'Kebaya',
    navigate: 'Kebaya',
    params: ''
  },
  {
    icon: { uri: 'https://i.ibb.co/0mbs75T/open-trunk-car-vehicle-transportation-120px.png' },
    title: 'Mobil',
    navigate: 'Mobil',
    params: ''
  },
  {
    icon: { uri: 'https://i.ibb.co/swQS7Y5/motor.png' },
    title: 'Motor',
    navigate: 'Motor',
    params: ''
  },
  {
    icon: { uri: 'https://i.ibb.co/swQS7Y5/motor.png' },
    title: 'PeralatanBayi',
    navigate: 'PeralatanBayi',
    params: ''
  },
]



class Kategori extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      leftActionActivated: false,
      toggle: false,
      currentlyOpenSwipeable: null,
      isfetched: false,
      refreshing: false,
      isLoading: true,
      isVisible: false,
      scrollY: new Animated.Value(0),
      menu: []
    }
  }

  componentDidMount() {
    // const {data} = this.props.navigation.state.params
    // console.log('ini params', this.props)

    this.getDataCAtegory()
    setTimeout(() => this.setState({ isfetched: true }), 8000);
  }

  getDataCAtegory = () => {

    const { title } = this.props.navigation.state.params

    // console.log('ini title', title)

    Axios.get(`${apiUrl}/api/kategori`)
      .then(res => {
        const dataKategori = res.data.filter(item => item.nama === title)

        this.setState({
          menu: dataKategori[0].subkategori
        })

      })
      .catch(err => console.log('error get data', err))

  }

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  render() {

    const { menu } = this.state
    const { data } = this.props.navigation.state.params


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
        <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
        <Image
          source={{ uri: 'https://i.imgur.com/BXeBIH1.png' }}
          style={{ width: width + 30, height: 430, resizeMode: 'stretch', position: 'absolute' }}
        />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 10, top: 30, backgroundColor: this.state.yAxis > 50 ? 'transparent' : 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50 }}>
          <Feather
            name="arrow-left" size={24} color={this.state.yAxis > 50 ? 'grey' : 'white'}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity style={{ position: 'absolute', right: 20, top: 30, backgroundColor: this.state.yAxis > 50 ? 'transparent' : 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 50 }}>
          <Feather
            name="filter" size={24} color={this.state.yAxis > 50 ? 'grey' : 'white'}
          />
        </TouchableOpacity> */}
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
          <View style={{ height: 1000 }}>
            {
              menu.map((item, index) =>
                <Swipeable
                  style={{ top: 40 }}
                  rightButtons={[
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.goBack()} style={[styles.rightSwipeItem, { backgroundColor: 'white' }]}>
                      <Ionicons
                        name="ios-information-circle" size={25} color='blue'
                      />
                    </TouchableOpacity>,
                    <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => this.props.navigation.navigate('SubKategori', { title: item.nama, data })} style={[styles.rightSwipeItem, { backgroundColor: 'blue' }]}>
                      <Ionicons
                        name="ios-arrow-forward" size={25} color='white'
                      />
                    </TouchableOpacity>
                  ]}>
                  <View style={[styles.listItem, { backgroundColor: 'transparent' }]}>
                    <Image
                      source={{ uri: item.icon }}
                      style={{ height: 35, width: 40, resizeMode: 'stretch' }}
                    />
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>{item.nama}</Text>
                    <Text style={{ color: '#ddd', fontSize: 10 }}> Geser ke kiri untuk melihat informasi</Text>
                  </View>
                </Swipeable>
              )}
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    )
  }
}

export default withNavigation(Kategori)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: "#FFF",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    ...Platform.select({
      ios: {

      },
      android: {
        top: 20
      }
    })
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

  header: {
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute'
      },
      android: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        marginTop: 30,
        position: 'absolute'
      }
    })
  },
  headerImg1: {
    ...Platform.select({
      ios: {
        height: 45,
        width: 70,
        resizeMode: 'stretch',
        left: 3,
      },
      android: {
        height: 50,
        width: 50,
        resizeMode: 'stretch',
        left: 5
      }
    })
  },
  headerImg2: {
    ...Platform.select({
      ios: {
        height: 50,
        width: 50,
        resizeMode: 'stretch',
        left: -15.5
      },
      android: {
        height: 50,
        width: 50,
        resizeMode: 'stretch',
        left: 7.5
      }
    })
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: 'stretch'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 80,
  },
})

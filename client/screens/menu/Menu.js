import React, { Component, createRef } from 'react'
import { View, ScrollView, Text, Dimensions, StyleSheet, Image, TouchableNativeFeedback, StatusBar, Platform, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import TouchableScale from 'react-native-touchable-scale';
import MyApps from '../menu/MyApps';
import Covid19 from '../../components/berita/Covid19';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Loading from 'react-native-whc-loading';
import ActionSheet from "react-native-actions-sheet";

const actionSheetRef = createRef();
const actionSheetFer = createRef();

const { height, width } = Dimensions.get('screen');

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isfetched: false,
    }
  }


  componentWillMount() {
    setTimeout(() => this.setState({ isfetched: true }), 8000);
  }
  render() {
    let actionSheet;
    const menus = [
      {
        icon: { uri: 'https://i.ibb.co/xzV1cdY/kendaraan.png' },
        title: 'Kendaraan',
        navigate: 'Kendaraan',
        params: ''
      },
      {
        icon: { uri: 'https://i.ibb.co/sq70BBV/pakaian.png' },
        title: 'Pakaian',
        navigate: 'Pakaian',
        params: ''
      },
      {
        icon: { uri: 'https://i.ibb.co/gzgB2GL/sarana.png' },
        title: 'Sarana',
        navigate: 'Sarana',
        params: ''
      },
      {
        icon: { uri: 'https://i.ibb.co/k27v4wm/vendor.png' },
        title: 'Vendor',
        // navigate: '',
        // params: ''
      },
    ]

    const menu = [
      {
        icon: { uri: 'https://i.ibb.co/jfCtWZ9/elektronik.png' },
        title: 'Elektronik',
        navigate: 'Elektronik',
        params: ''
      },
      {
        icon: { uri: 'https://i.ibb.co/3hsPQ9t/bayi.png' },
        title: 'Kids',
        navigate: 'Kids',
        params: ''
      },
      {
        icon: { uri: 'https://i.ibb.co/4FdfwBX/covid.png' },
        title: 'Covid-19',
        navigate: 'Covid19',
        params: ''
      },
      {
        icon: { uri: 'https://i.ibb.co/yQR4MR0/more.png' },
        title: 'More',
        // navigate: '',
        // params: ''
      },
    ]

    const { isfetched } = this.state;
    return (
      <View style={styles.View1}>
        <View style={styles.View2}>
          {
            menus.map((item, index) =>
              <TouchableOpacity key={index} style={styles.iconWrap} activeOpacity={0.9} onPress={() => {
                this.refs.loading1.show();
                setTimeout(() => {
                  this.refs.loading1.close();
                  this.props.navigation.navigate('Kategori', { data: this.props.dataProduct, title: item.title })
                }, 2000);
              }}>
                <View style={[styles.tab, styles.shadow]}>
                  <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched} style={{ ...styles.iconShimmer, borderRadius: 35 }}>
                    <Image source={item.icon} style={styles.icon} />
                  </ShimmerPlaceHolder>
                </View>
                <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched} style={{ borderRadius: 10, width: 60, marginTop: 5 }}>
                  <Text numberOfLines={1} and ellipsizeMode="tail" style={styles.subTitle}>{item.title}</Text>
                </ShimmerPlaceHolder>
              </TouchableOpacity>
            )
          }
        </View>

        <View style={styles.View3}>
          {
            menu.map((item, index) =>
              <TouchableOpacity key={index} style={styles.iconWrap} activeOpacity={0.9} onPress={
                item.title === "More" ? () => { actionSheetRef.current?.setModalVisible(); }
                  : () => {
                    this.refs.loading1.show();
                    setTimeout(() => {
                      this.refs.loading1.close();
                      this.props.navigation.navigate('Kategori', { data: this.props.dataProduct, title: item.title })
                    }, 2000);
                  }}>
                <View style={[styles.tab, styles.shadow]}>
                  <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched} style={{ ...styles.iconShimmer, borderRadius: 35 }}>
                    <Image source={item.icon} style={styles.icon} />
                  </ShimmerPlaceHolder>
                </View>
                <ShimmerPlaceHolder autoRun={true} duration={2000} visible={isfetched} style={{ borderRadius: 10, width: 60, marginTop: 5 }}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subTitle}>{item.title}</Text>
                </ShimmerPlaceHolder>
              </TouchableOpacity>
            )
          }
          <ActionSheet
            ref={actionSheetRef}
            gestureEnabled={true}
            bounceOnOpen={true}
            delayActionSheetDraw={true}
            animated={true}
          >
            <View>
              <MyApps />
            </View>
          </ActionSheet>
          <ActionSheet
            ref={actionSheetFer}
            gestureEnabled={true}
            bounceOnOpen={true}
            delayActionSheetDraw={true}
            animated={true}
          >
            <View>
              <Covid19 />
            </View>
          </ActionSheet>
        </View>
        <Loading ref="loading1"
          image={require('../../assets/icon.png')}
          seasing={Loading.EasingType.linear}
          imageSize={70}
          size={70}
        />
      </View>

    )
  }
}

export default withNavigation(Menu)

const styles = StyleSheet.create({
  View1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: width,
  },
  View2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',
  },
  View3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',
    marginTop: -30
  },
  icon: {
    height: 45,
    width: 45,
    resizeMode: 'stretch',
  },
  iconShimmer: {
    height: 60,
    width: 60,
    resizeMode: 'stretch',
  },
  subTitle: {
    fontSize: 10.5,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 5
  },
  iconWrap: {
    width: 60,
    alignItems: 'center',
    padding: 5,
    margin: 10.5
  },
  CardV: {
    borderRadius: 10,
    height: 60,
    width: 60,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 1,
    borderColor: '#ddd',
  },
  shadow: {
    shadowColor: '#000',
    shadowRadius: 2.62,
    shadowOpacity: 0.23,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    borderRadius: 15,
    backgroundColor: '#fff'
  },
  tab: {
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 10
  },
})
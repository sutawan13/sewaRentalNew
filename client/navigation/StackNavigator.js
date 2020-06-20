import React, { Component } from 'react'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions, createSwitchNavigator, withNavigation } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// TabBottomScreenTabbottom
import CustomeNavigation from '../navigation/CustomeNavigation';
import TabTop from '../screens/cart/TabTop';
import OptionPay from '../screens/payment/OptionPay';

// Kategori
import Kategori from '../components/kategori/Kategori';
import SubKategori from '../components/kategori/SubKategori';

//Payment
import Pay from '../screens/payment/Pay';

// Toko
import Vendor from '../screens/toko/member/Vendor';
import MemberVip from '../screens/toko/member/MemberVip';
import SearchFeed from '../screens/toko/toko/SearchFeed';

// Notifikasi
import Notifikasi from '../screens/notifikasi/Notifikasi';
import Message from '../app/message/Message';
import CallScreen from '../app/message/components/CallScreen';

// Auth
import Login from '../auth/Login';
import Registrasi from '../auth/Registrasi';
import Forgot from '../auth/Forgot';
import EditProfil from '../auth/EditProfil';
import Profile from '../auth/Profile';
import AuthLoadingScreen from '../auth/AuthLoadingScreen';

// Component
import Search from '../screens/search/Search';
import Detail from '../screens/detail/Detail';

// sewabarang
import Tentang from '../screens/privacy/Tentang';
import Privacy from '../screens/privacy/Privacy';
import Faq from '../screens/privacy/Faq';

//testing
import Tes from '../screens/Tes';

//Location
import Lokasi from '../screens/lokasi/Lokasi';
import LokasiToko from '../screens/lokasi/LokasiToko';
import Covid19 from '../components/berita/Covid19';


const RootRouterStack = createStackNavigator({
  CustomeNavigation: {
    screen: CustomeNavigation,
    navigationOptions: {
      header: null
    }
  },
  TabTop: {
    screen: TabTop,
    navigationOptions: { tabBarVisible: false }
  },
  OptionPay: {
    screen: OptionPay,
    navigationOptions: { tabBarVisible: false }
  },
  Vendor: {
    screen: Vendor,
    navigationOptions: { tabBarVisible: false, header: null }
  },
  Kategori: {
    screen: Kategori,
    navigationOptions: { tabBarVisible: false }
  },
  CallScreen: {
    screen: CallScreen,
    navigationOptions: { tabBarVisible: false, header: null }
  },
  Notifikasi: {
    screen: Notifikasi,
    navigationOptions: { tabBarVisible: false }
  },
  MemberVip: {
    screen: MemberVip,
    navigationOptions: { tabBarVisible: false, header: null }
  },
  SearchFeed: {
    screen: SearchFeed,
    navigationOptions: { tabBarVisible: false, header: null }
  },
  Tes: {
    screen: Tes,
    navigationOptions: { tabBarVisible: false }
  },
  Pay: {
    screen: Pay,
    navigationOptions: { tabBarVisible: false, header: null }
  },
  Message: {
    screen: Message,
    navigationOptions: { tabBarVisible: false }
  },
  Detail: {
    screen: Detail,
    navigationOptions: { tabBarVisible: false }
  },
  Search: {
    screen: Search,
    navigationOptions: { tabBarVisible: false, header: null }
  },
  EditProfil: {
    screen: EditProfil,
    navigationOptions: { tabBarVisible: false }
  },
  Tentang: {
    screen: Tentang,
    navigationOptions: { tabBarVisible: false }
  },
  Lokasi: {
    screen: Lokasi,
    navigationOptions: { tabBarVisible: false }
  },
  LokasiToko: {
    screen: LokasiToko,
    navigationOptions: { tabBarVisible: false, header: null }
  },
  Privacy: {
    screen: Privacy,
    navigationOptions: { tabBarVisible: false }
  },
  Faq: {
    screen: Faq,
    navigationOptions: { tabBarVisible: false }
  },
  SubKategori: {
    screen: SubKategori,
    navigationOptions: { tabBarVisible: false }
  }
})


const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: { tabBarVisible: false, header: null }
  },
  Registrasi: {
    screen: Registrasi,
    navigationOptions: { tabBarVisible: false, header: null }
  },
  Forgot: {
    screen: Forgot,
    navigationOptions: { tabBarVisible: false, header: null }
  },
})

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    RootRouter: RootRouterStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default AppNavigator;
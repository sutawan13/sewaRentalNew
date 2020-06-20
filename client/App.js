import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    Alert,
    ToastAndroid,
    DeviceEventEmitter,
    YellowBox,
} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Provider } from 'react-redux';
import Store from './store';


// YellowBox.ignoreWarnings(['ViewPagerAndroid']);
// // const store = createStore();
// import NavigationService from '../client/navigation/user/NavigationService';

import AppNavigator from '../client/navigation/StackNavigator';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show_Main_App: false,
            doubleBackToExitPressedOnce: false,
        };
    }

    componentWillMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        );
    }

    handleBackButton = () => {
        if (this.state.doubleBackToExitPressedOnce) {
            BackHandler.exitApp();
        }
        ToastAndroid.show('Tekan sekali lagi untuk keluar', ToastAndroid.SHORT);
        this.setState({ doubleBackToExitPressedOnce: true });
        setTimeout(() => {
            this.setState({ doubleBackToExitPressedOnce: false });
        }, 2000);
        return true;
    };

    on_Done_all_slides = () => {
        this.setState({ show_Main_App: true });
    };

    on_Skip_slides = () => {
        this.setState({ show_Main_App: true });

    };

    render() {
        if (this.state.show_Main_App) {
            return (
                <Provider store={Store}>
                    <AppNavigator />
                </Provider>
            );

        } else {

            return (
                <AppIntroSlider
                    slides={slides}
                    onDone={this.on_Done_all_slides}
                    showSkipButton={true}
                    onSkip={this.on_Skip_slides}
                    buttonTextStyle={{ color: 'blue', fontWeight: 'bold' }}
                    activeDotStyle={{ backgroundColor: 'blue' }}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    text: {
        color: '#000',
        fontSize: 15,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

const slides = [
    {
        key: 'k1',
        title: 'PRODUK PILIHAN',
        text: 'Memudahkan anda dalam mencari barang',
        image: {
            uri: 'https://i.imgur.com/rSCSg9l.png',
        },
        titleStyle: styles.title,
        textStyle: styles.text,
        imageStyle: styles.image,
        backgroundColor: '#fff',
    },
    {
        key: 'k4',
        title: 'SEWA BARANG',
        text: 'Mudah diakses dimana saja dan kapan saja',
        image: {
            uri: 'https://i.imgur.com/JZBOz3Z.png',
        },
        titleStyle: styles.title,
        textStyle: styles.text,
        imageStyle: styles.image,
        backgroundColor: '#fff',
    },
    {
        key: 'k5',
        title: 'SEWA AMAN',
        text: ' Ayoo! Sewa kebutuhan mu diaplikasi sewabarang sekarang juga!!!',
        image: {
            uri: 'https://i.imgur.com/2MbGcgZ.png',
        },
        titleStyle: styles.title,
        textStyle: styles.text,
        imageStyle: styles.image,
        backgroundColor: '#fff',
    },
];

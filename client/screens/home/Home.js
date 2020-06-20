import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ActivityIndicator,
    FlatList,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    StatusBar,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
    Alert,
    SafeAreaView,
} from 'react-native';
import Slider from '../../components/promosi/Slider';
import { Header } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as NumberFormat } from 'react-number-format';
import Menu from '../menu/Menu';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import TouchableScale from 'react-native-touchable-scale';
import Toast from 'react-native-tiny-toast';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Barcode from '../../components/barcode/Barcode';
import ProductPilihan from '../../components/promosi/ProductPilihan';
import Loading from 'react-native-whc-loading';
import { connect } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../../config';
import { getCurrentProfileData } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';
import { TouchableHighlight, TextInput } from 'react-native-gesture-handler';
var { height, width } = Dimensions.get('window');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUri:
                'https://serving.photos.photobox.com/835809569ba98e7d41a64799e0eb4f79cc2feef6daef0a37725a7026f5c4bbb346eb5f3d.jpg',
            imageHeight: 165,
            marginTop: -50,
            yAxis: 0,
            isfetched: false,
            refreshing: false,
            // isLoading: true,
            isVisible: false,
            Default_Rating: 0,
            Max_Rating: 5,
            produk: [],
        };

        this.Star =
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

        this.Star_With_Border =
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getData();
        this.setState({ refreshing: false });
        if (Platform.OS === 'android') {
            Toast.show(`Data berhasil di update`);
        } else {
            if (Platform.OS === 'ios') {
                Toast.show(`Data berhasil di update`);
            }
        }
    };

    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }

    setBackground = (data) => {
        this.setState({ imgUri: data });
    };
    handleScroll = (event) => {
        const yAxis = event.nativeEvent.contentOffset.y;
        if (yAxis >= 0) {
            imageHeight = 165;
            this.setState({ imageHeight, marginTop: -50 });
        } else if (yAxis < 0) {
            imageHeight = Math.abs(yAxis) + 265;
            this.setState({ imageHeight, marginTop: yAxis - 150 });
        }
        this.setState({ yAxis });
    };

    componentDidMount() {
        this.getData();
        const id = this.props.auth.user._id;
        this.props.getCurrentProfileData(id);
    }

    getData = () => {
        axios
            .get(`${apiUrl}/api/product`)
            .then((res) => {
                this.setState({
                    produk: res.data,
                });
                //console.log('res', res.data);
            })
            .catch((err) => console.log('err', err));
    };

    componentWillMount() {
        setTimeout(() => this.setState({ isfetched: true }), 8000);
    }

    render() {
        const { profile } = this.props.profile;
        const { isfetched, produk } = this.state;
        randomNumber = Math.floor(Math.random() * 7);

        let React_Native_Rating_Bar = [];
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableScale
                    activeOpacity={0.7}
                    key={i}
                    onPress={this.UpdateRating.bind(this, i)}
                >
                    <Image
                        style={styles.StarImage}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star_With_Border }
                        }
                    />
                </TouchableScale>,
            );
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle={
                        this.state.yAxis > 30 ? 'dark-content' : 'light-content'
                    }
                />
                <View
                    style={[
                        styles.header,
                        this.state.yAxis > 50 ? styles.shadow : null,
                        {
                            backgroundColor: `rgba(255,255,255,${
                                this.state.yAxis > 50
                                    ? 1
                                    : this.state.yAxis / 50
                                })`,
                        },
                    ]}
                >
                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center' }}>
                        {/* <ShimmerPlaceHolder
                            autoRun={true}
                            visible={isfetched}
                            duration={2000}
                            style={{ left: 10, width: 30, height: 30, borderRadius: 15 }}>
                            <Image source={{ uri: 'https://i.imgur.com/bE3JFTa.png' }} style={styles.Logom} />
                        </ShimmerPlaceHolder> */}
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Search')}
                            activeOpacity={0.9}
                            style={{
                                flexDirection: 'row',
                                width: '70%',
                                height: 45,
                                backgroundColor: [this.state.yAxis > 50 ? '#F6F6F6' : 'white'],
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                left: 20
                            }}>
                            {/* <Ionicons
                                name="ios-search"
                                size={24}
                                color="#ddd"
                            /> */}
                            <Image source={{ uri: 'https://i.imgur.com/bE3JFTa.png' }} style={{ height: 50, width: 50, right: 50 }} />
                            <Text style={{ fontWeight: 'bold', color: '#ddd', right: 50, }}>Cari Produk...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('TabTop')}
                            style={{ left: 18 }}
                        >
                            <ShimmerPlaceHolder
                                autoRun={true}
                                visible={isfetched}
                                duration={2000}
                                style={{
                                    ...Platform.select({
                                        ios: {
                                            height: 30,
                                            width: 30,
                                            borderRadius: 15,
                                            left: 5,
                                        },
                                        android: {
                                            height: 30,
                                            width: 30,
                                            borderRadius: 15,
                                            left: 5,
                                        },
                                    }),
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="bookmark"
                                    size={27}
                                    color={this.state.yAxis > 50 ? 'grey' : 'white'}
                                    style={styles.icon}
                                />
                            </ShimmerPlaceHolder>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Notifikasi')}
                            style={{ left: 15 }}
                        >
                            <ShimmerPlaceHolder
                                autoRun={true}
                                visible={isfetched}
                                duration={2000}
                                style={{
                                    ...Platform.select({
                                        ios: {
                                            height: 30,
                                            width: 30,
                                            borderRadius: 15,
                                            left: 10,
                                        },
                                        android: {
                                            height: 30,
                                            width: 30,
                                            borderRadius: 15,
                                            left: 10,
                                        },
                                    }),
                                }}
                            >
                                <Icon
                                    name="bell"
                                    size={27}
                                    color={this.state.yAxis > 50 ? 'grey' : 'white'}
                                    style={styles.icon}
                                />
                                {profile.sewaItem !== undefined && (
                                    <View
                                        style={{
                                            ...Platform.select({
                                                ios: {
                                                    top: -5,
                                                    right: -8,
                                                    position: 'absolute',
                                                    borderRadius: 10,
                                                    height: 20,
                                                    width: 20,
                                                    backgroundColor: 'red',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                },
                                                android: {
                                                    top: -8,
                                                    right: -8,
                                                    position: 'absolute',
                                                    borderRadius: 10,
                                                    height: 20,
                                                    width: 20,
                                                    backgroundColor: 'red',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                },
                                            }),
                                        }}
                                    >
                                        <Text style={{ color: 'white' }}>
                                            {profile.sewaItem.length}
                                        </Text>
                                    </View>
                                )}
                            </ShimmerPlaceHolder>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Message')}
                            style={{ left: 15 }}
                        >
                            <ShimmerPlaceHolder
                                autoRun={true}
                                visible={isfetched}
                                duration={2000}
                                style={{
                                    ...Platform.select({
                                        ios: {
                                            height: 30,
                                            width: 30,
                                            borderRadius: 15,
                                            left: 15,
                                        },
                                        android: {
                                            height: 30,
                                            width: 30,
                                            borderRadius: 15,
                                            left: 15,
                                        },
                                    }),
                                }}
                            >
                                <Icon
                                    name="email"
                                    size={27}
                                    color={this.state.yAxis > 50 ? 'grey' : 'white'}
                                    style={styles.icon}
                                />
                            </ShimmerPlaceHolder>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    style={styles.container}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={8}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <View style={styles.imageStyle}>
                        <Image
                            source={{ uri: this.state.imgUri }}
                            style={[
                                styles.imageStyle,
                                {
                                    ...Platform.select({
                                        ios: {
                                            height: (this.state.imageHeight = 150),
                                            marginTop: (this.state.marginTop = 0),
                                        },
                                        android: {
                                            height: (this.state.imageHeight = 150),
                                            marginTop: (this.state.marginTop = 0),
                                        },
                                    }),
                                },
                            ]}
                            blurRadius={30}
                        />
                    </View>

                    <View
                        style={{
                            ...Platform.select({
                                ios: {
                                    top: -80,
                                },
                                android: {
                                    top: -80,
                                },
                            }),
                        }}
                    >
                        <Slider imgUri={this.setBackground} />
                    </View>

                    <View style={{ top: -70 }}>
                        <Barcode />
                    </View>

                    <View
                        style={{
                            ...Platform.select({
                                ios: {
                                    top: -5,
                                },
                                android: {
                                    top: -10,
                                },
                            }),
                        }}
                    >
                        <Menu dataProduct={produk} />
                    </View>

                    {/* <View style={{ top: 70 }}>
                        <ProductPilihan />
                    </View> */}

                    <View
                        style={{
                            flex: 1,
                            ...Platform.select({
                                ios: {
                                    marginTop: 70,
                                },
                                android: {
                                    marginTop: 70,
                                },
                            }),
                        }}
                    >
                        <FlatList
                            style={{ width: '100%' }}
                            data={produk}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                if (Platform.OS === 'ios') {
                                    return (
                                        <TouchableWithoutFeedback
                                            underlayColor="trasnparent"
                                            activeOpacity={10}
                                            onPress={() => {
                                                this.refs.loading1.show();
                                                setTimeout(() => {
                                                    this.refs.loading1.close();
                                                    this.props.navigation.navigate(
                                                        'Detail',
                                                        { ...item },
                                                    );
                                                }, 2000);
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    width: width,
                                                }}
                                            >
                                                <View style={styles.postHorder}>
                                                    <ShimmerPlaceHolder
                                                        autoRun={true}
                                                        duration={2000}
                                                        visible={isfetched}
                                                        style={{
                                                            ...styles.postImage,
                                                            borderTopLeftRadius: 5,
                                                            borderTopRightRadius: 5,
                                                        }}
                                                    >
                                                        <Image
                                                            source={{
                                                                uri:
                                                                    item.gambarBarang,
                                                            }}
                                                            style={
                                                                styles.postImage
                                                            }
                                                        ></Image>
                                                    </ShimmerPlaceHolder>

                                                    <ShimmerPlaceHolder
                                                        autoRun={true}
                                                        duration={2000}
                                                        visible={isfetched}
                                                        style={{
                                                            borderRadius: 10,
                                                            marginTop: 5,
                                                            left: 7,
                                                            width: '70%',
                                                        }}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.postText
                                                            }
                                                        >
                                                            {item.namaBarang}
                                                        </Text>
                                                    </ShimmerPlaceHolder>

                                                    <ShimmerPlaceHolder
                                                        autoRun={true}
                                                        duration={2000}
                                                        visible={isfetched}
                                                        style={{
                                                            borderRadius: 10,
                                                            marginTop: 5,
                                                            left: 7,
                                                            width: '80%',
                                                        }}
                                                    >
                                                        <NumberFormat
                                                            value={item.harga}
                                                            displayType={'text'}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix={'Rp.'}
                                                            renderText={(
                                                                value,
                                                            ) => (
                                                                    <Text
                                                                        style={{
                                                                            ...styles.price,
                                                                            fontWeight:
                                                                                'bold',
                                                                        }}
                                                                    >
                                                                        {value}/Hari
                                                                    </Text>
                                                                )}
                                                        />
                                                    </ShimmerPlaceHolder>

                                                    <View
                                                        style={{
                                                            padding: 5,
                                                            borderRadius: 5,
                                                            borderWidth: 0.8,
                                                            width: 120,
                                                            marginLeft: 10,
                                                            marginTop: 10,
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            borderColor:
                                                                item.statusItem ===
                                                                    'Tidak tersedia'
                                                                    ? 'blue'
                                                                    : 'green',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 10,
                                                                color:
                                                                    item.statusItem ===
                                                                        'Tidak tersedia'
                                                                        ? 'blue'
                                                                        : 'green',
                                                            }}
                                                        >
                                                            {item.statusItem}
                                                        </Text>
                                                    </View>

                                                    <View>
                                                        <ShimmerPlaceHolder
                                                            autoRun={true}
                                                            duration={2000}
                                                            visible={isfetched}
                                                            style={{
                                                                ...styles.childView,
                                                                borderRadius: 10,
                                                                width: '90%',
                                                            }}
                                                        >
                                                            <View
                                                                style={
                                                                    styles.childView
                                                                }
                                                            >
                                                                {
                                                                    React_Native_Rating_Bar
                                                                }
                                                                <Text
                                                                    style={
                                                                        styles.textStyle
                                                                    }
                                                                >
                                                                    {
                                                                        this
                                                                            .state
                                                                            .Default_Rating
                                                                    }
                                                                    /
                                                                    {
                                                                        this
                                                                            .state
                                                                            .Max_Rating
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </ShimmerPlaceHolder>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    );
                                }
                                if (Platform.OS === 'android') {
                                    return (
                                        <TouchableNativeFeedback
                                            onPress={() => {
                                                item.statusItem ===
                                                    'Tidak tersedia'
                                                    ? alert(
                                                        'item tidak tersedia',
                                                    )
                                                    : this.refs.loading1.show();
                                                setTimeout(() => {
                                                    this.refs.loading1.close();
                                                    this.props.navigation.navigate(
                                                        'Detail',
                                                        { ...item },
                                                    );
                                                }, 2000);
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    width: width,
                                                }}
                                            >
                                                <View style={styles.postHorder}>
                                                    <ShimmerPlaceHolder
                                                        autoRun={true}
                                                        duration={2000}
                                                        visible={isfetched}
                                                        style={{
                                                            ...styles.postImage,
                                                            borderTopLeftRadius: 5,
                                                            borderTopRightRadius: 5,
                                                        }}
                                                    >
                                                        <Image
                                                            source={{
                                                                uri:
                                                                    item.gambarBarang,
                                                            }}
                                                            style={
                                                                styles.postImage
                                                            }
                                                        ></Image>
                                                    </ShimmerPlaceHolder>

                                                    <ShimmerPlaceHolder
                                                        autoRun={true}
                                                        duration={2000}
                                                        visible={isfetched}
                                                        style={{
                                                            borderRadius: 10,
                                                            marginTop: 5,
                                                            left: 7,
                                                            width: '70%',
                                                        }}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.postText
                                                            }
                                                        >
                                                            {item.namaBarang}
                                                        </Text>
                                                    </ShimmerPlaceHolder>

                                                    <ShimmerPlaceHolder
                                                        autoRun={true}
                                                        duration={2000}
                                                        visible={isfetched}
                                                        style={{
                                                            borderRadius: 10,
                                                            marginTop: 5,
                                                            left: 7,
                                                            width: '80%',
                                                        }}
                                                    >
                                                        <NumberFormat
                                                            value={item.harga}
                                                            displayType={'text'}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix={'Rp.'}
                                                            renderText={(
                                                                value,
                                                            ) => (
                                                                    <Text
                                                                        style={{
                                                                            ...styles.price,
                                                                            fontWeight:
                                                                                'bold',
                                                                        }}
                                                                    >
                                                                        {value}/Hari
                                                                    </Text>
                                                                )}
                                                        />
                                                    </ShimmerPlaceHolder>

                                                    <View
                                                        style={{
                                                            padding: 5,
                                                            borderRadius: 5,
                                                            borderWidth: 0.8,
                                                            width: 120,
                                                            marginLeft: 10,
                                                            marginTop: 10,
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            borderColor:
                                                                item.statusItem ===
                                                                    'Tidak tersedia'
                                                                    ? 'blue'
                                                                    : 'green',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 10,
                                                                color:
                                                                    item.statusItem ===
                                                                        'Tidak tersedia'
                                                                        ? 'blue'
                                                                        : 'green',
                                                            }}
                                                        >
                                                            {item.statusItem}
                                                        </Text>
                                                    </View>

                                                    {/* <View>
                                                        <Text>
                                                            {item.statusItem}
                                                        </Text>
                                                    </View> */}

                                                    <View>
                                                        <ShimmerPlaceHolder
                                                            autoRun={true}
                                                            duration={2000}
                                                            visible={isfetched}
                                                            style={{
                                                                ...styles.childView,
                                                                borderRadius: 10,
                                                                width: '90%',
                                                            }}
                                                        >
                                                            <View
                                                                style={
                                                                    styles.childView
                                                                }
                                                            >
                                                                {
                                                                    React_Native_Rating_Bar
                                                                }
                                                                <Text
                                                                    style={
                                                                        styles.textStyle
                                                                    }
                                                                >
                                                                    {
                                                                        this
                                                                            .state
                                                                            .Default_Rating
                                                                    }
                                                                    /
                                                                    {
                                                                        this
                                                                            .state
                                                                            .Max_Rating
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </ShimmerPlaceHolder>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableNativeFeedback>
                                    );
                                }
                            }}
                        />
                    </View>
                </ScrollView>
                <Loading
                    ref="loading1"
                    image={{ uri: 'https://i.imgur.com/bE3JFTa.png' }}
                    seasing={Loading.EasingType.linear}
                    imageSize={70}
                    size={70}
                />
            </SafeAreaView>
        );
    }
}

Home.propTypes = {
    getCurrentProfileData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfileData })(Home);

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                marginTop:
                    Platform.select == 'ios'
                        ? -Header.HEIGHT
                        : -Header.HEIGHT - 30,
                overflow: 'hidden',
            },
            android: {
                marginTop:
                    Platform.select == 'android'
                        ? -Header.HEIGHT
                        : -Header.HEIGHT - 25,
            },
        }),
    },
    header: {
        ...Platform.select({
            ios: {
                height:
                    Platform.select == 'ios'
                        ? Header.HEIGHT
                        : Header.HEIGHT + 10,
                zIndex: 1,
                top: -20,
                alignItems: 'center',
                flexDirection: 'row',
                overflow: 'hidden',
            },
            android: {
                height:
                    Platform.select == 'android'
                        ? Header.HEIGHT
                        : Header.HEIGHT + 25,
                zIndex: 1,
                alignItems: 'center',
                flexDirection: 'row',
            },
        }),
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
            },
            android: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 5,
            },
        }),
    },
    textStyle: {
        fontSize: 10,
        color: '#000',
        paddingLeft: 5,
    },
    imageStyle: {
        ...Platform.select({
            ios: {
                borderBottomLeftRadius: 150,
                borderBottomRightRadius: 150,
                transform: [{ scaleX: 1.5 }],
                overflow: 'hidden',
                width: null,
            },
            android: {
                borderBottomLeftRadius: 150,
                borderBottomRightRadius: 150,
                transform: [{ scaleX: 1.5 }],
                width: null,
            },
        }),
    },
    StarImage: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
    childView: {
        flexDirection: 'row',
        marginTop: 10,
        margin: 15,
        marginHorizontal: 7,
    },
    android: {
        ...Platform.select({
            ios: {
                flexDirection: 'row',
                borderRadius: 5,
                height: 40,
                width: wp('46%'),
                alignItems: 'center',
                marginTop: 25,
            },
            android: {
                flexDirection: 'row',
                borderRadius: 5,
                height: 40,
                width: wp('46%'),
                alignItems: 'center',
                marginTop: 30,
            }
        })
    },
    Logom: {
        height: 80,
        width: 80,
    },
    price: {
        color: 'green',
        paddingLeft: 10,
    },
    postHorder: {
        ...Platform.select({
            ios: {
                backgroundColor: 'white',
                overflow: 'hidden',
                flex: 3,
                margin: 5,
                flexWrap: 'wrap',
                borderWidth: 0.5,
                borderRadius: 10,
                borderColor: '#ddd',
                resizeMode: 'cover',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: wp('47,5%'),
            },
            android: {
                backgroundColor: 'white',
                overflow: 'hidden',
                flex: 3,
                margin: 5,
                flexWrap: 'wrap',
                borderRadius: 10,
                borderColor: '#ddd',
                resizeMode: 'cover',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: wp('47,5%'),
            },
        }),
    },
    postImage: {
        ...Platform.select({
            ios: {
                height: 130,
                width: wp('47%'),
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            },
            android: {
                height: 130,
                width: wp('47%'),
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            },
        }),
    },
    postText: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingLeft: 5,
        margin: 5,
        width: '80%',
    },
    hairline: {
        backgroundColor: '#A2A2A2',
        height: 1,
        width: 120,
        marginTop: 30,
        paddingLeft: 100,
        margin: 11,
    },
    icon: {
        ...Platform.select({
            ios: {
                position: 'relative',
                paddingLeft: 10,
            },
            android: {
                position: 'relative',
                paddingLeft: 10,
            },
        }),
    },
});

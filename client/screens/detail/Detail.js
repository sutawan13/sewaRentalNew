import React, { Component, createRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    SafeAreaView,
    Platform,
    ScrollView,
    Image,
    Modal,
    StyleSheet,
    Animated,
    StatusBar,
} from 'react-native';
import { Header } from 'react-navigation';
import { Tab, Tabs } from 'native-base';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { default as NumberFormat } from 'react-number-format';
import NumericInput from 'react-native-numeric-input';
import {
    MaterialCommunityIcons,
    AntDesign,
    Ionicons,
    FontAwesome,
    Feather,
    FontAwesome5,
    Entypo
} from 'react-native-vector-icons';
import { Footer, Icon, Button } from 'native-base';
import Swiper from 'react-native-swiper';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiUrl } from '../../config';
import { getCurrentProfileData } from '../../redux/actions/profileActions';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actions-sheet';
import DatePicker from 'react-native-date-ranges';
import moment from 'moment';

const { height, width } = Dimensions.get('window');
const actionSheetRef = createRef();
class Detail extends Component {
    static navigationOptions = ({ navigation, profile }) => {
        return {
            header: null,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            imageHeight: 165,
            marginTop: -50,
            yAxis: 0,
            isModalOpened: false,
            currentImageIndex: 0,
            Default_Rating: 0,
            activeIndex: 0,
            isVisible: false,
            isfetched: false,
            index: 0,
            activeIndex: 0,
            Max_Rating: 5,
            startDate: null,
            endDate: null,
            date: new Date(),
            focus: 'startDate',
            currentDate: moment(),
            jumlahHari: 0,
            totalKEseluruhan: 0,
            error: false,
        };
        this.Star =
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        this.Star_With_Border =
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }

    getDataUser = () => {
        const id = this.props.auth.user._id;
        axios
            .get(`${apiUrl}/api/user/${id}`)
            .then((res) => {
                // this.setState({
                //     sewaItem: res.data.sewaItem,
                // });
                //console.log('res', res.data);
            })
            .catch((err) => console.log('error get by id', err));
    };

    handleSewaButton = () => {
        const { startDate, endDate, totalKEseluruhan, jumlahHari } = this.state;
        const idProduct = this.props.navigation.state.params._id;
        const { profile } = this.props.profile;

        console.log('id produk', idProduct);
        // console.log('end', endDate);

        if (startDate === null && endDate === null) {
            this.setState({ error: true });
        } else {
            axios
                .post(
                    `${apiUrl}/api/sewaitem/assign/product/${profile._id}/${idProduct}`,
                    {
                        user: profile._id,
                        product: idProduct,
                        tanggalAwal: startDate,
                        tanggalAkhir: endDate,
                        jumlahHari: jumlahHari,
                        total: totalKEseluruhan,
                    },
                )
                .then((res) => {
                    this.getDataUser();
                    this.props.getCurrentProfileData(profile._id);
                    this.props.navigation.navigate('Cart', {
                        onNext: () => this.refresh(),
                    });
                    console.log('sukses sewa item', res.data);
                })
                .catch((err) => console.log('error get by id', err));
        }
    };

    stokC = (value) => {
        this.setState({
            stok: value,
        });
    };

    UpdateRating(key) {
        this.setState({ Default_Rating: key });
    }

    openModal(index) {
        this.setState({ isModalOpened: true, currentImageIndex: index });
    }

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

    handleValueDate = (value) => {
        const { jumlahHari, totalKEseluruhan } = this.state;
        const { params } = this.props.navigation.state;

        const awal = new Date(value.startDate).getTime();
        const akhir = new Date(value.endDate).getTime();

        const hari = 1000 * 60 * 60 * 24;
        const jarak = akhir - awal;
        const totalHari = Math.floor(jarak / hari);

        this.setState({
            jumlahHari: totalHari,
            totalKEseluruhan: totalHari * params.harga,
            startDate: new Date(value.startDate),
            endDate: new Date(value.endDate),
        });
    };

    render() {
        const params = this.props.navigation.state.params;
        //console.log('ini params', params);
        const { isfetched } = this.state;
        let React_Native_Rating_Bar = [];
        let actionSheet;
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
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
                </TouchableOpacity>,
            );
        }
        const images = [params.gambarBarang];
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
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                            position: 'absolute',
                            left: 10,
                            top: 25,
                            backgroundColor:
                                this.state.yAxis > 50
                                    ? 'transparent'
                                    : 'rgba(0, 0, 0, 0.5)',
                            padding: 10,
                            borderRadius: 50,
                            height: 45,
                            width: 45
                        }}
                    >
                        <Feather
                            name="arrow-left"
                            size={24}
                            color={this.state.yAxis > 50 ? 'grey' : 'white'}
                        />
                    </TouchableOpacity>
                    <Text
                        numberOfLines={1} ellipsizeMode="tail"
                        style={{
                            ...Platform.select({
                                ios: {
                                    left: 48,
                                    top: 10,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color:
                                        this.state.yAxis > 50 ? 'black' : 'transparent',
                                },
                                android: {
                                    left: 48,
                                    top: 5,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color:
                                        this.state.yAxis > 50 ? 'black' : 'transparent',
                                }
                            })
                        }}
                    >
                        {params.namaBarang}
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Cart')}
                        style={{
                            position: 'absolute',
                            right: 20,
                            top: 25,
                            backgroundColor:
                                this.state.yAxis > 50
                                    ? 'transparent'
                                    : 'rgba(0, 0, 0, 0.5)',
                            padding: 10,
                            borderRadius: 50,
                            height: 45,
                            width: 45
                        }}
                    >
                        <Feather
                            name="shopping-cart"
                            size={24}
                            color={this.state.yAxis > 50 ? 'grey' : 'white'}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.container}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={8}
                    showsVerticalScrollIndicator={false}
                >
                    <Swiper
                        style={styles.sliderWrapper}
                        showsButtons={false}
                        showsPagination={false}
                    >
                        <View style={styles.slide}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.openModal(0);
                                }}
                            >
                                <Image
                                    source={{ uri: params.gambarBarang }}
                                    style={{
                                        resizeMode: 'stretch',
                                        height: 250,
                                        width: width,
                                    }}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </Swiper>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: '#000',
                                paddingHorizontal: 10,
                                top: 8,
                            }}
                        >
                            {params.namaBarang}
                        </Text>
                        <View
                            style={{
                                top: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '90%',
                            }}
                        >
                            <NumberFormat
                                value={params.harga}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Rp.'}
                                renderText={(value) => (
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                            color: 'green',
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        {value}/Hari
                                    </Text>
                                )}
                            />
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                {React_Native_Rating_Bar}
                                <Text style={styles.textStyle}>
                                    {this.state.Default_Rating}/
                                    {this.state.Max_Rating}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text></Text>
                        <Text></Text>
                        <View
                            style={{
                                backgroundColor: '#ddd',
                                height: 10,
                                width: width,
                            }}
                        />

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 50,
                                width: width,
                                backgroundColor: 'blue',
                            }}
                        >
                            <View
                                style={{
                                    width: '90%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity>
                                    <AntDesign
                                        name="like1"
                                        size={25}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 15 }}>
                                    like
                                </Text>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons
                                        name="comment"
                                        size={25}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 15 }}>
                                    comment
                                </Text>
                                <TouchableOpacity>
                                    <Entypo
                                        name="share"
                                        size={25}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                                <Text style={{ color: 'white', fontSize: 15 }}>
                                    share
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                backgroundColor: '#ddd',
                                height: 10,
                                width: width,
                            }}
                        />
                        <Text style={{ left: 10, top: 5, fontWeight: 'bold' }}>Pilih Tanggal Sewa</Text>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',

                                paddingVertical: 5,
                            }}
                        >
                            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', elevation: 5}}>
							<Text style={{fontSize: 12, fontWeight:'bold', color: 'grey'}}>QTY</Text>
							<Text style={{fontSize: 12, fontWeight:'bold', color: 'grey', left: 40, top: 5}}>STOK</Text> */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    // flex: 1,
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    marginTop: 10,
                                }}
                            >
                                <Image
                                    source={{
                                        uri: 'https://i.imgur.com/hDEMSGT.png',
                                    }}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        // top: -15,
                                        resizeMode: 'stretch',
                                    }}
                                />

                                <DatePicker
                                    style={{
                                        // width: 150,
                                        // marginRight: 10,
                                        height: 30,
                                        // marginTop: -30,
                                        left: 20,
                                        padding: 5,
                                        width: '90%',
                                        height: 40,
                                        borderRadius: 10,
                                    }}
                                    onConfirm={(value) =>
                                        this.handleValueDate(value)
                                    }
                                    // customButton={this.customButton}
                                    customStyles={{
                                        placeholderText: {
                                            fontSize: 15,
                                        },
                                        headerStyle: {},
                                        headerMarkTitle: {},
                                        headerDateTitle: {},
                                        contentInput: {},
                                        contentText: {},
                                    }}
                                    centerAlign
                                    allowFontScaling={false}
                                    placeholder={'Pilih tanggal sewa'}
                                    mode={'range'}
                                    dateSplitter={'-'}
                                    outFormat={'DD MMM YYYY'}
                                    markText={'Periode'}

                                />
                            </View>

                            {/* </View> */}
                            {/* <View style={{marginTop: -15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', elevation: 5}}>
							<NumericInput
								value={this.state.stok}
								onChange={(value) =>
									{this.setState({ quantity : value })
									// console.log('ini value', value)
								}
								}
								onLimitReached={(isMax, msg) =>
									console.log(isMax, msg)
								}
								totalWidth={100}
								totalHeight={30}
								iconSize={24}
								step={1}
								valueType="real"
								rounded
								textColor="blue"
								iconStyle={{ color: 'white' }}
								rightButtonBackgroundColor="blue"
								leftButtonBackgroundColor="blue"
							/>
							<Text style={{fontWeight:'bold', fontSize: 15, color: '#000', right: 50}}>{params.jml_barang}</Text>
							<Text></Text> */}
                            {/* </View> */}
                            <Text></Text>
                        </View>
                        {this.state.error && (
                            <Text
                                style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    color: 'red',
                                }}
                            >
                                Tanggal Awal dan Akhir tidak boleh kosong !
                            </Text>
                        )}
                        <View
                            style={{
                                marginHorizontal: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginTop: 10,
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Jumlah Hari</Text>

                            <Text style={{ fontWeight: 'bold' }}>Total Keseluruhan</Text>
                        </View>
                        <View
                            style={{
                                marginHorizontal: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginVertical: 10,
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>{this.state.jumlahHari} Hari</Text>
                            <NumberFormat
                                value={this.state.totalKEseluruhan}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Rp.'}
                                renderText={(value) => (
                                    <Text
                                        style={{
                                            ...Platform.select({
                                                ios: {
                                                    fontSize: 15,
                                                    fontWeight: 'bold',
                                                    color: 'green',
                                                    paddingHorizontal: 10,
                                                    left: 25
                                                }
                                            })
                                        }}
                                    >
                                        {value}/Hari
                                    </Text>
                                )}
                            />
                            {/* <Text>{this.state.totalKEseluruhan}</Text> */}
                        </View>
                        {/* <TouchableOpacity
                            onPress={this.handleSewaButton}
                            style={{
                                // top: 10,
                                backgroundColor: 'blue',
                                // height: 50,
                                // width: 50,
                                borderRadius: 10,
                                // height: 50,
                                paddingVertical: 10,
                                paddingHorizontal: 25,
                                // width: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                                alignSelf: 'flex-end',
                                marginVertical: 20,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >
                                Sewa
                            </Text>
                        </TouchableOpacity> */}

                        <View
                            style={{
                                backgroundColor: '#ddd',
                                height: 10,
                                width: width,
                            }}
                        />

                        <Text></Text>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('LokasiToko')
                            }
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Feather name="map" size={25} color={'blue'} />
                            <Text
                                style={{
                                    paddingHorizontal: 14,
                                    fontSize: 15,
                                    justifyContent: 'flex-start',
                                    textAlign: 'justify',
                                    lineHeight: 26,
                                }}
                            >{`${params.alamat}, Kabupaten ${params.kabupaten}, ${params.provinsi}`}</Text>
                        </TouchableOpacity>
                        <Text></Text>

                        <View
                            style={{
                                backgroundColor: '#ddd',
                                height: 10,
                                width: width,
                            }}
                        />

                        <View style={{ flex: 1 }}>
                            <Tabs tabBarUnderlineStyle={{ backgroundColor: 'blue', borderRadius: 10 }}>
                                <Tab heading="Deskripsi"
                                    tabStyle={{ backgroundColor: '#fff' }}
                                    textStyle={{ color: '#1E90FF' }}
                                    activeTabStyle={{ backgroundColor: '#fff' }}
                                    activeTextStyle={{ color: 'blue' }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ paddingHorizontal: 14, fontSize: 14, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26 }}>{params.deskripsi}</Text>
                                    </View>
                                </Tab>


                                <Tab heading="Jaminan"
                                    tabStyle={{ backgroundColor: '#fff' }}
                                    textStyle={{ color: '#1E90FF' }}
                                    activeTabStyle={{ backgroundColor: '#fff' }}
                                    activeTextStyle={{ color: 'blue' }}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ paddingHorizontal: 14, fontSize: 14, justifyContent: 'flex-start', textAlign: 'justify', lineHeight: 26 }}>{params.jaminan}</Text>
                                    </View>
                                </Tab>
                            </Tabs>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#ddd',
                            height: 10,
                            width: width,
                        }}
                    />

                    {/* Promosi */}
                    <Text></Text>
                    <View style={styles.row}>
                        <Text style={styles.sub_heading}>Promo</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: '#cdcdcd',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginRight: 5,
                                }}
                            >
                                See All
                            </Text>
                        </View>
                    </View>
                    {/* Penutup Promosi */}

                    <Modal
                        visible={this.state.isModalOpened}
                        transparent={true}
                    >
                        <ImageViewer
                            imageUrls={images}
                            index={this.state.currentImageIndex}
                            renderHeader={() => {
                                return (
                                    <View style={{ paddingTop: 35 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    isModalOpened: false,
                                                });
                                            }}
                                            style={{
                                                zIndex: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                right: '40%',
                                            }}
                                        >
                                            <Feather
                                                name="x-circle"
                                                size={24}
                                                color={'white'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                        />
                    </Modal>
                    <ActionSheet ref={actionSheetRef}>
                        <View>
                            <Text>
                                YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET
                            </Text>
                        </View>
                    </ActionSheet>
                </ScrollView>
                <Footer>
                    <View style={styles.footer}>
                        <Button onPress={() => this.props.navigation.navigate('Message')} style={{ borderColor: 'lightgray', borderRadius: 5 }} bordered>
                            <Icon style={{ color: 'gray', fontSize: 25 }} name='chatbubbles' />
                        </Button>
                        <Button
                            style={styles.buttonCart}
                            onPress={this.handleSewaButton}
                        >
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }} uppercase={false}>Sewa</Text>
                        </Button>
                    </View>
                </Footer>
            </SafeAreaView>
        );
    }
}

Detail.propTypes = {
    getCurrentProfileData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfileData })(Detail);

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
                flex: 1,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    sliderWrapper: {
        height: 250,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    StarImage: {
        width: 25,
        height: 25,
        resizeMode: 'stretch',
    },
    textStyle: {
        fontSize: 10,
        color: '#000',
        paddingLeft: 5,
    },
    childView: {
        flexDirection: 'row',
        paddingHorizontal: 14,
        top: 10,
    },
    scene: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        paddingHorizontal: 14,
        fontSize: 15,
        justifyContent: 'flex-start',
        textAlign: 'justify',
        lineHeight: 26,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sub_heading: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    footer: {
        paddingTop: 5,
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon: {
        color: 'white',
        fontSize: 25
    },
    buttonCart: {
        backgroundColor: 'blue',
        width: width - 90,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

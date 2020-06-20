import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Share,
    Image,
    ActivityIndicator,
    Dimensions,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback,
    ScrollView,
    Platform,
    SafeAreaView,
} from 'react-native';
import {
    EvilIcons,
    Entypo,
    FontAwesome,
    FontAwesome5,
    MaterialCommunityIcons,
    AntDesign,
} from 'react-native-vector-icons';
import GridList from 'react-native-grid-list';
import { Card, CardContent, CardMedia, CardActions, CardHeader, Icon, Avatar, IconButton } from 'material-bread';
import styles from '../toko/style';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiUrl } from '../../../config';
import Animated, { Easing } from 'react-native-reanimated';
const { Value, timing } = Animated;

let screenWidth = Dimensions.get('window').width;

const items = [
    { thumbnail: { uri: 'https://asset.kompas.com/crops/HCdOA_YgukXsWujI8QG4z7f2bpw=/14x0:668x436/750x500/data/photo/2019/09/16/5d7f156c36b28.png' } },
    { thumbnail: { uri: 'https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_VivoBook_A407UB/ASUS_VivoBook_A407UB_L_1.jpg' } },
    { thumbnail: { uri: 'https://ae01.alicdn.com/kf/UTB82ZPMDBahduJk43Jaq6zM8FXaA/Baru-Canon-EOS-1300D-Pemberontak-T6-DSLR-Wi-fi-Camera-With-18-55-Mm-Lensa.jpg' } },
    { thumbnail: { uri: 'https://bdsmplayshop.com/wp-content/uploads/2019/09/81ATed9PVQL._SL1500_.jpg' } },
];

class Toko extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataVendor: [],
            dataSource: {},
            swipeablePanelActive: false,
        };
        (this._scroll_y = new Value(0)), (this.scroll_x = new Value(0));
    }

    // componentDidMount() {
    //     var that = this;
    //     let items = Array.apply(null, Array(5)).map((v, i) => {
    //         return {
    //             id: i,
    //             src: 'http://placehold.it/200x200?text=' + (i + 1),
    //         };
    //     });
    //     that.setState({
    //         dataSource: items,
    //     });
    // }

    renderItem = ({ item, index }) => (
        <TouchableOpacity>
            <Image style={{ height: '100%', width: '100%', resizeMode: 'stretch' }} source={item.thumbnail} />
        </TouchableOpacity>
    );

    // componentDidMount() {
    //     axios
    //         .get(`${apiUrl}/api/vendor`)
    //         .then((res) => {
    //             this.setState({
    //                 dataVendor: res.data,
    //             });
    //             //console.log('res', res.data);
    //         })
    //         .catch((err) => console.log('err', err));
    // }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };

    render() {
        const { dataVendor } = this.state;
        const { profile } = this.props.profile;
        randomNumber = Math.floor(Math.random() * 7);

        const _diff_clamp_scroll_y = Animated.diffClamp(this._scroll_y, 0, 50);

        const _header_height = Animated.interpolate(_diff_clamp_scroll_y, {
            inputRange: [0, 70],
            outputRange: [70, 0],
            extrapolate: 'clamp',
        });

        const _header_translate_y = Animated.interpolate(_diff_clamp_scroll_y, {
            inputRange: [0, 50],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });

        const _header_opacity = Animated.interpolate(_diff_clamp_scroll_y, {
            inputRange: [0, 50],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        // personal card container
        const _card_width = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [100, 50],
            extrapolate: 'clamp',
        });
        const _card_height = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [170, 50],
            extrapolate: 'clamp',
        });
        const _card_position_top = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 60],
            extrapolate: 'clamp',
        });
        const _card_position_left = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [10, 0],
            extrapolate: 'clamp',
        });
        const _card_border_left_radius = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [16, 0],
            extrapolate: 'clamp',
        });

        // image container
        const _image_container_height = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [100, 40],
            extrapolate: 'clamp',
        });
        const _image_container_margin = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 4],
            extrapolate: 'clamp',
        });
        const _image_container_border_radius = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 40],
            extrapolate: 'clamp',
        });

        // cta container
        const _cta_container_padding_top = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [20, -20],
            extrapolate: 'clamp',
        });
        const _cta_container_opacity = this.scroll_x.interpolate({
            inputRange: [0, 50],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        // icon
        const _icon_scale = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0.6],
            extrapolate: 'clamp',
        });
        const _icon_position_top = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [-15, -28],
            extrapolate: 'clamp',
        });
        const _icon_position_right = this.scroll_x.interpolate({
            inputRange: [0, 100],
            outputRange: [33, -3],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" translucent={true} />
                <Animated.View
                    style={[
                        styles.header,
                        {
                            height: _header_height,
                            transform: [{ translateY: _header_translate_y }],
                            opacity: _header_opacity,
                        },
                    ]}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'white',
                            top: 10,
                        }}
                    >
                        Toko
                    </Text>
                    <View style={{ ...styles.fake_icon_box, top: 10 }}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('SearchFeed')
                            }
                        >
                            <FontAwesome5
                                name="search"
                                size={22}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <Animated.ScrollView
                    style={[styles.scroll_view, {}]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={5}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: { y: this._scroll_y },
                            },
                        },
                    ])}
                >
                    {/* Story */}
                    <View style={styles.container1}>
                        <Animated.View
                            style={[
                                styles.personal_card_container,
                                {
                                    width: _card_width,
                                    height: _card_height,
                                    top: _card_position_top,
                                    left: _card_position_left,
                                    borderTopLeftRadius: _card_border_left_radius,
                                    borderBottomLeftRadius: _card_border_left_radius,
                                },
                            ]}
                        >
                            {/* Image container */}
                            <Animated.View
                                style={[
                                    styles.image_container,
                                    {
                                        height: _image_container_height,
                                        margin: _image_container_margin,
                                        borderRadius: _image_container_border_radius,
                                    },
                                ]}
                            >
                                <Image
                                    source={{
                                        uri:
                                            'https://scontent.fcgk25-1.fna.fbcdn.net/v/t31.0-8/13443200_360429417414849_3584700450972541967_o.jpg?_nc_cat=106&_nc_sid=e3f864&_nc_eui2=AeFi68PojLAphC_Bmm_wMA8EfsRlmUC-6xR-xGWZQL7rFLx6Z108HAIcoAmrAYrx4cABvG5Xb61LR9PUaaxRQutq&_nc_ohc=PWPeB5Nawt8AX9be-GP&_nc_ht=scontent.fcgk25-1.fna&oh=2c105d4fb3e91cac03c15b59f0e528cb&oe=5EF91905',
                                    }}
                                    style={styles.image}
                                />
                            </Animated.View>
                            {/* Call to action */}
                            <Animated.View style={styles.cta_container}>
                                <Animated.Text
                                    style={[
                                        styles.text,
                                        {
                                            paddingTop: _cta_container_padding_top,
                                            opacity: _cta_container_opacity,
                                        },
                                    ]}
                                >
                                    Buat Cerita{'\n'}
                                </Animated.Text>
                                {/* Icon */}
                                <Animated.View
                                    style={[
                                        styles.icon_container,
                                        {
                                            transform: [{ scale: _icon_scale }],
                                            top: _icon_position_top,
                                            right: _icon_position_right,
                                        },
                                    ]}
                                >
                                    <AntDesign
                                        name="plus"
                                        size={18}
                                        color="#ffffff"
                                    />
                                </Animated.View>
                            </Animated.View>
                        </Animated.View>
                        <Animated.ScrollView
                            style={styles.scroll_view}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={5}
                            onScroll={Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: { x: this.scroll_x },
                                    },
                                },
                            ])}
                        >
                            <View style={styles.fake_card_ghost} />
                            <View style={styles.fake_card} />
                            <View style={styles.fake_card} />
                            <View style={styles.fake_card} />
                            <View style={styles.fake_card} />
                            <View style={styles.column_spacer} />
                        </Animated.ScrollView>
                    </View>
                    {/* Story */}
                    {/* Card */}
                    <View style={{ width: screenWidth, height: 5, backgroundColor: '#eee', top: 15 }} />
                    <View style={{ top: 15, backgroundColor: '#eee' }}>
                        <Card style={{ maxWidth: 400, width: '100%' }}>
                            <CardHeader
                                thumbnail={
                                    <Avatar
                                        type="image"
                                        image={<Image source={{ uri: 'https://scontent.fcgk25-1.fna.fbcdn.net/v/t31.0-8/13443200_360429417414849_3584700450972541967_o.jpg?_nc_cat=106&_nc_sid=e3f864&_nc_eui2=AeFi68PojLAphC_Bmm_wMA8EfsRlmUC-6xR-xGWZQL7rFLx6Z108HAIcoAmrAYrx4cABvG5Xb61LR9PUaaxRQutq&_nc_ohc=PWPeB5Nawt8AX9be-GP&_nc_ht=scontent.fcgk25-1.fna&oh=2c105d4fb3e91cac03c15b59f0e528cb&oe=5EF91905' }} />}
                                        size={40}
                                    />
                                }
                                title={'Nama Toko'}
                                subtitle={'Alamat Toko'}
                                action={<IconButton name="more-vert" size={24} />}
                            />
                            <View style={{ flex: 1, top: 5, marginHorizontal: 5 }}>
                                <GridList
                                    data={items}
                                    numColumns={3}
                                    renderItem={this.renderItem}
                                />
                            </View>
                            <CardContent>
                                <Text style={{ color: 'rgba(0,0,0,.6)', fontSize: 14 }}>
                                    Deskripsi Toko
                                </Text>
                            </CardContent>
                            <CardActions
                                leftActionItems={[
                                    <Icon
                                        name="like1"
                                        size={25}
                                        color={'grey'}
                                        iconComponent={AntDesign}
                                    />,
                                    <Text style={{ padding: 4, fontSize: 15 }}>Like</Text>
                                ]}
                                rightActionItems={[
                                    <Icon
                                        name="comment"
                                        size={25}
                                        color={'grey'}
                                        iconComponent={MaterialCommunityIcons}
                                    />,
                                    <Text style={{ padding: 4, fontSize: 15 }}>komen</Text>,
                                    <Icon
                                        name="share"
                                        size={25}
                                        color={'grey'}
                                        iconComponent={Entypo}
                                    />,
                                    <Text style={{ padding: 4, fontSize: 15 }}>bagikan</Text>
                                ]}
                            />
                        </Card>
                        <View style={{ width: screenWidth, height: 10, backgroundColor: '#eee' }} />
                    </View>
                    {/* Card */}
                    <Text></Text>
                </Animated.ScrollView>
            </View >
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps)(Toko);

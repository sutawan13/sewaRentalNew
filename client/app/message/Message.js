import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    ImageBackground,
    StatusBar,
} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';
import ListView from 'deprecated-react-native-listview';

const data = [
    { value: 'Upgrade' },
    { value: 'Settings' },
    { value: 'About' },
    { value: 'Sign out' },
];
const { width, height } = Dimensions.get('window');
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const conversation = [
    {
        sent: true,
        msg: 'Selamat pagi, Pak Brendan',
    },
    {
        sent: false,
        msg: 'Selamat pagi, Sutawan',
    },
];

const EachMsg = (props) => {
    if (props.sent === false) {
        return (
            <View style={styles.eachMsg}>
                <Image
                    source={{ uri: 'https://www.unipulse.tokyo/en/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png' }}
                    style={styles.userPic}
                />
                <View style={styles.msgBlock}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Brendan</Text>
                    <Text style={styles.msgTxt}>{props.msg}</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.rightMsg}>
            <View style={styles.rightBlock}>
                <Text style={styles.rightTxt}>{props.msg}</Text>
            </View>
            <Image
                source={{ uri: 'https://www.unipulse.tokyo/en/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png' }}
                style={styles.userPic}
            />
        </View>
    );
};

console.disableYellowBox = true;
class Message extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows(conversation),
            msg: '',
        };
        this.send = this.send.bind(this);
        this.reply = this.reply.bind(this);
    }

    reply() {
        conversation.unshift({
            sent: false,
            msg: 'React Native  is Awesome!',
        });
        this.setState({
            dataSource: ds.cloneWithRows(conversation),
        });
    }

    send() {
        if (this.state.msg.length > 0) {
            conversation.unshift({
                sent: true,
                msg: this.state.msg,
            });
            this.setState({
                dataSource: ds.cloneWithRows(conversation),
                msg: '',
            });
            setTimeout(() => {
                this.reply();
            }, 2000);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle={'light-content'}
                />
                <ImageBackground
                    source={require('../message/images/background.jpg')}
                    style={styles.image}
                >
                    <View style={styles.header}>
                        <View style={styles.left}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('Home')
                                }
                            >
                                <Icon
                                    name="arrow-back"
                                    color="#fff"
                                    size={23}
                                    style={{ paddingLeft: 10, top: 13 }}
                                />
                            </TouchableOpacity>
                            <Image
                                source={{ uri: 'https://www.unipulse.tokyo/en/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png' }}
                                style={styles.chatImage}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate({
                                        id: 'ProfileView',
                                        name: this.props.name,
                                        image: this.props.image,
                                    });
                                }}
                            >
                                <Text style={styles.chatTitle}>Brendan</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.right}>
                            <Icon
                                name="call"
                                color="#fff"
                                size={25}
                                style={{ right: 20, top: -10 }}
                                onPress={() =>
                                    this.props.navigation.navigate('CallScreen')
                                }
                            />
                        </View>
                    </View>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.keyboard}
                    >
                        <ListView
                            enableEmptySections
                            noScroll
                            renderScrollComponent={(props) => (
                                <InvertibleScrollView {...props} inverted />
                            )}
                            dataSource={this.state.dataSource}
                            contentContainerStyle={{
                                justifyContent: 'flex-end',
                            }}
                            renderRow={(rowData) => (
                                <EachMsg
                                    {...rowData}
                                    image={this.props.image}
                                />
                            )}
                            style={{ flex: 1 }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.input}>
                                <TextInput
                                    style={{ flex: 1 }}
                                    value={this.state.msg}
                                    onChangeText={(msg) =>
                                        this.setState({ msg })
                                    }
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => this.send()}
                                    placeholder="Tulis pesan"
                                    returnKeyType="send"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => this.send()}
                                style={{
                                    height: 50,
                                    width: 50,
                                    position: 'absolute',
                                    borderRadius: 25,
                                    backgroundColor: 'blue',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    left: 245,
                                    top: 12
                                }}
                            >
                                <Icon
                                    name="camera-alt"
                                    color="#fff"
                                    size={25}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.send()}
                                style={{
                                    height: 50,
                                    width: 50,
                                    position: 'absolute',
                                    borderRadius: 25,
                                    backgroundColor: 'blue',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    right: 10,
                                    top: 12
                                }}
                            >
                                <Icon
                                    name="send"
                                    color="#fff"
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }
}

export default Message;

const styles = StyleSheet.create({
    keyboard: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width,
        height,
    },
    header: {
        height: 85,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        top: 23,
    },
    chatTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        top: 13,
        left: 5,
    },
    chatTime: {
        color: '#fff',
        margin: 5,
        fontSize: 12,
        left: 5,
        top: 10,
    },
    chatImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        top: 13,
    },
    input: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 10,
        height: 50,
        width: width - 130,
        borderRadius: 30,
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    eachMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
    },
    rightMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
        alignSelf: 'flex-end',
    },
    userPic: {
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#f8f8f8',
    },
    msgBlock: {
        width: 220,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    rightBlock: {
        width: 220,
        borderRadius: 5,
        backgroundColor: 'blue',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
    },
    msgTxt: {
        fontSize: 15,
        color: 'blue',
        fontWeight: '600',
    },
    rightTxt: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '600',
    },
});

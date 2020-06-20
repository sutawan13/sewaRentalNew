import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
const {height, width} = Dimensions.get('window');

class Bracode extends Component {
    constructor(props){
        super(props);
        this.state={
            isfetched: false,
            isVisible: false
        }
    }
    componentWillMount() {
        setTimeout(() => this.setState({ isfetched: true }), 8000);
    }
    render() {
        const { isfetched } = this.state;
        return (
            <View style={{flex: 1, top: 5}}>
                <View style={styles.container}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignItems: 'center'}}>
                        <ShimmerPlaceholder visible={isfetched} duration={2000} autoRun={true} style={{borderRadius: 25, height: 40, width: 40}}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons 
                                    name="qrcode-scan"
                                    color={'black'}
                                    size={26}
                                    style={{marginHorizontal: 5}}
                                />
                                <Text style={{fontSize: 15, color: 'black'}}>Scan</Text>
                            </TouchableOpacity>
                        </ShimmerPlaceholder>

                            <Text style={{color: '#ddd'}}>|</Text>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <ShimmerPlaceholder autoRun={true} visible={isfetched} duration={2000} style={{height: 40, width: 40, borderRadius: 25}}>
                                <Image 
                                    source={{uri: 'https://lh3.googleusercontent.com/8zSxWSL5U-2KbIgeTHttb5FtDuW07GThugzAzyF75p-J0RQC0hZ0xZNxjZk9kpxk1Q'}}
                                    style={{width: 35, height: 35}}
                                />
                            </ShimmerPlaceholder>
                            <ShimmerPlaceholder autoRun={true} visible={isfetched} duration={2000} style={{top: 8, height: 15, width: 50, borderRadius: 20, left: 1}}>
                                <Text style={{marginHorizontal: 5, fontWeight: 'bold', fontSize: 15, color: 'black'}}>Saldo</Text>
                                <Text ellipsizeMode='tail' numberOfLines={1} style={{left: 5}}>Rp.0</Text>
                            </ShimmerPlaceholder>
                        </TouchableOpacity>

                            <Text style={{color: '#ddd'}}>|</Text>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <ShimmerPlaceholder autoRun={true} visible={isfetched} duration={2000} style={{height: 40, width: 40, borderRadius: 25}}>
                                <Image 
                                    source={{uri: 'https://i.ibb.co/2gqhnQk/bank-finance-dollar-location-pointer-120px.png'}}
                                    style={{width: 40, height: 40}}
                                />
                            </ShimmerPlaceholder>
                            <ShimmerPlaceholder autoRun={true} visible={isfetched} duration={2000} style={{top: 8, height: 15, width: 50, borderRadius: 20, left: 1}}>
                                <Text style={{marginHorizontal: 5, fontWeight: 'bold', fontSize: 15, color: 'black'}}>Point</Text>
                                <Text ellipsizeMode='tail' numberOfLines={1} style={{left: 5}}>0</Text>
                            </ShimmerPlaceholder>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default Bracode;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        height: 60,
        borderRadius: 10, 
        width: width - 20,
        marginHorizontal: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
    }
})
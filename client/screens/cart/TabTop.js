import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Tabs, Tab, Item, Input, Icon, Button, Picker, Form } from 'native-base';
import MyOrder from './MyOrder';
import MyHistory from './MyHistory';

export default class TabTop extends Component {
    static navigationOptions = {
        title: 'Cek Riwayat',
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    render() {
        return (
            <Tabs tabBarUnderlineStyle={{ backgroundColor: 'blue', borderRadius: 10 }}>
                <Tab heading="My Order"
                    tabStyle={{ backgroundColor: '#fff' }}
                    textStyle={{ color: '#1E90FF' }}
                    activeTabStyle={{ backgroundColor: '#fff' }}
                    activeTextStyle={{ color: 'blue' }}
                >
                    <MyOrder />
                </Tab>


                <Tab heading="History"
                    tabStyle={{ backgroundColor: '#fff' }}
                    textStyle={{ color: '#1E90FF' }}
                    activeTabStyle={{ backgroundColor: '#fff' }}
                    activeTextStyle={{ color: 'blue' }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MyHistory />
                    </View>
                </Tab>
            </Tabs>
        )
    }
}

// const styles = StyleSheet.create({
//     buyButton: {
//         backgroundColor: 'blue',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     inputLabel: {
//         fontSize: 13,
//         color: '#9e9e9e',
//         left: 3
//     },
//     contactIcon: {
//         flex: 0.1,
//         fontSize: 23,
//         color: '#bdbdbd',
//         marginTop: 11,
//         marginLeft: 10
//     },
//     formInput: {
//         flex: 0.9,
//         height: 25,
//         paddingLeft: 0,
//         marginTop: 10
//     }
// })
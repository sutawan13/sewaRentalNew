import React, { Component } from 'react'
import { Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

export default class MyApps extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView
                    style={{
                        justifyContent: 'center',
                        flex: 1,
                    }}>
                    <ScrollView
                        style={{
                            width: '100%',
                            padding: 12,
                            maxHeight: 500,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 15,
                            }}>
                            {['#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71'].map(
                                color => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            actionSheetRef.current?.setModalVisible();
                                        }}
                                        key={color}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 100,
                                            backgroundColor: color,
                                        }}
                                    />
                                ),
                            )}
                        </View>

                        <TextInput
                            style={{
                                width: '100%',
                                minHeight: 50,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: '#f0f0f0',
                                marginBottom: 15,
                                paddingHorizontal: 10,
                            }}
                            multiline={true}
                            placeholder="Write your text here"
                        />

                        <View style={{}}>
                            {[
                                100,
                                60,
                                150,
                                200,
                                170,
                                80,
                                41,
                                101,
                                61,
                                151,
                                202,
                                172,
                                82,
                                43,
                                103,
                                64,
                                155,
                                205,
                                176,
                                86,
                                46,
                                106,
                                66,
                                152,
                                203,
                                173,
                                81,
                                42,
                            ].map(item => (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => {

                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: item,
                                            height: 15,
                                            backgroundColor: '#f0f0f0',
                                            marginVertical: 15,
                                            borderRadius: 5,
                                        }}
                                    />

                                    <View
                                        style={{
                                            width: 30,
                                            height: 30,
                                            backgroundColor: '#f0f0f0',
                                            borderRadius: 100,
                                        }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}

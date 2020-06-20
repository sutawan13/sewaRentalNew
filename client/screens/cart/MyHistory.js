import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import DropDownItem from 'react-native-drop-down-item';
import { Ionicons } from 'react-native-vector-icons';

type Props = {};
const IC_ARR_DOWN = { uri: 'https://i.ibb.co/wYmMm4T/icons8-below-100.png' };
const IC_ARR_UP = { uri: 'https://i.ibb.co/BLcLwFh/icons8-send-letter-100.png' };
export default class MyHistory extends Component {
    constructor() {
        super()
        this.state = {
            contents: [
                {
                    title: "Title 1",
                    body: "Hi. I love this component. What do you think?"
                },

            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <ScrollView style={{ alignSelf: 'stretch' }}>
                    {
                        this.state.contents
                            ? this.state.contents.map((param, i) => {
                                return (
                                    <DropDownItem
                                        key={i}
                                        style={styles.dropDownItem}
                                        contentVisible={false}
                                        invisibleImage={IC_ARR_DOWN}
                                        visibleImage={IC_ARR_UP}
                                        header={
                                            <View>
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: 'blue',
                                                }}>{param.title}</Text>
                                            </View>
                                        }
                                    >
                                        <Text style={[
                                            styles.txt,
                                            {
                                                fontSize: 20,
                                            }
                                        ]}>
                                            {param.body}
                                        </Text>
                                    </DropDownItem>
                                );
                            })
                            : null
                    }
                    <View style={{ height: 96 }} />
                </ScrollView> */}
            </View>

        )
    }
}


// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(MyHistory)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTxt: {
        fontSize: 12,
        color: 'rgb(74,74,74)',
        marginRight: 60,
        flexWrap: 'wrap',
    },
    txt: {
        fontSize: 14,
    },
});

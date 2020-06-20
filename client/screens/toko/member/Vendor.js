import React, {Component} from 'react';
import { View, StyleSheet, Text, StatusBar, Dimensions, ScrollView} from 'react-native';
import {
  Backdrop,
  List,
  ListItem,
  Icon,
  IconButton,
  Avatar,
  Heading,
  Select,
  TextField,
  BodyText,
  Caption,
  Button,
} from 'material-bread';

  
  const data = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];

const {width} = Dimensions.get('window');

class Vendor extends Component {
    constructor(props){
    super(props);
        this.state = {
            selectedItem: '',
            selectedItemTwo: '',
            outlinedOne: '',
            outlinedTwo: '',
            outlinedThree: '',
        }
    }
    render(){
        return(
            <View style={{ flex: 1, padding: 0}}>
            <StatusBar backgroundColor="blue" translucent barStyle={'light-content'} />
            <View
              style={{
                flex: 1,
                width: '100%',
                top: 20,
                backgroundColor: 'blue'
              }}>
              <Backdrop
                subheader={'Ayo, buat toko pertama mu!'}
                backLayerConcealed={
                  <View style={styles.backdropHeader}>
                    <Text style={styles.backdropHeaderTitle}>Menu</Text>
                  </View>
                }
                backLayerRevealed={
                  <View style={{ flex: 1, width: '100%', backgroundColor: 'blue'}}>
                    <View style={styles.backdropHeader}>
                      <Text style={styles.backdropHeaderTitle}>Profil</Text>
                    </View>
      
                    <List
                      style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                      }}>
                      <ListItem
                        text={'Sutawan'}
                        textStyle={{ color: 'white' }}
                        selected
                        style={{ backgroundColor: 'transparent' }}
                        icon={<Icon name={'user'} size={24} color={'white'} />}
                      />
                      <ListItem
                        text={'Favorites'}
                        textStyle={{ color: 'white' }}
                        style={{ backgroundColor: 'transparent' }}
                        icon={<Icon name={'favorite'} size={24} color={'white'} />}
                      />
                      <ListItem
                        text={'Settings'}
                        textStyle={{ color: 'white' }}
                        style={{ backgroundColor: 'transparent' }}
                        icon={<Icon name={'settings'} size={24} color={'white'} />}
                      />
                    </List>
                  </View>
                }
                offset={260}>
                <View style={styles.container}>
                    <Heading
                        text={'Lengkapi Form'}
                        style={{
                        alignSelf: 'flex-start',
                        marginLeft: 20,
                        fontSize: 20,
                        }}
                    />

                    <View style={{width: width - 20}}>
                        <Select
                            type={'outlined'}
                            label={'Pilih Kategori'}
                            containerStyle={{ marginTop: 20 }}
                            menuItems={data}
                            onSelect={value => this.setState({ selectedItem: value.name })}
                            selectedItem={this.state.selectedItem}
                        />
                        <TextField
                            type={'outlined'}
                            containerStyle={{ marginTop: 20 }}
                            label={'Nama Barang'}
                            leadingIcon={
                                <Icon name={'date-range'} size={24} color={'#6e6e6e'} />
                            }
                            value={this.state.outlinedOne}
                            onChangeText={value => this.setState({ outlinedOne: value })}
                        />
                        <TextField
                            type={'outlined'}
                            containerStyle={{ marginTop: 20 }}
                            label={'Harga'}
                            prefix={<BodyText text="Rp." style={{right: 8}}/>}
                            value={this.state.outlinedThree}
                            onChangeText={value => this.setState({ outlinedThree: value })}
                        />
                        <TextField
                            type={'outlined'}
                            containerStyle={{ marginTop: 20 }}
                            label={'Jumlah Barang'}
                            suffix={<Caption text="Stok" />}
                            value={this.state.outlinedOne}
                            onChangeText={value => this.setState({ outlinedOne: value })}
                        />
                        <TextField
                            type={'outlined'}
                            containerStyle={{ marginTop: 20 }}
                            label={'Upload Gambar'}
                            trailingIcon={
                                <Icon name={'date-range'} size={24} color={'#6e6e6e'} />
                            }
                            value={this.state.outlinedOne}
                            onChangeText={value => this.setState({ outlinedOne: value })}
                        />
                        <TextField
                            type={'outlined'}
                            containerStyle={{ marginTop: 20 }}
                            label={'Deskripsi'}
                            multiline
                            value={this.state.outlinedTwo}
                            onChangeText={value => this.setState({ outlinedTwo: value })}
                        />
                    </View>

                    {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: 90, width: width}}>
                        <Button
                            text={'Simpan'}
                            color={'blue'}
                            radius={0}
                            type="flat"
                        />
                    </View> */}
                </View>
              </Backdrop>
            </View>
          </View>
        )
    }
}

export default Vendor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },

  contentText: {
    color: 'black',
    alignSelf: 'center',
  },
  backdropHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  backdropHeaderTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    marginLeft: 72,
  },
});
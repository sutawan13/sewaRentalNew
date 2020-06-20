import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { Container, Button, Icon, Tabs, Tab, StyleProvider, Content, Thumbnail, Card, CardItem, Body, Badge } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Swiper from 'react-native-swiper';
import { CountDown } from 'react-native-countdown-component';
import { LinearGradient } from 'expo-linear-gradient';
// import DigitalTabs from '../promosi/DigitalTabs';
import HomeCategory from '../promosi/HomeCategory';
const { width } = Dimensions.get('window');

export default class ProductPilihan extends Component {
	constructor() {
		super();

		this.state = {
			flashBg: { uri: 'https://png.pngtree.com/thumb_back/fh260/back_pic/02/66/55/50578b1ecd8c4ae.jpg' },
		};
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground style={styles.flashBg} source={this.state.flashBg}>
					<Grid style={{ padding: 10 }}>
						<Row>
							<Col style={{ flex: 3 }}>
								<Text style={{ color: '#fff', fontWeight: 'bold' }}>Flash Rent</Text>
							</Col>
							<Col style={{ flex: 5 }}>
								<CountDown
									until={100}
									size={12}
									digitStyle={{ backgroundColor: '#fff' }}
									digitTxtStyle={{ color: '#000' }}
									timeLabelStyle={{ color: '#fff' }}
									// onFinish={() => alert('Wah, waktu mu sudah habis')}
									timeToShow={['H', 'M', 'S']}
									labelH={''}
									labelM={''}
									labelS={''}
									style={styles.countdown}
								/>
							</Col>
							<Col style={{ flex: 4 }}>
								<Button small style={styles.flashBtn} onPress={() => this.props.navigation.navigate('Products')} >
									<Text style={styles.flashBtnText}>Lihat Semua</Text>
								</Button>
							</Col>
						</Row>
						<Row>
							<Col>
								<ScrollView horizontal={true} style={{ top: 5 }} indicatorStyle={'blue'}>
									<View style={[styles.flashProductOuter, { marginLeft: 0 }]}>
										<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('ProductDetails')}>
											<ImageBackground style={styles.flashWrapperBg} source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }}>
												<Text style={styles.productOffer}>Label diskon</Text>
											</ImageBackground>
											<Text style={styles.priceBefore}>
												Sempel diskon
											</Text>
											<Text style={styles.priceAfter}>
												Harga
											</Text>
											<View style={styles.saleProgress}>
												<LinearGradient
													colors={['rgb(240,248,255)', 'rgb(0,0,255)']}
													style={{ flex: 0.25, height: '100%' }}
													start={{ x: 0, y: 0 }}
													end={{ x: 1, y: 0 }}
												>
												</LinearGradient>
												<View style={{ flex: 0.75, height: '100%', backgroundColor: 'rgb(224, 224, 224)' }} />
											</View>
											<Text style={styles.stockStatus}>Status barang</Text>
										</TouchableOpacity>
									</View>
									<View style={styles.flashProductOuter}>
										<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('ProductDetails')}>
											<ImageBackground style={styles.flashWrapperBg} source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }}>
												<Text style={styles.productOffer}>Label diskon</Text>
											</ImageBackground>
											<Text style={styles.priceBefore}>
												Sempel diskon
											</Text>
											<Text style={styles.priceAfter}>
												Harga
											</Text>
											<View style={styles.saleProgress}>
												<View style={{ flex: 1, height: '100%', backgroundColor: 'rgb(224, 224, 224)' }} />
											</View>
											<Text style={styles.stockStatus}>Status barang</Text>
										</TouchableOpacity>
									</View>
									<View style={styles.flashProductOuter}>
										<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('ProductDetails')}>
											<ImageBackground style={styles.flashWrapperBg} source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }}>
												<Text style={styles.productOffer}>Label diskon</Text>
											</ImageBackground>
											<Text style={styles.priceBefore}>
												Sempel diskon
											</Text>
											<Text style={styles.priceAfter}>
												Harga
											</Text>
											<View style={styles.saleProgress}>
												<LinearGradient
													colors={['rgb(240,248,255)', 'rgb(0,0,255)']}
													style={{ flex: 0.1, height: '100%' }}
													start={{ x: 0, y: 0 }}
													end={{ x: 1, y: 0 }}
												>
												</LinearGradient>
												<View style={{ flex: 0.9, height: '100%', backgroundColor: 'rgb(224, 224, 224)' }} />
											</View>
											<Text style={styles.stockStatus}>Status barang</Text>
										</TouchableOpacity>
									</View>
									<View style={styles.flashProductOuter}>
										<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('ProductDetails')}>
											<ImageBackground style={styles.flashWrapperBg} source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }}>
												<Text style={styles.productOffer}>Label diskon</Text>
											</ImageBackground>
											<Text style={styles.priceBefore}>
												Sempel diskon
											</Text>
											<Text style={styles.priceAfter}>
												Harga
											</Text>
											<View style={styles.saleProgress}>
												<LinearGradient
													colors={['rgb(240,248,255)', 'rgb(0,0,255)']}
													style={{ flex: 0.1, height: '100%' }}
													start={{ x: 0, y: 0 }}
													end={{ x: 1, y: 0 }}
												>
												</LinearGradient>
												<View style={{ flex: 0.9, height: '100%', backgroundColor: 'rgb(224, 224, 224)' }} />
											</View>
											<Text style={styles.stockStatus}>Status barang</Text>
										</TouchableOpacity>
									</View>
								</ScrollView>
							</Col>
						</Row>
					</Grid>
				</ImageBackground>

				<View style={{ backgroundColor: '#eee' }}>
					<View style={styles.tagsOuter}>
						<View style={{ padding: 15, justifyContent: 'center' }}>
							<Text style={styles.tagsTitle}>Produk Otomotif Pilihan</Text>
						</View>

						<View style={styles.tagsCol}>
							<Image source={{ uri: 'https://i.ibb.co/MhgnXbX/TOP-IMAGE-BANNER.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
						</View>
						<View style={styles.tagsCol}>
							<Image source={{ uri: 'https://i.ibb.co/PFGZYMt/BOT-IMAGE-BANNER.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
						</View>
					</View>

					<View style={styles.tagsOuter}>
						<View style={{ padding: 15, justifyContent: 'center' }}>
							<Text style={styles.tagsTitle}>Produk Elektronik Pilihan</Text>
						</View>

						<View style={styles.tagsCol}>
							<Image source={{ uri: 'https://i.ibb.co/MhgnXbX/TOP-IMAGE-BANNER.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
						</View>
						<View style={styles.tagsCol}>
							<Image source={{ uri: 'https://i.ibb.co/PFGZYMt/BOT-IMAGE-BANNER.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
						</View>
					</View>

					<View style={styles.tagsOuter}>
						<View style={{ padding: 15, justifyContent: 'center' }}>
							<Text style={styles.tagsTitle}>Produk Pilihan</Text>
						</View>

						<View style={styles.tagsCol}>
							<Image source={{ uri: 'https://i.ibb.co/MhgnXbX/TOP-IMAGE-BANNER.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
						</View>
						<View style={styles.tagsCol}>
							<Image source={{ uri: 'https://i.ibb.co/PFGZYMt/BOT-IMAGE-BANNER.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
							<Image source={{ uri: 'https://i.ibb.co/gZ9mMDn/PRODUCT.jpg' }} style={styles.tagsImg} />
						</View>
					</View>
					{/* 
					<View style={styles.tagsOuter}>
						<View style={{padding:15, justifyContent:'center'}}>
							<Text style={styles.tagsTitle}>Produk Digital</Text>
						</View>

						<DigitalTabs />
					</View> */}

				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	slideImage: {
		width,
		height: 193
	},
	iconThumb: {
		position: 'relative',
		top: 0,
		alignSelf: 'center'
	},
	iconText: {
		fontSize: 10,
		textAlign: 'center'
	},
	flashBg: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		resizeMode: 'center'
	},
	flashLeft: {
		flex: 7,
		color: '#ffffff'
	},
	flashBtn: {
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	flashBtnText: {
		color: 'blue',
		fontSize: 10,
		fontWeight: 'bold'
	},
	countdown: {
		fontWeight: 'bold',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	flashProductOuter: {
		backgroundColor: '#fff',
		padding: 8,
		width: 120,
		borderRadius: 4,
		marginLeft: 20
	},
	flashWrapperBg: {
		width: '100%',
		height: 100,
		resizeMode: 'stretch'
	},
	productOffer: {
		backgroundColor: 'rgb(253, 235, 236)',
		color: 'rgb(0, 0, 255)',
		fontSize: 7,
		overflow: 'hidden',
		borderRadius: 16,
		borderWidth: 1,
		borderColor: 'rgb(0, 0, 255)',
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 1,
		paddingLeft: 5,
		paddingRight: 5,
		textAlign: 'center',
		justifyContent: 'center',
		fontWeight: 'bold'
	},
	priceBefore: {
		textDecorationLine: 'line-through',
		textDecorationStyle: 'solid',
		fontSize: 11,
		color: '#9e9e9e'
	},
	priceAfter: {
		fontSize: 12,
		color: 'blue',
		marginTop: 5,
		fontWeight: 'bold'
	},
	saleProgress: {
		marginTop: 7,
		flex: 1,
		flexDirection: 'row',
		height: 4,
		borderRadius: 20
	},
	stockStatus: {
		fontSize: 10,
		color: '#757575',
		marginTop: 1,
		marginBottom: 5
	},
	tagsOuter: {
		backgroundColor: '#fff',
		marginTop: 8
	},
	tagsTitle: {
		color: '#212121',
		fontSize: 14,
		fontWeight: 'bold'
	},
	tagsCol: {
		flex: 1,
		flexDirection: 'row',
		height: 130
	},
	tagsImg: {
		flex: 1,
		width: '100%',
		height: '100%',
		resizeMode: 'stretch'
	}
});
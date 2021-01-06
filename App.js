import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	Modal,
	Keyboard,
	Alert,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import data from './data';
import ProducersList from './components/ProducersList';

class App extends Component {
	constructor() {
		super();
		this.state = {
			coffee: data.coffee,
			CPS: data.totalCPS,
			producers: data.producers,
			unlockedProducers: [],
			modalOpen: false,
		};
		this.handleCoffeePress = this.handleCoffeePress.bind(this);
		this.handleBuyProducer = this.handleBuyProducer.bind(this);
	}

	componentDidMount() {
		this.timeOut();
		this.setState({
			unlockedProducers: this.unlockProducers(),
		});
	}

	componentDidUpate() {
		this.timeOut();
	}

	componentWillUnmount() {
		clearInterval(this.timeOut);
	}

	handleCoffeePress = () => {
		clearInterval(this.timeOut);
		this.setState({
			coffee: this.state.coffee + 1,
		});
	};

	handleBuyProducer = (producerId) => {
		const valid = this.attemptToBuyProducer(producerId);
		if (!valid) {
			return Alert.alert('Warning!', 'Not enough coffee :c', [
				{ text: 'Okay', onPress: () => console.log('Okay pressed') },
			]);
		}
		this.setState({
			producers: this.state.producers.map((producer) =>
				producer.id === producerId ? valid : producer
			),
		});
	};

	timeOut = () =>
		setInterval(async () => {
			const { coffee, CPS, producers } = this.state;
			await Promise.all([
				await this.setState({ coffee: coffee + CPS }),
				await this.setState({
					producers: this.unlockProducers(),
				}),
				await this.setState({
					unlockedProducers: producers.filter((producer) => producer.unlocked),
				}),
			]);
		}, 1000);

	unlockProducers = () => {
		return this.state.producers.map((producer) => {
			if (producer.price / 2 <= this.state.coffee) producer.unlocked = true;
			return producer;
		});
	};

	getProducerById = (producerId) =>
		this.state.producers.filter((producer) => producer.id === producerId)[0];

	canAffordProducer = (producerId) =>
		this.getProducerById(producerId).price <= this.state.coffee;

	updatePrice = (oldPrice) => Math.floor(oldPrice * 1.25);

	attemptToBuyProducer = (producerId) => {
		if (this.canAffordProducer(producerId)) {
			let producer = this.getProducerById(producerId);
			producer.qty++;
			this.setState({ coffee: this.state.coffee - producer.price });
			producer.price = this.updatePrice(producer.price);
			this.setState({ CPS: this.state.CPS + producer.cps });
			return producer;
		}
		return false;
	};

	render() {
		const { coffee, CPS, unlockedProducers, modalOpen } = this.state;

		return (
			<View style={styles.container}>
				<Modal visible={modalOpen} animationType="slide">
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.modalContent}>
							<MaterialIcons
								style={{ ...styles.modalToggle, ...styles.modalClose }}
								name="close"
								size={24}
								onPress={() => this.setState({ modalOpen: false })}
							/>
							<ProducersList
								producers={unlockedProducers}
								handleBuyProducer={this.handleBuyProducer}
							/>
						</View>
					</TouchableWithoutFeedback>
				</Modal>

				<View>
					<View style={styles.coffeeInfo}>
						<Text>{coffee} coffee</Text>
						<Text>{CPS} per sec</Text>
					</View>

					<TouchableWithoutFeedback onPress={this.handleCoffeePress}>
						<Image
							style={styles.image}
							source={require('./assets/latte.png')}
						/>
					</TouchableWithoutFeedback>
				</View>

				<MaterialIcons
					style={styles.modalToggle}
					name="upgrade"
					size={24}
					color="black"
					onPress={() => this.setState({ modalOpen: true })}
				/>

				<StatusBar style="auto" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	coffeeInfo: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	image: {
		height: 150,
		width: 150,
	},
	modalClose: {
		marginTop: 20,
		marginBottom: 0,
	},
	modalContent: {
		padding: 40,
		flex: 1,
	},
	modalToggle: {
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#f2f2f2',
		padding: 10,
		borderRadius: 10,
		alignSelf: 'center',
	},
});

export default App;

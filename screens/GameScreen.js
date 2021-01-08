import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Modal,
	Keyboard,
	Alert,
} from 'react-native';

import data from '../data';
import ProducersList from '../components/ProducersList';

import { MaterialIcons } from '@expo/vector-icons';

class GameScreen extends Component {
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
		this.handleSellProducer = this.handleSellProducer.bind(this);
	}

	componentDidMount() {
		// this.timeOut();
		this.setState({
			unlockedProducers: this.unlockProducers(),
		});
	}

	componentDidUpate() {
		// this.timeOut();
	}

	componentWillUnmount() {
		// clearInterval(this.timeOut);
	}

	handleCoffeePress = () => {
		// clearInterval(this.timeOut);
		this.setState({
			coffee: this.state.coffee + 1,
		});
	};

	handleBuyProducer = async (producerId, price, multiPrice, quantity) => {
		if (price > this.state.coffee || multiPrice > this.state.coffee) {
			return Alert.alert('Warning!', 'Not enough coffee :c', { text: 'Ok' });
		}
		let newProducer;
		for (let i = 0; i < quantity; i++) {
			newProducer = await this.attemptToBuyProducer(producerId);
		}
		this.setState({
			producers: this.state.producers.map((producer) =>
				producer.id === producerId ? newProducer : producer
			),
		});
	};

	handleSellProducer = (newProducer, quantity) => {
		this.setState({
			coffee: this.state.coffee + newProducer.refund,
			CPS: this.state.CPS - quantity * newProducer.cps,
		});
		newProducer.qty -= quantity;
		newProducer.refund = 0;
		newProducer.price = newProducer.startPrice;
		for (let i = 0; i < newProducer.qty; i++) {
			newProducer.price = this.updatePrice(newProducer.price);
		}
		this.setState({
			producers: this.state.producers.map((producer) =>
				producer.id === newProducer.id ? newProducer : producer
			),
		});
	};

	timeOut = () =>
		setInterval(async () => {
			const { coffee, CPS, producers } = this.state;
			await Promise.all([
				this.setState({ coffee: coffee + CPS }),
				this.setState({
					producers: this.unlockProducers(),
				}),
				this.setState({
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

	updatePrice = (oldPrice) => Math.floor(oldPrice * 1.25);

	attemptToBuyProducer = async (producerId) => {
		let producer = this.getProducerById(producerId);
		producer.qty++;
		await this.setState({
			coffee: this.state.coffee - producer.price,
			CPS: this.state.CPS + producer.cps,
		});
		producer.price = this.updatePrice(producer.price);
		return producer;
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
								handleSellProducer={this.handleSellProducer}
							/>
						</View>
					</TouchableWithoutFeedback>
				</Modal>

				<View>
					<View style={styles.coffeeInfo}>
						<Text>{coffee} coffee</Text>
						<Text>{CPS} per sec</Text>
					</View>

					<TouchableOpacity onPress={this.handleCoffeePress}>
						<Image
							style={styles.image}
							source={require('../assets/latte.png')}
						/>
					</TouchableOpacity>
				</View>

				<MaterialIcons
					style={styles.modalToggle}
					name="upgrade"
					size={24}
					color="black"
					onPress={() => this.setState({ modalOpen: true })}
				/>
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
	},
	modalToggle: {
		borderWidth: 1,
		shadowOffset: { width: 1, height: 1 },
		shadowColor: '#333',
		shadowOpacity: 0.3,
		shadowRadius: 2,
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 10,
		alignSelf: 'center',
	},
});

export default GameScreen;

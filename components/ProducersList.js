import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';

import SingleProducer from './SingleProducer';
import BuyAndSell from './BuyAndSell';

export default function ProducersList({ producers, handleBuyProducer }) {
	const [isBuying, setIsBuying] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const [localProducers, setLocalProducers] = useState(producers);

	const newPrice = (oldPrice) => {
		let start = oldPrice;
		let result = 0;
		for (let i = 0; i < quantity; i++) {
			result += start;
			start = Math.floor(start * 1.25);
		}
		return result;
	};

	const newRefund = (startPrice, producerQty) => {
		let start = startPrice;
		let result = 0;
		const range = quantity > producerQty ? producerQty : quantity;
		for (let i = 0; i < range; i++) {
			result += start;
			start = Math.floor(start * 1.25);
		}
		return result;
	};

	useEffect(() => {
		setLocalProducers(
			localProducers.map((producer) => {
				producer.multiPrice = newPrice(producer.price);
				producer.refund = newRefund(producer.startPrice, producer.qty);
				return producer;
			})
		);
	}, [isBuying, quantity]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Upgrades</Text>
			<BuyAndSell
				isBuying={isBuying}
				quantity={quantity}
				selectOption={setIsBuying}
				setQuantity={setQuantity}
			/>
			<FlatList
				style={styles.flatList}
				data={localProducers}
				renderItem={({ item }) => (
					<SingleProducer
						key={item.id}
						producer={item}
						handleBuyProducer={handleBuyProducer}
						isBuying={isBuying}
						quantity={quantity}
					/>
				)}
				ListEmptyComponent={
					<Text style={styles.error}>
						You neeed more coffee! Start clickin'!
					</Text>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	error: {
		fontSize: 18,
		color: 'red',
		alignSelf: 'center',
	},
	flatList: {
		marginTop: 10,
		// borderWidth: 1,
		width: Dimensions.get('screen').width - 20,
		height: 650,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});

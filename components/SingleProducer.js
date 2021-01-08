import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function SingleProducer({
	producer,
	producer: { id, qty, cps, price, multiPrice, refund },
	handleBuyProducer,
	handleSellProducer,
	isBuying,
	quantity,
}) {
	const convertId = () => {
		return id
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	return (
		<TouchableOpacity
			style={styles.producer}
			onPress={() =>
				isBuying
					? handleBuyProducer(id, price, multiPrice, quantity)
					: handleSellProducer(producer, quantity > qty ? qty : quantity)
			}
		>
			<View style={styles.content}>
				<Text>{convertId()}</Text>
				<Text>Quantity: {qty}</Text>
				<Text>Coffee/second: {cps}</Text>
				{isBuying ? (
					<Text>Price: {multiPrice > price ? multiPrice : price}</Text>
				) : (
					<Text>Refund: {refund}</Text>
				)}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	content: {
		marginHorizontal: 18,
		marginVertical: 20,
	},
	producer: {
		borderRadius: 6,
		backgroundColor: '#fff',
		shadowOffset: { width: 1, height: 1 }, // basically a box shadow
		shadowColor: '#333',
		shadowOpacity: 0.3,
		shadowRadius: 2, // how the shadow blends in
		marginHorizontal: 4,
		marginVertical: 6,
	},
});

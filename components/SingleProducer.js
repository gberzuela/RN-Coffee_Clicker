import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Pressable,
} from 'react-native';

export default function SingleProducer({
	producer: { id, qty, cps, price, unlocked },
	handleBuyProducer,
}) {
	const convertId = () => {
		return id
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const handlePress = () => {
		console.log(`${id} was pressed`);
	};

	return (
		<TouchableOpacity
			style={styles.producer}
			onPress={() => handleBuyProducer(id)}
		>
			<View style={styles.content}>
				<Text>{convertId()}</Text>
				<Text>Quantity: {qty}</Text>
				<Text>Coffee/second: {cps}</Text>
				<Text>Price: {price}</Text>
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
		elevation: 3, // distance between the card and the back of the screen
		backgroundColor: '#fff',
		shadowOffset: { width: 1, height: 1 }, // basically a box shadow
		shadowColor: '#333',
		shadowOpacity: 0.3,
		shadowRadius: 2, // how the shadow blends in
		marginHorizontal: 4,
		marginVertical: 6,
	},
});

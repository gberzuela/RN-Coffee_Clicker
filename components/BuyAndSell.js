import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Dimensions,
} from 'react-native';

export default function BuyAndSell({
	isBuying,
	quantity,
	selectOption,
	setQuantity,
}) {
	return (
		<View style={styles.container}>
			<View>
				<TouchableWithoutFeedback onPress={() => selectOption(true)}>
					<Text style={isBuying ? styles.selected : styles.text}>Buy</Text>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => selectOption(false)}>
					<Text style={!isBuying ? styles.selected : styles.text}>Sell</Text>
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.options}>
				<TouchableWithoutFeedback onPress={() => setQuantity(1)}>
					<Text style={quantity === 1 ? styles.selected : styles.text}>x1</Text>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => setQuantity(10)}>
					<Text style={quantity === 10 ? styles.selected : styles.text}>
						x10
					</Text>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => setQuantity(25)}>
					<Text style={quantity === 25 ? styles.selected : styles.text}>
						x25
					</Text>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingTop: 10,
		width: Dimensions.get('screen').width - 20,
		justifyContent: 'space-between',
	},
	options: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	selected: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	text: {
		fontSize: 16,
	},
});

import React from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';

import SingleProducer from './SingleProducer';

export default function ProducersList({ producers, handleBuyProducer }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Upgrades</Text>
			<FlatList
				style={styles.flatList}
				data={producers}
				renderItem={({ item }) => (
					<SingleProducer
						key={item.id}
						producer={item}
						handleBuyProducer={handleBuyProducer}
					/>
				)}
				ListEmptyComponent={<Text style={styles.error}>Need more coffee!</Text>}
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
	},
	flatList: {
		marginTop: 20,
		width: Dimensions.get('screen').width - 20,
		height: 650,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});

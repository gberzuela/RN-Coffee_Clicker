import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

export default function FormButton({ buttonTitle, ...rest }) {
	return (
		<TouchableOpacity style={styles.buttonContainer} {...rest}>
			<Text style={styles.buttonText}>{buttonTitle}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 10,
		padding: 10,
		width: '100%',
		height: Dimensions.get('screen').height / 15,
		backgroundColor: '#2e64e5',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#ffffff',
	},
});

import React from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function FormInput({
	iconName,
	labelValue,
	placeholderText,
	...rest
}) {
	return (
		<View style={styles.inputContainer}>
			<View style={styles.iconStyle}>
				<Ionicons name={iconName} size={24} color="black" />
			</View>
			<TextInput
				style={styles.input}
				value={labelValue}
				placeholder={placeholderText}
				placeholderTextColor="#666"
				{...rest}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	iconStyle: {
		padding: 10,
		width: 50,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRightColor: '#ccc',
		borderRightWidth: 1,
	},
	inputContainer: {
		marginTop: 5,
		marginBottom: 10,
		width: '100%',
		height: Dimensions.get('screen').height / 15,
		borderColor: '#ccc',
		borderRadius: 3,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	input: {
		padding: 10,
		flex: 1,
		fontSize: 16,
		color: '#333',
		justifyContent: 'center',
		alignItems: 'center',
	},
	// inputField: {
	// 	padding: 10,
	// 	marginTop: 5,
	// 	marginBottom: 10,
	// 	width: Dimensions.get('screen').width / 1.5,
	// 	height: Dimensions.get('screen').height / 1.5,
	// 	fontSize: 16,
	// 	borderRadius: 8,
	// 	borderWidth: 1,
	// },
});

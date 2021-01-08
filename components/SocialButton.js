import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export default function SocialButton({ buttonTitle, ...rest }) {
	return (
		<TouchableOpacity style={styles.buttonContainer} {...rest}>
			<View styles={styles.iconWrapper}>
				<FontAwesome
					style={styles.icon}
					name="google"
					size={22}
					color="#de4d41"
				/>
			</View>
			<View style={styles.btnTxtWrapper}>
				<Text style={styles.buttonText}>{buttonTitle}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 10,
		padding: 10,
		width: '100%',
		height: Dimensions.get('screen').height / 15,
		backgroundColor: '#f5e7ea',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
		flexDirection: 'row',
	},
	btnTxtWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#de4d41',
	},
	icon: {
		fontWeight: 'bold',
	},
	iconWrapper: {
		width: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

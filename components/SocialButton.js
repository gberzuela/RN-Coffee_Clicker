import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export default function SocialButton({ ...rest }) {
	return (
		<TouchableOpacity style={styles.buttonContainer} {...rest}>
			<View styles={styles.iconWrapper}>
				<FontAwesome
					style={styles.icon}
					name="google"
					size={22}
					color="black"
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
		backgroundColor: '#',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
	},
	btnTxtWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#ffffff',
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

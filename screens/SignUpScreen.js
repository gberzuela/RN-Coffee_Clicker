import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.text}>Create an account</Text>
				<Image style={styles.logo} source={require('../assets/sign-up.png')} />

				<FormInput
					labelValue={email}
					placeholderText="Email"
					iconName="person-outline"
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText={(newEmail) => setEmail(newEmail)}
				/>

				<FormInput
					labelValue={password}
					placeholderText="Password"
					iconName="lock-closed-outline"
					secureTextEntry={true}
					onChangeText={(newPass) => setPassword(newPass)}
				/>

				<FormInput
					labelValue={confirmPassword}
					placeholderText="Confirm Password"
					iconName="lock-closed-outline"
					secureTextEntry={true}
					onChangeText={(newPass) => setConfirmPassword(newPass)}
				/>

				<FormButton
					buttonTitle="Sign Up"
					onPress={() => alert('Sign in clicked')}
				/>

				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Text style={styles.navButtonText}>Have an account? Sign in</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		paddingTop: 50,
	},
	logo: {
		width: 150,
		height: 150,
	},
	navButtonText: {
		paddingTop: 25,
		fontSize: 18,
		fontWeight: '500',
		color: '#2e64e5',
	},
	text: {
		fontSize: 36,
		marginBottom: 10,
		color: '#051d5f',
	},
});

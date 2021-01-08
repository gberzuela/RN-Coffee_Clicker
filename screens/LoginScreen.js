import React, { useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
	Alert,
} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useContext(AuthContext);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>
				<Text style={styles.text}>Coffee Clicker</Text>
				<Image style={styles.logo} source={require('../assets/login.png')} />

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

				<FormButton
					buttonTitle="Sign In"
					onPress={() => login(email, password)}
				/>

				<SocialButton
					buttonTitle="Sign In with Google"
					onPress={() => console.log('Signing in with Google')}
				/>

				<TouchableOpacity
					style={styles.forgotButton}
					onPress={() =>
						Alert.alert('', "Sounds like a personal problem :'c", {
							text: 'Ok',
						})
					}
				>
					<Text style={styles.navButtonText}>Forgot Password?</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate('Sign up')}>
					<Text style={styles.navButtonText}>Don't have an account?</Text>
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
		paddingTop: 100,
	},
	forgotButton: {
		marginTop: 50,
		marginBottom: 20,
	},
	logo: {
		height: 150,
		width: 150,
		marginBottom: 35,
	},
	navButton: {
		marginTop: 15,
	},
	navButtonText: {
		fontSize: 18,
		fontWeight: '500',
		color: '#2e64e5',
	},
	text: {
		fontSize: 28,
		marginBottom: 10,
		paddingVertical: 20,
		color: '#051d5f',
	},
});

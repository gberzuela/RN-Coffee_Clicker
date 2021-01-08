import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator initialRouteName={'Login'}>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{ header: () => null }}
			/>
			<Stack.Screen
				name="Sign up"
				component={SignUpScreen}
				options={({ navigation }) => ({
					title: '',
					headerStyle: {
						backgroundColor: '#f8fafd',
						shadowColor: '#f8fafd',
					},
					headerLeft: () => (
						<FontAwesome
							style={{ marginLeft: 10 }}
							name="long-arrow-left"
							size={26}
							backgroundColor="#f8fafd"
							onPress={() => navigation.navigate('Login')}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
}

import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';

import { FontAwesome } from '@expo/vector-icons';

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Details')}
			/>
		</View>
	);
}

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator initialRouteName={'Login'}>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				// options={{ header: () => null }}
			/>
		</Stack.Navigator>
	);
}

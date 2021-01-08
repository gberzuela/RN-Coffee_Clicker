import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from '../screens/GameScreen';

const Stack = createStackNavigator();

export default function GameStack() {
	return (
		<Stack.Navigator initialRouteName={'Game'}>
			<Stack.Screen
				name="Game"
				component={GameScreen}
				options={{ header: () => null }}
			/>
		</Stack.Navigator>
	);
}

import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from '../screens/GameScreen';
import { AuthContext } from '../navigation/AuthProvider';

import { SimpleLineIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function GameStack() {
	const { logout } = useContext(AuthContext);

	return (
		<Stack.Navigator initialRouteName={'Game'}>
			<Stack.Screen
				name="Game"
				component={GameScreen}
				options={({ navigation }) => ({
					title: '',
					headerStyle: {
						backgroundColor: '#f8fafd',
						shadowColor: '#f8fafd',
					},
					headerLeft: () => (
						<SimpleLineIcons
							style={{ marginLeft: 10 }}
							name="logout"
							size={26}
							backgroundColor="#f8fafd"
							onPress={() => logout()}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
}

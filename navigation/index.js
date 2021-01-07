import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';

export default function Navigator() {
	return (
		<NavigationContainer>
			<AuthStack />
		</NavigationContainer>
	);
}

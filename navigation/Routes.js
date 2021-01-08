import 'react-native-gesture-handler';
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import * as firebase from 'firebase';

import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';

const Routes = () => {
	const { user, setUser } = useContext(AuthContext);
	const [initializing, setInitializing] = useState(true);

	const onAuthStateChanged = (user) => {
		setUser(user);
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (initializing) return null;

	return (
		<NavigationContainer>
			<AuthStack />
		</NavigationContainer>
	);
};

export default Routes;

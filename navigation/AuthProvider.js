import React, { useState, createContext } from 'react';
import { Alert } from 'react-native';
import * as firebase from 'firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				login: async (email, password) => {
					try {
						await firebase.auth().signInWithEmailAndPassword(email, password);
					} catch (error) {
						Alert.alert('', 'Incorrect email or password', [
							{
								text: 'Ok',
							},
						]);
					}
				},
				register: async (email, password) => {
					try {
						await firebase
							.auth()
							.createUserWithEmailAndPassword(email, password);
					} catch (error) {
						console.log('register error -->', error.message);
					}
				},
				logout: async () => {
					try {
						await firebase.auth.signOut();
					} catch (error) {
						console.log('logout error -->', error.message);
					}
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

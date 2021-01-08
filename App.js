import React from 'react';

import Providers from './navigation';

import * as firebase from 'firebase';
import apiKeys from './config/keys';

if (!firebase.apps.length) firebase.initializeApp(apiKeys);

export default function App() {
	return <Providers />;
}

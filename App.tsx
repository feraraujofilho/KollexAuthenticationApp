import React, { useState } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux'
import { store } from './store/store'
import NavigationContainer from './navigators/NavigationContainer'

const fetchFonts = () => {
	return Font.loadAsync({
		'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
		'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
	})
}

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false)

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => {
					setFontLoaded(true)
				}}
			/>
		)
	}
	return (
		<Provider store={store}>
			<NavigationContainer />
		</Provider>
	)
}

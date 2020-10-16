import React, { useState } from 'react'
import MainNavigator from './navigators/MainNavigator'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux'
import { store } from './store/store'

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
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
			<MainNavigator />
		</Provider>
	)
}

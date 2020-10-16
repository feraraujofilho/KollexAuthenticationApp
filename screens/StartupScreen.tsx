import AsyncStorage from '@react-native-community/async-storage'
import React, { FC, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { authenticate } from '../store/auth/authActions'

const StartupScreen: FC = ({ navigation }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorage.getItem('userData')
			if (!userData) {
				navigation.navigate('Auth')
				return
			}
			const transformedData = JSON.parse(userData)
			const { token, userId, expireDate } = transformedData

			const expirationDate = new Date(expireDate)

			if (expirationDate <= new Date() || !token || !userId) {
				navigation.navigate('Auth')
				return
			}

			const expirationTime = expirationDate.getTime() - new Date().getTime()

			navigation.navigate('Shop')
			dispatch(authenticate(userId, token, expirationTime))
		}

		tryLogin()
	}, [dispatch])

	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" color="blue" />
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default StartupScreen

import React, { FC, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DrawerActions, NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import { ActivityIndicator, Image, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch } from 'react-redux'
import { authenticate } from '../store/auth/authActions'
import DrawerNavigator from './DrawerNavitagor'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Colors from '../constants/Colors'
import CustomHeaderButton from '../components/HeaderButton'

const Stack = createStackNavigator()

const MainNavigator: FC = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [userToken, setUserToken] = useState<string | null>(null)

	const dispatch = useDispatch()

	useEffect(() => {
		const getToken = async () => {
			setIsLoading(true)
			const userData = await AsyncStorage.getItem('userData')
			if (userData) {
				const transformedData = JSON.parse(userData)
				const { token, userId, expireDate } = transformedData

				const expirationDate = new Date(expireDate)

				if (expirationDate <= new Date() || !token || !userId) {
					setUserToken(null)
				} else {
					const expirationTime = expirationDate.getTime() - new Date().getTime()

					dispatch(authenticate(userId, token, expirationTime))
				}
				setUserToken(userData)
			}

			setIsLoading(false)
		}
		getToken()
	}, [dispatch])

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{userToken ? (
					<Stack.Screen
						name="Drawer"
						component={DrawerNavigator}
						options={({ navigation }) => ({
							headerTitle: () => (
								<Image
									style={{ width: 100, height: 28 }}
									source={require('../assets/kollexlogo.png')}
								/>
							),
							headerLeft: () => (
								<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
									<Item
										title="Menu"
										color={Colors.primary}
										iconName="ios-menu"
										onPress={() =>
											navigation.dispatch(DrawerActions.toggleDrawer())
										}
									></Item>
								</HeaderButtons>
							),
						})}
					/>
				) : (
					<>
						<Stack.Screen
							name="Login"
							component={LoginScreen}
							options={() => ({
								headerTransparent: true,
								headerTitle: '',
							})}
						/>
						<Stack.Screen
							name="Signup"
							component={SignupScreen}
							options={() => ({
								headerTransparent: true,
								headerTitle: '',
								headerLeft: () => null,
							})}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default MainNavigator

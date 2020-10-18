import React from 'react'
import { Button, Platform, View } from 'react-native'
import {
	createStackNavigator,
	createDrawerNavigator,
	createAppContainer,
	createSwitchNavigator,
	DrawerItems,
	SafeAreaView,
} from 'react-navigation'
import { useDispatch } from 'react-redux'
import Colors from '../constants/Colors'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import StartupScreen from '../screens/StartupScreen'
import { logout } from '../store/auth/authActions'

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	headerTitleStyle: {
		fontFamily: 'montserrat-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'montserrat-light',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const HomeNavigator = createStackNavigator(
	{
		Home: HomeScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
		navigationOptions: {
			headerLeft: null,
		},
	}
)

const ShopNavigator = createDrawerNavigator(
	{
		Home: HomeNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
		},
		contentComponent: (props) => {
			const dispatch = useDispatch()

			return (
				<View style={{ flex: 1, padding: 20 }}>
					<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
						<DrawerItems {...props} />
						<Button
							title="Logout"
							color={Colors.primary}
							onPress={() => {
								dispatch(logout())
							}}
						/>
					</SafeAreaView>
				</View>
			)
		},
	}
)

const AuthNavigator = createStackNavigator(
	{
		Login: LoginScreen,
		Signup: SignupScreen,
	},
	{
		defaultNavigationOptions: {
			headerTransparent: true,
			title: '',
		},
	}
)

const AppNavigator = createSwitchNavigator({
	Startup: StartupScreen,
	Auth: AuthNavigator,
	Shop: ShopNavigator,
})

export default createAppContainer(AppNavigator)

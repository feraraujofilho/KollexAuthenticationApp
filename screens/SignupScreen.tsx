import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AuthFooter from '../components/AuthFooter/AuthFooter'
import HeadingContainer from '../components/HeadingsContainer/HeadingsContainer'
import SignupForm from '../components/SignupForm/SignupForm'
import Colors from '../constants/Colors'
import {
	NavigationScreenComponent,
	NavigationStackScreenOptions,
} from 'react-navigation'
import { ScrollView } from 'react-native-gesture-handler'

const SignupScreen: NavigationScreenComponent<{}> = ({ navigation }) => {
	return (
		<View style={styles.main}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Image
					style={{ width: 200, height: 40, alignSelf: 'center' }}
					source={require('../assets/kollexlogo.png')}
				/>
				<HeadingContainer
					heading1="Create Account,"
					heading2="Sign up to get started!"
				/>
				<SignupForm navigation={navigation} />
				<AuthFooter
					text="I already have an account,"
					linkText="Login"
					onPress={() => navigation.navigate('Login')}
				/>
			</ScrollView>
		</View>
	)
}

SignupScreen.navigationOptions = (): NavigationStackScreenOptions => {
	return {
		headerLeft: null,
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 40,
		paddingTop: 80,
	},
	headerContainer: {
		paddingTop: 70,
		paddingBottom: 50,
		paddingHorizontal: 30,
	},
	loginContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomText: {
		fontSize: 18,
		fontFamily: 'montserrat-light',
	},
	loginText: {
		color: Colors.primary,
		fontSize: 18,
		fontFamily: 'montserrat-bold',
		padding: 5,
	},
})

export default SignupScreen

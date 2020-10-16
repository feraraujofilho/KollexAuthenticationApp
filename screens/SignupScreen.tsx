import React, { FC } from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import AuthFooter from '../components/AuthFooter/AuthFooter'
import Heading1 from '../components/Heading1'
import Heading2 from '../components/Heading2'
import HeadingContainer from '../components/HeadingsContainer/HeadingsContainer'
import LoginForm from '../components/SignupForm/SignupForm'
import Colors from '../constants/Colors'

const SignupScreen: FC = ({ navigation }) => {
	return (
		<View style={styles.main}>
			<HeadingContainer
				heading1="Create Account,"
				heading2="Sign up to get started!"
			/>
			<LoginForm navigation={navigation} />
			<AuthFooter
				text="I already have an account,"
				linkText="Login"
				onPress={() => navigation.navigate('Login')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 40,
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

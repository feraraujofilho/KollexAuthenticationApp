import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AuthFooter from '../components/AuthFooter/AuthFooter'
import HeadingContainer from '../components/HeadingsContainer/HeadingsContainer'
import LoginForm from '../components/LoginForm/LoginForm'
import { NavigationScreenComponent, ScrollView } from 'react-navigation'

const LoginScreen: NavigationScreenComponent<{}> = ({ navigation }) => {
	return (
		<View style={styles.main}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Image
					style={{ width: 250, height: 40, alignSelf: 'center' }}
					source={require('../assets/kollexlogo.png')}
				/>
				<HeadingContainer heading1="Welcome," heading2="Sign in to continue!" />
				<LoginForm navigation={navigation} />
				<AuthFooter
					text="I am a new user,"
					linkText="Signup"
					onPress={() => navigation.navigate('Signup')}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'space-between',
		paddingTop: 100,
		padding: 40,
	},
	formControl: {
		width: '100%',
	},
	label: {
		fontFamily: 'open-sans-bold',
		marginVertical: 8,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	errorContainer: {
		marginVertical: 5,
	},
	errorText: {
		fontFamily: 'open-sans',
		color: 'red',
		fontSize: 13,
	},
})

export default LoginScreen

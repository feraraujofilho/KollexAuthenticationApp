import React, { FC, useState } from 'react'
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import Input from '../components/Input/Input'
import AuthInterface from '../types/AuthInterface'

const Login: FC = ({ navigation }) => {
	const [authentication, setAuthentication] = useState<AuthInterface>({
		email: '',
		password: '',
	})

	const handleChange = (id: string, text: string) => {
		setAuthentication({
			...authentication,
			[id]: text,
		})
	}

	return (
		<View style={styles.main}>
			<Input
				id="email"
				label="E-mail"
				value={authentication.email}
				onChangeHandler={handleChange}
				errorText="Please enter a valid email address."
				email
			/>
			<Input
				id="password"
				label="Password"
				value={authentication.password}
				onChangeHandler={handleChange}
				errorText="Please enter a valid password."
				password
				secureTextEntry
			/>
			<Button title="Login" onPress={() => {}} />
			<View>
				<Text>
					I am a new user,
					<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
						<Text>Signup</Text>
					</TouchableOpacity>
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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

export default Login

import React, { FC, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Button,
	StyleSheet,
	View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { login } from '../../store/auth/authActions'
import AuthInterface from '../../types/AuthInterface'
import Input from '../Input/Input'
import SubmitButton from '../SubmitButton/SubmitButton'
import LoginFormProps from './LoginFormProps'

const LoginForm: FC<LoginFormProps> = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false)

	const [authentication, setAuthentication] = useState<AuthInterface>({
		email: '',
		password: '',
	})

	const dispatch = useDispatch()

	const handleChange = (id: string, text: string) => {
		setAuthentication({
			...authentication,
			[id]: text,
		})
	}

	const submitHandler = async () => {
		setIsLoading(true)
		try {
			await dispatch(login(authentication.email, authentication.password))
			navigation.navigate('Home')
			setIsLoading(false)
		} catch (err) {
			Alert.alert('An Error Ocurred!', err.message, [{ text: 'Okay' }])
			setIsLoading(false)
		}
	}

	return (
		<View>
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
				secureTextEntry
			/>
			{isLoading ? (
				<ActivityIndicator size="small" color="blue" />
			) : (
				<SubmitButton onPressFunction={submitHandler} label="Login" />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
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

export default LoginForm

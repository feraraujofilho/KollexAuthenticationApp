import React, { FC, useCallback, useReducer, useState } from 'react'
import {
	ActivityIndicator,
	Alert,
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import Input from '../Input/Input'
import StrengthPasswordBar from '../StrengthPasswordBar/StrengthPasswordBar'
import { getPasswordStrengthScore } from '../../helpers/helpers'
import { formReducer } from '../../reducers/FormReducer'
import { INPUT_CHANGE } from '../../types/Actions'
import { signUp } from '../../store/auth/authActions'
import { createUser } from '../../store/user/userActions'
import SignupFormProps from './SignupFormProps'
import Colors from '../../constants/Colors'
import SubmitButton from '../SubmitButton/SubmitButton'

const SignupForm: FC<SignupFormProps> = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false)

	const [signupState, signupStateDispatch] = useReducer(formReducer, {
		inputValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			password: '',
		},
		inputValidation: {
			firstName: true,
			lastName: true,
			email: false,
			phoneNumber: false,
			password: false,
		},
		isFormValid: false,
	})

	const dispatch = useDispatch()

	const [scorePassword, setScorePassword] = useState(0)

	const handleFormSubmit = async () => {
		if (!signupState.isFormValid) {
			Alert.alert('Missing required fields', 'Please fill the fields with * ', [
				{ text: 'Okay' },
			])
			return
		}
		setIsLoading(true)

		const {
			firstName,
			lastName,
			email,
			phoneNumber,
			password,
		} = signupState.inputValues
		try {
			await dispatch(signUp(email, password))
			await dispatch(createUser(firstName, lastName, email, phoneNumber))
			setIsLoading(false)
			navigation.navigate('Home')
		} catch (err) {
			Alert.alert('An Error Ocurred!', err.message, [{ text: 'Okay' }])
			setIsLoading(false)
		}
	}

	const handleInput = useCallback(
		(id: string, text: string, isValid: boolean) => {
			if (id === 'password') {
				setScorePassword(getPasswordStrengthScore(text))
			}
			signupStateDispatch({
				type: INPUT_CHANGE,
				value: text,
				inputIdentifier: id,
				isValid: isValid,
			})
		},
		[signupState]
	)

	return (
		<ScrollView>
			<View style={styles.main}>
				<Input
					id="firstName"
					label="First Name"
					value={signupState.firstName}
					onChangeHandler={handleInput}
				/>
				<Input
					id="lastName"
					label="Last Name"
					value={signupState.lastName}
					onChangeHandler={handleInput}
				/>
				<Input
					id="email"
					label="E-mail *"
					value={signupState.email}
					onChangeHandler={handleInput}
					errorText="Please enter a valid email address."
					required
					email
				/>
				<Input
					id="phoneNumber"
					label="Phone Number *"
					value={signupState.phoneNumber}
					errorText="Please enter a valid phone number."
					onChangeHandler={handleInput}
					required
					keyboardType="decimal-pad"
				/>
				<Input
					id="password"
					label="Password *"
					value={signupState.password}
					onChangeHandler={handleInput}
					errorText="Please enter a valid password."
					required
					passwordCreation
					secureTextEntry
				/>
				<StrengthPasswordBar score={scorePassword} />
				{isLoading ? (
					<ActivityIndicator size="small" color="blue" />
				) : (
					<SubmitButton onPressFunction={handleFormSubmit} label="Sign Up" />
				)}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		width: '100%',
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.primary,
		height: 50,
		borderRadius: 10,
	},
	buttonText: {
		fontFamily: 'montserrat-bold',
		color: Colors.accent,
		fontSize: 16,
	},
})

export default SignupForm

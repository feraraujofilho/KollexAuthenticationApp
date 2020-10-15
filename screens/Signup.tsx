import React, { FC, useCallback, useReducer, useState } from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Input from '../components/Input/Input'
import StrengthPasswordBar from '../components/StrengthPasswordBar/StrengthPasswordBar'
import { getPasswordStrengthScore } from '../helpers/helpers'
import { formReducer } from '../reducers/FormReducer'
import { INPUT_CHANGE } from '../types/Actions'

const Signup: FC = ({ navigation }) => {
	const [signupState, dispatch] = useReducer(formReducer, {
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

	const [scorePassword, setScorePassword] = useState(0)

	const handleFormSubmit = () => {
		if (!signupState.isFormValid) {
			Alert.alert('Missing required fields', 'Please fill the fields with * ', [
				{ text: 'Okay' },
			])
			return
		}
		console.log(signupState.inputValues)
	}

	const handleInput = useCallback(
		(id: string, text: string, isValid: boolean) => {
			if (id === 'password') {
				setScorePassword(getPasswordStrengthScore(text))
			}
			dispatch({
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
					secureTextEntry
				/>
				<StrengthPasswordBar score={scorePassword} />
				<Button title="Sign Up" onPress={handleFormSubmit} />
			</View>
			<View>
				<Text>
					I have an account,
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text>Login</Text>
					</TouchableOpacity>
				</Text>
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
})

export default Signup

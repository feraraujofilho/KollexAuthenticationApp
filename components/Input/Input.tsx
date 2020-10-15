import React, { FC, useReducer, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import validator from 'validator'
import { inputReducer } from '../../reducers/InputReducer'
import { INPUT_BLUR, INPUT_CHANGE } from '../../types/Actions'
import InputProps from './InputProps'
import zxcvbn from 'zxcvbn'
import { getPasswordStrengthScore } from '../../helpers/helpers'

const Input: FC<InputProps> = ({
	id,
	label,
	value,
	onChangeHandler,
	email,
	password,
	required,
	errorText,
	...props
}) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: value,
		isValid: false,
		touched: false,
	})

	const handleTextChange = (text: string) => {
		let isValid = true
		if (email && !validator.isEmail(text)) {
			isValid = false
		}
		if (required && text.length === 0) {
			isValid = false
		}
		if (password) {
			let score = getPasswordStrengthScore(text)
			if (score < 3) {
				isValid = false
			}
		}
		dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
		onChangeHandler(id, text, isValid)
	}

	const lostFocus = () => {
		dispatch({ type: INPUT_BLUR })
	}

	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				{...props}
				style={styles.input}
				value={inputState.value}
				onChangeText={handleTextChange}
				onBlur={lostFocus}
			/>
			{!inputState.isValid && inputState.touched && errorText && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{errorText}</Text>
				</View>
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

export default Input

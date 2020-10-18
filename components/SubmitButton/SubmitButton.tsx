import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import SubmitButtonProps from './SubmitButtonProps'

const SubmitButton: FC<SubmitButtonProps> = ({ onPressFunction, label }) => {
	return (
		<TouchableOpacity style={styles.buttonContainer} onPress={onPressFunction}>
			<Text style={styles.buttonText}>{label}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
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

export default SubmitButton

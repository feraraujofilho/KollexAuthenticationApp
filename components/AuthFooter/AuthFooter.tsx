import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../constants/Colors'
import AuthFooterProps from './AuthFooterProps'

const AuthFooter: FC<AuthFooterProps> = ({ text, linkText, onPress }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.bottomText}>{text}</Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.text}>{linkText}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	bottomText: {
		fontSize: 18,
		fontFamily: 'montserrat-light',
	},
	text: {
		color: Colors.primary,
		fontSize: 18,
		fontFamily: 'montserrat-bold',
		padding: 5,
	},
})

export default AuthFooter

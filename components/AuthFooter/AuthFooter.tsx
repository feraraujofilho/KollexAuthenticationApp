import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../constants/Colors'
import AuthFooterProps from './AuthFooterProps'

const AuthFooter: FC<AuthFooterProps> = ({
	text,
	linkText,
	onPress,
}) => {
	return (
		<View style={styles.loginContainer}>
			<Text style={styles.bottomText}>{text}</Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.loginText}>{linkText}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
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

export default AuthFooter

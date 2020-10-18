import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import Colors from '../constants/Colors'

const Heading1: FC = ({ children }) => {
	return <Text style={styles.main}>{children}</Text>
}

const styles = StyleSheet.create({
	main: {
		fontSize: 30,
		fontFamily: 'montserrat-bold',
		color: Colors.primary,
	},
})

export default Heading1

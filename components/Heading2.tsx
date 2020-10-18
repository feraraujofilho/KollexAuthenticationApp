import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'

const Heading2: FC = ({ children }) => {
	return <Text style={styles.main}>{children}</Text>
}

const styles = StyleSheet.create({
	main: {
		fontSize: 23,
		fontFamily: 'montserrat-light',
	},
})

export default Heading2

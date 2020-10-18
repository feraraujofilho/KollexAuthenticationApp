import React, { FC } from 'react'
import { StyleProp, StyleSheet, Text } from 'react-native'

interface ParagraphTextProps {
	style?: StyleProp<{}>
}

const ParagraphText: FC<ParagraphTextProps> = ({ children, style }) => {
	return <Text style={{ ...style, ...styles.text }}>{children}</Text>
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'montserrat-bold',
		color: 'white',
	},
})

export default ParagraphText

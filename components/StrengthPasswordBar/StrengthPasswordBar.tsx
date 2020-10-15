import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getBarColor } from '../../helpers/helpers'
import StrengthPasswordBarProps from './StrengthPasswordBarProps'

const StrengthPasswordBar: FC<StrengthPasswordBarProps> = ({ score }) => {
	let text
	if (score <= 1) {
		text = 'Too weak'
	}
	if (score === 2) {
		text = 'weak'
	}
	if (score === 3) {
		text = 'good'
	}
	if (score === 4) {
		text = 'strong'
	}
	return (
		<View style={styles.main}>
			<Text style={{ color: getBarColor(score) }}>{text}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	main: { alignSelf: 'flex-end' },
})

export default StrengthPasswordBar

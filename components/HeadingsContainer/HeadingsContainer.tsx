import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Heading1 from '../../components/Heading1'
import Heading2 from '../../components/Heading2'
import { HeaderContainerProps } from './HeadingsContainerProps'

const HeadingContainer: FC<HeaderContainerProps> = ({ heading1, heading2 }) => {
	return (
		<View style={styles.headerContainer}>
			<Heading1>{heading1}</Heading1>
			{heading2 && <Heading2>{heading2}</Heading2>}
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		paddingTop: 70,
		paddingBottom: 50,
		paddingHorizontal: 30,
	},
})

export default HeadingContainer

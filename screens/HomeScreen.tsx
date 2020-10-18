import React, { FC } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { ScreenContainer } from 'react-native-screens'
import { useDispatch, useSelector } from 'react-redux'
import HeadingContainer from '../components/HeadingsContainer/HeadingsContainer'
import { logout } from '../store/auth/authActions'

const HomeScreen: FC = () => {
	const user = useSelector((state) => state.userState)
	const dispatch = useDispatch()

	return (
		<View style={styles.main}>
			<HeadingContainer
				heading1="Welcome back Carlos!"
				heading2="it's good to see you again"
			/>
			<Text>Home</Text>
			<Button title="logout" onPress={() => dispatch(logout())} />
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default HomeScreen

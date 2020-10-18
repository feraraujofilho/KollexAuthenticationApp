import React from 'react'
import {
	ActivityIndicator,
	Image,
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import HeaderButton from '../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'
import HeadingContainer from '../components/HeadingsContainer/HeadingsContainer'
import {
	NavigationScreenComponent,
	NavigationScreenProps,
	NavigationStackScreenOptions,
} from 'react-navigation'
import Colors from '../constants/Colors'
import ParagraphText from '../components/ParagraphText'

const HomeScreen: NavigationScreenComponent<{}> = () => {
	const user = useSelector((state) => state.userState)

	if (!user.email) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator color={Colors.primary} size="large" />
			</View>
		)
	}

	return (
		<View style={styles.main}>
			<HeadingContainer
				heading1={`Hi ${user.firstName}!`}
				heading2="So good to have you here"
			/>
			{user ? (
				<View style={styles.container}>
					<ParagraphText style={{ paddingVertical: 10 }}>
						Your personal information:
					</ParagraphText>
					<ParagraphText>First Name: {user.firstName}</ParagraphText>
					<ParagraphText>Last Name: {user.lastName}</ParagraphText>
					<ParagraphText>E-mail: {user.email}</ParagraphText>
					<ParagraphText>Phone Number: {user.phoneNumber}</ParagraphText>
				</View>
			) : (
				<Text>You Dont have any information available</Text>
			)}
		</View>
	)
}

HomeScreen.navigationOptions = (
	screenProps: NavigationScreenProps
): NavigationStackScreenOptions => {
	return {
		headerTitle: (
			<Image
				style={{ width: 100, height: 28 }}
				source={require('../assets/kollexlogo.png')}
			/>
		),
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title=""
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						screenProps.navigation.toggleDrawer()
					}}
				/>
			</HeaderButtons>
		),
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		minHeight: 150,
		backgroundColor: Colors.primary,
		marginVertical: 10,
		marginHorizontal: 10,
		padding: 20,
		borderRadius: 20,
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default HomeScreen

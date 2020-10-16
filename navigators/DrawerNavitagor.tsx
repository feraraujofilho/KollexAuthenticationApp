import React from 'react'
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen'
import { useDispatch } from 'react-redux'
import { logout } from '../store/auth/authActions'

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
	const dispatch = useDispatch()
	return (
		<Drawer.Navigator
			drawerContent={(props) => {
				return (
					<DrawerContentScrollView {...props}>
						<DrawerItemList {...props} />
						<DrawerItem label="Logout" onPress={() => dispatch(logout())} />
					</DrawerContentScrollView>
				)
			}}
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
		</Drawer.Navigator>
	)
}

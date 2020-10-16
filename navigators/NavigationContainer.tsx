import { NavigationActions } from '@react-navigation/compat'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import MainNavigator from './MainNavigator'

const NavigationContainer = (props) => {
	const navRef = useRef()

	const isAuth = useSelector((state) => !!state.authState.token)

	useEffect(() => {
		console.log(isAuth)
		if (!isAuth) {
			navRef.current.dispatch(
				NavigationActions.navigate({ routeName: 'Login' })
			)
		}
	}, [isAuth])

	return <MainNavigator ref={navRef} />
}

export default NavigationContainer

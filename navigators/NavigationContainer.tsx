import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import AppNavigator from './AppNavigator'
import { NavigationActions } from 'react-navigation'

const NavigationContainer = () => {
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

	return <AppNavigator ref={navRef} />
}

export default NavigationContainer

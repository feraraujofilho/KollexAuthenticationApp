import React, { FC } from 'react'
import {
	HeaderButton,
	HeaderButtonsProps,
} from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

const CustomHeaderButton: FC = (props) => {
	return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} />
}

export default CustomHeaderButton

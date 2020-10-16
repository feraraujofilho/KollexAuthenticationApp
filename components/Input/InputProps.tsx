import { TextInputProps } from 'react-native'

export default interface InputProps extends TextInputProps {
	id: string
	label: string
	value?: string
	onChangeHandler: (id: string, text: string, isValid: boolean) => void
	email?: boolean
	passwordCreation?: boolean
	errorText?: string
	required?: boolean
}

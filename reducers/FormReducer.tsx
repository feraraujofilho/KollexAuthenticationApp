import { INPUT_CHANGE } from '../types/Actions'

export const formReducer = (state: any, action: any) => {
	switch (action.type) {
		case INPUT_CHANGE:
			const updatedValues = {
				...state.inputValues,
				[action.inputIdentifier]: action.value,
			}
			const updatedValidation = {
				...state.inputValidation,
				[action.inputIdentifier]: action.isValid,
			}

			let updateFormIsValid = true

			for (const key in updatedValidation) {
				updateFormIsValid = updateFormIsValid && updatedValidation[key]
			}

			return {
				inputValues: updatedValues,
				inputValidation: updatedValidation,
				isFormValid: updateFormIsValid,
			}
		default:
			return state
	}
}

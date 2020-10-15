import { INPUT_BLUR, INPUT_CHANGE } from "../types/Actions"

export const inputReducer = (state, action) => {
	switch (action.type) {
		case INPUT_CHANGE:
			return {
				...state,
				value: action.value,
				isValid: action.isValid,
			}
		case INPUT_BLUR:
			return {
				...state,
				touched: true,
			}
		default:
			return state
	}
}

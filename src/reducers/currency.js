import {FETCHING_CURRENCY, FETCHING_CURRENCY_SUCCESS, FETCHING_CURRENCY_FAILURE} from '../const/constants'

const initialState = {
    currency: [],
    isFetching: true,
    error: false
}

export default function currencyReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_CURRENCY:
            return {
                ...state,
                currency: [],
                isFetching: true,
            }
        case FETCHING_CURRENCY_SUCCESS:
            return {
                ...state,
                currency: action.data,
                isFetching: false
            }
        case FETCHING_CURRENCY_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}

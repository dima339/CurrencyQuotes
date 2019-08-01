import {FETCHING_CURRENCY, FETCHING_CURRENCY_SUCCESS, FETCHING_CURRENCY_FAILURE} from './../const/constants'
import moment from 'moment'

export function fetchCurrencyFromAPI() {
    return (dispatch) => {
        dispatch(getCurrency())
        fetch('https://api.exchangeratesapi.io/history?start_at='+
        moment().subtract(3,'days').format('YYYY-MM-DD') +
        '&end_at=' + moment().subtract(1,'days').format('YYYY-MM-DD') + '&base=RUB')
            .then(data => data.json())
            .then(json => {
                dispatch(getCurrencySuccess(json))
            })
            .catch(err => dispatch(getCurrencyFailure(err)))
    }
}

export function getCurrency() {
    return {
        type: FETCHING_CURRENCY
    }
}

export function getCurrencySuccess(data) {
    return {
        type: FETCHING_CURRENCY_SUCCESS,
        data
    }
}

export function getCurrencyFailure() {
    return {
        type: FETCHING_CURRENCY_FAILURE
    }
}

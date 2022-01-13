import jsC8 from "../../jsc8Instance"
import { searchActionTypes } from "./search.types"
import { restql } from "../../requests"

export const changeSearchInputValue = (inputValue) => ({
    type: searchActionTypes.CHANGE_SEARCH_INPUT_VALUE,
    payload: inputValue,
})

export const clearSearchInputValue = () => ({
    type: searchActionTypes.CLEAR_SEARCH_INPUT_VALUE,
})

export const fetchSearchResultsRequest = (searchQuery) => ({
    type: searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST,
    payload: searchQuery,
})

export const fetchSearchResultsSuccess = (searchResults) => ({
    type: searchActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
    payload: searchResults,
})

export const fetchSearchResultsFailure = (errorMessage) => ({
    type: searchActionTypes.FETCH_SEARCH_RESULTS_FAILURE,
    payload: errorMessage,
})

export const fetchSearchResultsAsync = (searchTerm, searchType) => {
    return (dispatch) => {
        let searchQuery = restql.searchByAsset
        let bindVars = { searchTerm }
        if (searchType === "credits") {
            bindVars = {}
            searchQuery = restql.searchByCredits
                .replace("SEARCH_PHRASE", searchTerm.searchPhrases)
                .replace("SEARCH_FILTER", searchTerm.searchFilters)
        }

        dispatch(fetchSearchResultsRequest(searchQuery))

        jsC8.executeQuery({ query: searchQuery, bindVars })
            .then((response) => {
                dispatch(fetchSearchResultsSuccess(response[0]))
            })
            .catch((err) => {
                dispatch(fetchSearchResultsFailure(err.message))
            })
    }
}

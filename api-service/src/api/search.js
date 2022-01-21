import { RESTQL } from "../utils/constant"
import { getBodyParameters } from "../utils/helper"
import { executeQuery } from "../utils/jsc8"

export const searchByCriteria = async (body, response) => {
    try {
        let { searchTerm, searchType } = body
        let bindVars = { searchTerm }
        let searchQuery = RESTQL.SEARCH_BY_ASSET

        if (searchType === "credits") {
            bindVars = {}
            searchQuery = RESTQL.SEARCH_BY_CREDITS.replace("SEARCH_PHRASE", searchTerm.searchPhrases).replace(
                "SEARCH_FILTER",
                searchTerm.searchFilters,
            )
        }

        const result = await executeQuery(searchQuery, bindVars)
        response.body = JSON.stringify(result)
    } catch (err) {
        response.status = 500
        response.body = JSON.stringify(err)
    }
    return response
}

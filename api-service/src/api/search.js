import { restql } from "../utils/constant"
import { getBodyParameters } from "../utils/helper"
import { executeQuery } from "../utils/jsc8"

export const searchByCriteria = async (request) => {
    const headers = new Headers()
    try {
        const body = await getBodyParameters(request.body)
        let { searchTerm, searchType } = body
        let bindVars = { searchTerm }
        let searchQuery = restql.searchByAsset

        if (searchType === "credits") {
            bindVars = {}
            searchQuery = restql.searchByCredits
                .replace("SEARCH_PHRASE", searchTerm.searchPhrases)
                .replace("SEARCH_FILTER", searchTerm.searchFilters)
        }

        const result = await executeQuery(searchQuery, bindVars)

        headers.set("Content-Type", "application/json")
        return new Response(JSON.stringify(result), {
            status: 200,
            headers,
            url: request.url,
        })
    } catch (err) {
        return new Response(JSON.stringify(err), {
            status: 500,
            headers,
            url: request.url,
        })
    }
}

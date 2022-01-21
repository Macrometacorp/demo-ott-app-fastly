import { RESTQL } from "../utils/constant"
import { getBodyParameters } from "../utils/helper"
import { executeRestQl } from "../utils/jsc8"

export const getTvSeriesAssetsByGenre = async (body, response) => {
    try {
        const result = await executeRestQl(RESTQL.TV_SERIES_ASSETS_BY_GENRE, body)

        response.body = JSON.stringify(result)
    } catch (err) {
        response.status = 500
        response.body = JSON.stringify(err)
    }
    return response
}

export const getTopRatedTvSeries = async (body, response) => {
    try {
        const result = await executeRestQl(RESTQL.TOP_RATED_TV_SERIES)

        response.body = JSON.stringify(result)
    } catch (err) {
        response.status = 500
        response.body = JSON.stringify(err)
    }
    return response
}

import { restql } from "../utils/constant"
import { getBodyParameters } from "../utils/helper"
import { executeRestQl } from "../utils/jsc8"

export const getTvSeriesAssetsByGenre = async (request) => {
    const headers = new Headers()
    try {
        const body = await getBodyParameters(request.body)
        const result = await executeRestQl(restql.tvSeriesAssetsByGenre, body)

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

export const getTopRatedTvSeries = async (request) => {
    const headers = new Headers()
    try {
        const result = await executeRestQl(restql.topRatedTvSeries)

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

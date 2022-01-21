import { RESTQL } from "../utils/constant"
import { executeRestQl } from "../utils/jsc8"

export const getMovieAssetsByGenre = async (body, response) => {
    try {
        const result = await executeRestQl(RESTQL.MOVIE_ASSETS_BY_GENRE, body)

        response.body = JSON.stringify(result)
    } catch (err) {
        response.status = 500
        response.body = JSON.stringify(err)
    }
    return response
}

export const getTopRatedMovies = async (body, response) => {
    try {
        const result = await executeRestQl(RESTQL.TOP_RATED_MOVIES)

        response.body = JSON.stringify(result)
    } catch (err) {
        response.status = 500
        response.body = JSON.stringify(err)
    }
    return response
}

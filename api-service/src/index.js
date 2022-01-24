import { getMovieAssetsByGenre, getTopRatedMovies } from "./api/movies"
import { searchByCriteria } from "./api/search"
import { getTopRatedTvSeries, getTvSeriesAssetsByGenre } from "./api/tvseries"
import { signin, signup } from "./auth"
import { ROUTES } from "./utils/constant"
import { parseRequest } from "./utils/helper"

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)))

async function handleRequest(event) {
    const {
        TOP_RATED_MOVIES,
        MOVIE_ASSETS_BY_GENRE,
        SEARCH_BY_CRITERIA,
        SIGN_IN,
        SIGN_UP,
        TOP_RATED_TV_SERIES,
        TV_SERIES_ASSETS_BY_GENRE,
    } = ROUTES
    const { url, body, pathname, headers, method } = await parseRequest(event)
    const responseHeaders = new Headers()
    responseHeaders.set("access-control-allow-origin", headers.get("origin"))
    let response = {
        body: "{}",
        status: 200,
    }

    // Filter requests that have unexpected methods.
    if (!["OPTIONS", "POST"].includes(method)) {
        return new Response("This method is not allowed", {
            status: 405,
        })
    }

    if (
        method === "OPTIONS" &&
        headers.has("Origin") &&
        (headers.has("access-control-request-headers") || headers.has("access-control-request-method"))
    ) {
        return new Response(null, {
            status: 204,
            headers: {
                "access-control-allow-origin": headers.get("origin") || "",
                "access-control-allow-methods": "GET,HEAD,POST,OPTIONS",
                "access-control-allow-headers": headers.get("access-control-request-headers") || "",
                "access-control-max-age": 86400,
            },
        })
    }

    switch (pathname) {
        case MOVIE_ASSETS_BY_GENRE:
            response = await getMovieAssetsByGenre(body, response)
            break
        case TOP_RATED_MOVIES:
            response = await getTopRatedMovies(response)
            break
        case TV_SERIES_ASSETS_BY_GENRE:
            response = await getTvSeriesAssetsByGenre(body, response)
            break
        case TOP_RATED_TV_SERIES:
            response = await getTopRatedTvSeries(response)
            break
        case SEARCH_BY_CRITERIA:
            response = await searchByCriteria(body, response)
            break
        case SIGN_IN:
            response = await signin(body, response)
            break
        case SIGN_UP:
            response = await signup(body, response)
            break
        default:
            return new Response("The page you requested could not be found", {
                status: 404,
            })
    }

    responseHeaders.set("Content-Type", "application/json")
    return new Response(response.body, {
        status: response.status,
        headers: responseHeaders,
        url: url,
    })
}

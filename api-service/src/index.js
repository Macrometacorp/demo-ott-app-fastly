import { getMovieAssetsByGenre, getTopRatedMovies } from "./API/movies"
import { searchByAsset, searchByCriteria } from "./API/search"
import { getTopRatedTvSeries, getTvSeriesAssetsByGenre } from "./API/tvseries"
import { signin, signup } from "./auth"

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)))

async function handleRequest(event) {
    // Get the client request.
    let req = event.request
    let url = new URL(req.url)
    let response

    // Filter requests that have unexpected methods.
    if (!["OPTIONS", "POST"].includes(req.method)) {
        return new Response("This method is not allowed", {
            status: 405,
        })
    }

    if (
        req.method === "OPTIONS" &&
        req.headers.has("Origin") &&
        (req.headers.has("access-control-request-headers") || req.headers.has("access-control-request-method"))
    ) {
        return new Response(null, {
            status: 204,
            headers: {
                "access-control-allow-origin": req.headers.get("origin") || "",
                "access-control-allow-methods": "GET,HEAD,POST,OPTIONS",
                "access-control-allow-headers": req.headers.get("access-control-request-headers") || "",
                "access-control-max-age": 86400,
            },
        })
    }

    switch (url.pathname) {
        case "/getMovieAssetsByGenre":
            response = await getMovieAssetsByGenre(req)
            break
        case "/getTopRatedMovies":
            response = await getTopRatedMovies(req)
            break
        case "/getTvSeriesAssetsByGenre":
            response = await getTvSeriesAssetsByGenre(req)
            break
        case "/getTopRatedTvSeries":
            response = await getTopRatedTvSeries(req)
            break
        case "/searchByCriteria":
            response = await searchByCriteria(req)
            break
        case "/signin":
            response = await signin(req)
            break
        case "/signup":
            response = await signup(req)
            break
        default:
            response = new Response("The page you requested could not be found", {
                status: 404,
            })
    }

    response.headers.append("access-control-allow-origin", req.headers.get("origin"))
    return response
}

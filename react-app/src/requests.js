import Logo from "../src/images/logo.png"
import Signin_BG from "../src/images/signin_bg.jpg"
import Fallback_Img from "../src/images/fallback_img.png"
import Profile_Pic from "../src/images/profile_pic.png"

export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original"
export const LOGO_URL = Logo
export const SIGNIN_BGIMG_URL = Signin_BG

export const GITHUB_BASE_URL = process.env.REACT_APP_GITHUB_REPO

export const LANG = "en-US"
export const REGION = "US"
export const FALLBACK_IMG_URL = Fallback_Img

export const PROFILE_PIC_URL = Profile_Pic

export const restql = {
    topRatedMovies: "getTopRatedMovies",
    topRatedTvSeries: "getTopRatedTvSeries",
    movieAssetsByGenre: "getMovieAssetsByGenre",
    tvSeriesAssetsByGenre: "getTvSeriesAssetsByGenre",
    searchByAsset: `LET tokens = TOKENS(@searchTerm, "text_en")
    LET assets = (
        LET search_results = (
            FOR asset IN asset_credit_view
                SEARCH ANALYZER(
                        BOOST(asset.title IN tokens, 4.5) OR 
                        BOOST(asset.original_title IN tokens, 3.5) OR
                        BOOST(asset.name IN tokens, 3.5) OR 
                        asset.overview IN tokens
                    , "text_en")
                SORT BM25(asset) DESC
                RETURN asset
        )
        
        LET assets = (
            FOR i IN search_results
                FILTER !HAS(i, "known_for_department")
                RETURN i
        )
        
        LET credit_assets = (
            FOR i IN search_results
                FILTER HAS(i, "known_for_department")
                FOR vertices, edge IN 1..2 INBOUND i._id asset_credit_edge
                    SORT vertices.popularity DESC
                    RETURN vertices
        )
        
        RETURN UNION(assets, credit_assets)
    )

    LET top_6_asset_ids = assets[0][* LIMIT 6]._id
    LET cast = (
        FOR id IN top_6_asset_ids
            RETURN (
                FOR cast, edge IN 1..2 OUTBOUND id asset_credit_edge
                    FILTER edge.type == "cast"
                RETURN cast
            )
    )

    LET crew = (
        FOR id IN top_6_asset_ids
            RETURN (
                FOR crew, edge IN 1..2 OUTBOUND id asset_credit_edge
                    FILTER edge.type == "crew"
                RETURN crew
            )
    )

    RETURN {
        assets: UNIQUE(assets[0]),
        cast: (
            FOR c IN UNIQUE(FLATTEN(cast))
                SORT c.popularity DESC
                LIMIT 23
                RETURN c
        ),
        crew: (
            FOR c IN UNIQUE(FLATTEN(crew))
                SORT c.popularity DESC
                LIMIT 23
                RETURN c
        )
    }`,
    searchByCredits: `LET assets = (
        LET credit_ids = (
            FOR asset IN asset_credit_view
                SEARCH SEARCH_PHRASE
                SORT BM25(asset) DESC
                RETURN asset._id
        )
        
        LET assets = (
            FOR id IN credit_ids 
                FOR vertices, edge IN 1..2 INBOUND id asset_credit_edge
                RETURN vertices
        )
        
        FOR asset IN assets
            LET cast_and_crew = (
                FOR vertices, edge IN 1..2 OUTBOUND asset asset_credit_edge
                    RETURN vertices.name
            )
            FILTER SEARCH_FILTER
            RETURN asset
    ) 

    LET top_6_asset_ids = assets[* LIMIT 6]._id
    LET cast = (
        FOR id IN top_6_asset_ids
            RETURN (
                FOR cast, edge IN 1..2 OUTBOUND id asset_credit_edge
                    FILTER edge.type == "cast"
                RETURN cast
            )
    )

    LET crew = (
        FOR id IN top_6_asset_ids
            RETURN (
                FOR crew, edge IN 1..2 OUTBOUND id asset_credit_edge
                    FILTER edge.type == "crew"
                RETURN crew
            )
    )
    RETURN {
        assets: UNIQUE(assets),
        cast: (
            FOR c IN UNIQUE(FLATTEN(cast))
                SORT c.popularity DESC
                LIMIT 23
                RETURN c
        ),
        crew: (
            FOR c IN UNIQUE(FLATTEN(crew))
                SORT c.popularity DESC
                LIMIT 23
                RETURN c
        )
    }`,
}

export default restql

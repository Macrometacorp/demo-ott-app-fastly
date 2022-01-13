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
                            //BOOST(asset.title IN tokens, 4.5) OR 
                            //BOOST(asset.original_title IN tokens, 3.5) OR
                            //BOOST(asset.name IN tokens, 2.5) OR 
                            asset.title IN tokens OR 
                            asset.original_title IN tokens OR
                            asset.name IN tokens OR 
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

        LET first_asset_id = assets[0][0]
        LET cast = (
            FOR cast, edge IN 1..2 OUTBOUND first_asset_id asset_credit_edge
                FILTER edge.type == "cast"
                SORT cast.popularity DESC
            RETURN cast
        )

        LET crew = (
            FOR crew, edge IN 1..2 OUTBOUND first_asset_id asset_credit_edge
                FILTER edge.type == "crew"
                SORT crew.popularity DESC
            RETURN crew
        )

        RETURN {
            assets: UNIQUE(assets[0]),
            cast,
            crew
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

        LET cast = (
            FOR cast, edge IN 1..2 OUTBOUND assets[0] asset_credit_edge
                FILTER edge.type == "cast"
                SORT cast.popularity DESC
            RETURN cast
        )

        LET crew = (
            FOR crew, edge IN 1..2 OUTBOUND assets[0] asset_credit_edge
                FILTER edge.type == "crew"
                SORT crew.popularity DESC
            RETURN crew
        )

        RETURN {
            assets: UNIQUE(assets),
            cast,
            crew
        }`,
}

export default restql

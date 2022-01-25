export const RESTQL = {
    MOVIE_ASSETS_BY_GENRE: "getMovieAssetsByGenre",
    TOP_RATED_MOVIES: "getTopRatedMovies",
    TV_SERIES_ASSETS_BY_GENRE: "getTvSeriesAssetsByGenre",
    TOP_RATED_TV_SERIES: "getTopRatedTvSeries",
    SEARCH_BY_ASSET: `LET tokens = TOKENS(@searchTerm, "text_en")
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
                    SORT cast.popularity DESC
                    LIMIT 4
                RETURN cast
            )
    )

    LET crew = (
        FOR id IN top_6_asset_ids
            RETURN (
                FOR crew, edge IN 1..2 OUTBOUND id asset_credit_edge
                    FILTER edge.type == "crew"
                    SORT crew.popularity DESC
                    LIMIT 4
                RETURN crew
            )
    )

    RETURN {
        assets: UNIQUE(assets[0]),
        cast: UNIQUE(FLATTEN(cast)),
        crew: UNIQUE(FLATTEN(crew))
    }`,
    SEARCH_BY_CREDITS: `LET assets = (
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
                    SORT cast.popularity DESC
                    LIMIT 4
                RETURN cast
            )
    )

    LET crew = (
        FOR id IN top_6_asset_ids
            RETURN (
                FOR crew, edge IN 1..2 OUTBOUND id asset_credit_edge
                    FILTER edge.type == "crew"
                    SORT crew.popularity DESC
                    LIMIT 4
                RETURN crew
            )
    )
    RETURN {
        assets: UNIQUE(assets),
        cast: UNIQUE(FLATTEN(cast)),
        crew: UNIQUE(FLATTEN(crew))
    }`,
}

export const DICTIONARY_ITEM_KEYS = {
    BACKEND: "backend_name",
    API_URL: "gdn_api_url",
    API_KEY: "gdn_api_key",
}

export const ROUTES = {
    MOVIE_ASSETS_BY_GENRE: "/getMovieAssetsByGenre",
    TOP_RATED_MOVIES: "/getTopRatedMovies",
    TV_SERIES_ASSETS_BY_GENRE: "/getTvSeriesAssetsByGenre",
    TOP_RATED_TV_SERIES: "/getTopRatedTvSeries",
    SEARCH_BY_CRITERIA: "/searchByCriteria",
    SIGN_IN: "/signin",
    SIGN_UP: "/signup",
}

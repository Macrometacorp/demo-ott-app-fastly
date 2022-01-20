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

export const DICTIONARY_ITEM_KEYS = {
    BACKEND: "backend_name",
    API_URL: "gdn_api_url",
    API_KEY: "gdn_api_key",
}

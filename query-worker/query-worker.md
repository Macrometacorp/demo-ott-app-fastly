**getTopRatedMovies:**

```
LET movies = (
    FOR asset IN asset_type_view
        SEARCH ANALYZER(asset.asset_type == "movie", "identity")
        RETURN asset._to
)

FOR asset_id IN UNIQUE(movies)
    FOR asset IN assets
        FILTER asset._id == asset_id
        SORT asset.popularity DESC
        LIMIT 0, 20
    RETURN asset
```

**getTopRatedTvSeries:**

```
LET tvSeries = (
    FOR asset IN asset_type_view
        SEARCH ANALYZER(asset.asset_type == "tv", "identity")
        RETURN asset._to
)

FOR asset_id IN UNIQUE(tvSeries)
    FOR asset IN assets
        FILTER asset._id == asset_id
        SORT asset.popularity DESC
        LIMIT 0, 20
    RETURN asset
```

**getMovieAssetsByGenre:**

```
FOR asset, edge IN 1..2 OUTBOUND CONCAT("genres/", @genreId) genres_asset_edge
    FILTER edge.asset_type=="movie"
    LIMIT @offset, @resLimit
    RETURN asset
```

**getTvSeriesAssetsByGenre:**

```
FOR asset, edge IN 1..2 OUTBOUND CONCAT("genres/", @genreId) genres_asset_edge
    FILTER edge.asset_type=="tv"
    LIMIT @offset, @resLimit
    RETURN asset
```

**searchByAsset:**

```
LET tokens = TOKENS(@searchTerm, "text_en")
LET assets = (
    LET search_results = (
        FOR asset IN asset_credit_view
            SEARCH ANALYZER(
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
}
```

**searchByCredits:**

```
LET assets = (
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
}
```

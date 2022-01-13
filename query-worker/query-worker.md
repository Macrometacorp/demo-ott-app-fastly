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
    FOR asset IN asset_credit_view
        SEARCH ANALYZER(
                BOOST(asset.title IN tokens, 4.5) OR
                BOOST(asset.original_title IN tokens, 3.5) OR
                asset.overview IN tokens
            , "text_en")
        SORT BM25(asset) DESC
        RETURN asset
)

LET cast = (
    FOR cast, edge IN 1..2 OUTBOUND assets[0] asset_credit_edge
        FILTER edge.type == "cast"
        SORT cast.popularity DESC
        LIMIT 7
    RETURN cast
)

LET crew = (
    FOR crew, edge IN 1..2 OUTBOUND assets[0] asset_credit_edge
        FILTER edge.type == "crew"
        SORT crew.popularity DESC
    RETURN crew
)

RETURN {
    assets,
    cast,
    crew
}
```

**searchByCredits:**

```
LET tokens = @searchTerm
LET assets = (
    LET assetIds= (
        FOR asset IN asset_credit_view
            SEARCH PHRASE(asset.name, "Tom Hardy", "text_en")
            SORT BM25(asset) DESC
            RETURN asset._id
    )

    for I in assetIds
        for vertices, edge IN 1..2 INBOUND I asset_credit_edge
        sort vertices.popularity desc
        return vertices
)

LET cast = (
    FOR cast, edge IN 1..2 OUTBOUND assets[0] asset_credit_edge
        FILTER edge.type == "cast"
        SORT cast.popularity DESC
        LIMIT 5
    RETURN cast
)

LET crew = (
    FOR crew, edge IN 1..2 OUTBOUND assets[0] asset_credit_edge
        FILTER edge.type == "crew"
        SORT crew.popularity DESC
        LIMIT 5
    RETURN crew
)

RETURN {
    assets,
    cast,
    crew
}
```

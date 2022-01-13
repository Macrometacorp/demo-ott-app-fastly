import { restql } from "./requests"
import * as movieSelectors from "./redux/movies/movies.selectors"
import * as seriesSelectors from "./redux/series/series.selectors"
import {
    fetchActionMoviesAsync,
    fetchAdventureMoviesAsync,
    fetchAnimationMoviesAsync,
    fetchComedyMoviesAsync,
    fetchHorrorMoviesAsync,
    fetchNetflixMoviesAsync,
    fetchRomanceMoviesAsync,
    fetchTopRatedMoviesAsync,
    fetchTrendingMoviesAsync,
} from "./redux/movies/movies.actions"
import {
    fetchActionAdventureSeriesAsync,
    fetchAnimationSeriesAsync,
    fetchComedySeriesAsync,
    fetchCrimeSeriesAsync,
    fetchDocumentarySeriesAsync,
    fetchFamilySeriesAsync,
    fetchKidsSeriesAsync,
    fetchNetflixSeriesAsync,
    fetchSciFiFantasySeriesAsync,
    fetchTrendingSeriesAsync,
} from "./redux/series/series.actions"

export const fetchMovieDataConfig = [
    {
        id: 0,
        thunk: fetchTopRatedMoviesAsync,
        url: restql.topRatedMovies,
        title: "Top Rated",
        genre: "toprated",
        selector: movieSelectors.selectTopRatedMovies,
    },
    {
        id: 1,
        thunk: fetchActionMoviesAsync,
        url: restql.movieAssetsByGenre,
        title: "Action",
        genre: "action",
        selector: movieSelectors.selectActionMovies,
    },
    {
        id: 2,
        thunk: fetchNetflixMoviesAsync,
        url: restql.topRatedMovies,
        title: "Macrometa Originals",
        genre: "originals",
        selector: movieSelectors.selectNetflixMovies,
        isLarge: true,
    },
    {
        id: 3,
        thunk: fetchAdventureMoviesAsync,
        url: restql.movieAssetsByGenre,
        title: "Adventure",
        genre: "adventure",
        selector: movieSelectors.selectAdventureMovies,
    },
    {
        id: 4,
        thunk: fetchComedyMoviesAsync,
        url: restql.movieAssetsByGenre,
        title: "Comedy",
        genre: "comedy",
        selector: movieSelectors.selectComedyMovies,
    },
    {
        id: 5,
        thunk: fetchHorrorMoviesAsync,
        url: restql.movieAssetsByGenre,
        title: "Horror",
        genre: "horror",
        selector: movieSelectors.selectHorrorMovies,
    },
    {
        id: 6,
        thunk: fetchRomanceMoviesAsync,
        url: restql.movieAssetsByGenre,
        title: "Romance",
        genre: "romance",
        selector: movieSelectors.selectRomanceMovies,
    },
    {
        id: 7,
        thunk: fetchAnimationMoviesAsync,
        url: restql.movieAssetsByGenre,
        title: "Animation",
        genre: "animation",
        selector: movieSelectors.selectAnimationMovies,
    },
    {
        id: 8,
        thunk: fetchTrendingMoviesAsync,
        url: restql.topRatedMovies,
        title: "Trending Now",
        genre: "trending",
        selector: movieSelectors.selectTrendingMovies,
    },
]

export const fetchSeriesDataConfig = [
    {
        id: 0,
        thunk: fetchTrendingSeriesAsync,
        url: restql.topRatedTvSeries,
        title: "Trending Now",
        genre: "trending",
        selector: seriesSelectors.selectTrendingSeries,
    },
    {
        id: 2,
        thunk: fetchActionAdventureSeriesAsync,
        url: restql.tvSeriesAssetsByGenre,
        title: "Action & Adventure",
        genre: "actionadventure",
        selector: seriesSelectors.selectActionAdventureSeries,
    },
    {
        id: 1,
        thunk: fetchNetflixSeriesAsync,
        url: restql.topRatedTvSeries,
        title: "Macrometa Originals",
        genre: "macrometa",
        selector: seriesSelectors.selectNetflixSeries,
        isLarge: true,
    },
    {
        id: 3,
        thunk: fetchAnimationSeriesAsync,
        url: restql.tvSeriesAssetsByGenre,
        title: "Animation",
        genre: "animation",
        selector: seriesSelectors.selectAnimationSeries,
    },
    {
        id: 4,
        thunk: fetchComedySeriesAsync,
        url: restql.tvSeriesAssetsByGenre,
        title: "Comedy",
        genre: "comedy",
        selector: seriesSelectors.selectComedySeries,
    },
    {
        id: 5,
        thunk: fetchCrimeSeriesAsync,
        url: restql.tvSeriesAssetsByGenre,
        title: "Crime",
        genre: "crime",
        selector: seriesSelectors.selectCrimeSeries,
    },
    {
        id: 6,
        thunk: fetchDocumentarySeriesAsync,
        url: restql.tvSeriesAssetsByGenre,
        title: "Documentary",
        genre: "documentary",
        selector: seriesSelectors.selectDocumentarySeries,
    },
    {
        id: 7,
        thunk: fetchFamilySeriesAsync,
        url: restql.tvSeriesAssetsByGenre,
        title: "Family",
        genre: "family",
        selector: seriesSelectors.selectFamilySeries,
    },
    {
        id: 8,
        thunk: fetchKidsSeriesAsync,
        url: restql.tvSeriesAssetsByGenre,
        title: "Kids",
        genre: "kids",
        selector: seriesSelectors.selectKidsSeries,
    },
    {
        id: 9,
        thunk: fetchSciFiFantasySeriesAsync,
        url: restql.tvSeriesAssetsByGenre,
        title: "Sci-Fi & Fantasy",
        genre: "scififantasy",
        selector: seriesSelectors.selectSciFiFantasySeries,
    },
]

export const genresList = [
    {
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
    {
        id: 10759,
        name: "Action & Adventure",
    },
    {
        id: 10762,
        name: "Kids",
    },
    {
        id: 10763,
        name: "News",
    },
    {
        id: 10764,
        name: "Reality",
    },
    {
        id: 10765,
        name: "Sci-Fi & Fantasy",
    },
    {
        id: 10766,
        name: "Soap",
    },
    {
        id: 10767,
        name: "Talk",
    },
    {
        id: 10768,
        name: "War & Politics",
    },
]

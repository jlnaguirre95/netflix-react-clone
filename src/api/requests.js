const lang = 'en-US'; // es-MX

const requests = {
    fetchTrending: {
        url: `/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=${lang}`,
        requestType: 'all',
    },
    fetchNetflixOriginals: {
        url: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213`,
        requestType: 'tv',
    },
    fetchPopularMovies: {
        url: `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${lang}&page=1`,
        requestType: 'movie'
    },
    fetchPopularTvShows: {
        url: `/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${lang}&page=1`,
        requestType: 'tv'
    },
    fetchTopRated: {
        url: `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=${lang}`,
        requestType: 'movie',
    },
    fetchActionMovies: {
        url: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28`,
        requestType: 'movie',
    },
    fetchComedyMovies: {
        url: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35`,
        requestType: 'movie',
    },
    fetchHorrorMovies: {
        url: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=27`,
        requestType: 'movie',
    },
    fetchRomanceMovies: {
        url: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749`,
        requestType: 'movie',
    },
    fetchDocumentaries: {
        url: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99`,
        requestType: 'movie',
    },
    fetchItemDetails: (mediaType, itemID) => {
        return `/${mediaType}/${itemID}?api_key=${process.env.REACT_APP_API_KEY}&language=${lang}`;
    },
    searchByQuery: (query) => {
        return `/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&language=${lang}&page=1&include_adult=false`
    }
};

export default requests;

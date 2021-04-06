import React from 'react';
import './style.css';
//components
import Row from '../Row';
//data
import requests from '../../api/requests';

const Content = () => {
    return (
        <main className="content">
            <Row
                title="NETFLIX ORIGINALS"
                requestUrl={requests.fetchNetflixOriginals.url}
                requestType={requests.fetchNetflixOriginals.requestType}
                isPosterRow={true}
            />
            <Row
                title="Trending Now"
                requestUrl={requests.fetchTrending.url}
                requestType={requests.fetchTrending.requestType}
            />
            <Row
                title="Top Rated"
                requestUrl={requests.fetchTopRated.url}
                requestType={requests.fetchTopRated.requestType}
            />
            <Row
                title="Action"
                requestUrl={requests.fetchActionMovies.url}
                requestType={requests.fetchActionMovies.requestType}
            />
            <Row
                title="Comedy"
                requestUrl={requests.fetchComedyMovies.url}
                requestType={requests.fetchComedyMovies.requestType}
            />
            <Row
                title="Horror"
                requestUrl={requests.fetchHorrorMovies.url}
                requestType={requests.fetchHorrorMovies.requestType}
            />
            <Row
                title="Romance"
                requestUrl={requests.fetchRomanceMovies.url}
                requestType={requests.fetchRomanceMovies.requestType}
            />
            <Row
                title="Documentaries"
                requestUrl={requests.fetchDocumentaries.url}
                requestType={requests.fetchDocumentaries.requestType}
            />
        </main>
    );
};

export default Content;

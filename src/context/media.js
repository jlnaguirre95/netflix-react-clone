import { createContext, useState } from 'react';
import axios from '../api';
import requests from '../api/requests';
import { db } from '../services/firebase';
import { dataWatcher } from '../services/firebase/watchers';

export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
    const [query, setQuery] = useState('');
    const [mediaResults, setMediaResults] = useState([]);
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [myList, setMyList] = useState([]);

    const getSearchResults = async (history) => {
        try {
            if (query.length > 1) {
                history.push(`/search/${query.replace(/ /g, '-')}`);
                const res = await axios.get(requests.searchByQuery(query));
                setMediaResults(res.data.results);
                setQuery('');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const getMovies = async () => {
        const res = await axios.get(requests.fetchPopularMovies.url);
        setMovies(res.data.results);
    };

    const getTvShows = async () => {
        const res = await axios.get(requests.fetchPopularTvShows.url);
        setTvShows(res.data.results);
    };

    const getMyList = (uid) => {
        dataWatcher('users', (data) => {
            const currentUser = data.find((user) => user.uid === uid);
            setMyList(currentUser.myList);
        });
    };

    const addNewItemToMyList = async (userData, newItem) => {
        const itemExists = userData.myList.find(item => item.id === newItem.id);
        if(!itemExists)
        await db
            .collection('users')
            .doc(userData.id)
            .update({
                myList: [...userData.myList, newItem],
            });
    };

    const removeItemOfMyList = async (userData, itemID) => {
        await db
            .collection('users')
            .doc(userData.id)
            .update({
                myList: userData.myList.filter((item) => item.id !== itemID),
            });
    };

    return (
        <MediaContext.Provider
            value={{
                query,
                setQuery,
                getSearchResults,
                mediaResults,
                getMovies,
                getTvShows,
                getMyList,
                movies,
                tvShows,
                myList,
                addNewItemToMyList,
                removeItemOfMyList,
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};

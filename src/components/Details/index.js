import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import { motion } from 'framer-motion';
import axios from '../../api';
import requests from '../../api/requests';
import { MediaContext } from '../../context/media';
import { UserContext } from '../../context/users';
//assets
import imdbIcon from '../../assets/imdb-icon.png';
import Loader from 'react-loader-spinner';
import AddItemIcon from '@material-ui/icons/AddCircleOutline';
//import YouTube from 'react-youtube';
//import movieTrailer from 'movie-trailer';
//Youtube Player Options
/* const opts = {
    width: '100%',
    playerVars: {
        autoplay: 1
    }
}; */

const Details = ({ itemMediaType, itemID, closeDetails }) => {
    const { userData, isLogged } = useContext(UserContext);
    const history = useHistory();
    const { addNewItemToMyList } = useContext(MediaContext);
    const [item, setItem] = useState({});
    const [isInMyList, setIsInMyList] = useState(false);
    //const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        getDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData, itemMediaType, itemID, isInMyList]);

    const getDetails = async () => {
        const res = await axios.get(
            requests.fetchItemDetails(itemMediaType, itemID)
        );
        setItem(res.data);
    };

    /* const getTrailer = async () => {
        if(trailerUrl) {
            setTrailerUrl('');
        } else {
            try {
                const res = await movieTrailer(item.name || item.original_name || item.title || item.original_title);
                const urlParams = new URLSearchParams(new URL(res).search);
                setTrailerUrl(urlParams.get('v'));
                console.log(trailerUrl);
            } catch (error) {
                console.log(error.message)
            }
        }
    } */

    /* const mapGenres = item.genres.map((genre, i) => (
        <li key={i}>{genre.name}</li>
    ))  */

    if (!item) {
        return (
            <div className="details details--loader">
                <Loader type="Puff" color="#e50914" />
            </div>
        );
    } else {
        return (
            <motion.section
                className="details"
                initial={{ opacity: 0, y: -400 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="container">
                    <div className="details__left-wrapper">
                        <div className="details__head">
                            <div className="details__title">
                                <span className="details__media">
                                    {itemMediaType === 'tv'
                                        ? 'tv show'
                                        : 'movie'}
                                </span>
                                <h3>
                                    {item.name ||
                                        item.original_name ||
                                        item.title ||
                                        item.original_title}
                                </h3>
                                {item.genres && (
                                    <ul className="details__genres">
                                        {item.genres.map((genre) => (
                                            <li key={genre.id}>{genre.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="details__actions">
                                <button
                                    className="btn details__button"
                                    onClick={
                                        isLogged
                                            ? () => {
                                                  addNewItemToMyList(
                                                      userData,
                                                      item
                                                  );
                                                  setIsInMyList(true);
                                              }
                                            : () => history.push('/login')
                                    }
                                >
                                    <AddItemIcon />
                                    My list
                                </button>
                                {isInMyList && <span>Added!!!</span>}
                            </div>
                        </div>
                        <p className="details__overview">{item.overview}</p>
                        <div className="details__specifications">
                            <div className="details__duration">
                                {' '}
                                <span>Duration:</span>
                                {itemMediaType === 'tv'
                                    ? `${item.number_of_seasons} ${
                                          item.number_of_seasons === 1
                                              ? 'Season'
                                              : 'Seasons'
                                      }`
                                    : `${item.runtime} min.`}
                            </div>
                            <div className="details__release">
                                <span>Release:</span>{' '}
                                {item.first_air_date || item.release_date}
                            </div>
                            <div className="details__rating">
                                <span>Rating:</span> {item.vote_average}
                                <img src={imdbIcon} alt="imdb logo" />
                            </div>
                            {item.created_by && (
                                <div className="details__productor">
                                    <span>Productor:</span>
                                    <div>
                                        {item.created_by.map((p) => (
                                            <p key={p.id}>{p.name}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className="details__right-wrapper"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url("https://image.tmdb.org/t/p/original${item.backdrop_path}")`,
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* <YouTube opts={opts} /> */}
                    </div>
                </div>
            </motion.section>
        );
    }
};

export default Details;

import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import './style.css';
import { UserContext } from '../../context/users';
import { MediaContext } from '../../context/media';
//data
import axios from '../../api';
import requests from '../../api/requests';
//componenst
import ModalDetails from '../Details/Modal';
//assets
import PlayIcon from '@material-ui/icons/PlayArrowRounded';
import AddItemIcon from '@material-ui/icons/AddCircleOutline';

const Banner = () => {
    const history = useHistory();
    const { userData, isLogged } = useContext(UserContext);
    const { addNewItemToMyList } = useContext(MediaContext);
    const [movie, setMovie] = useState(null);
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = await axios.get(requests.fetchTrending.url);
        const data = res.data.results;
        setMovie(data[Math.floor(Math.random() * data.length)]);
        return res;
    };

    return (
        <header
            className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `linear-gradient(
                    to right,
                    rgba(0,0,0,0.8),
                    rgba(0,0,0,0.4),
                    rgba(0,0,0,0)
                ), url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: 'top',
            }}
        >
            <div className="container">
                <div className="banner__content">
                    <h1 className="banner__title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <p className="banner__description">{movie?.overview}</p>
                    <div className="banner__buttons">
                        <button
                            className="btn btn--play"
                            onClick={() => setIsOpenDetails(true)}
                        >
                            <PlayIcon />
                            Play
                        </button>
                        <button
                            className="btn btn--info"
                            onClick={
                                isLogged
                                    ? () => addNewItemToMyList(userData, movie)
                                    : () => history.push('/login')
                            }
                        >
                            <AddItemIcon />
                            My List
                        </button>
                    </div>
                </div>
            </div>
            {/* gradient image banner at bottom */}
            <div className="banner--gradient-bottom" />
            {isOpenDetails && (
                <ModalDetails
                    closeModalDetails={() => setIsOpenDetails(false)}
                    itemMediaType={movie.media_type}
                    itemID={movie.id}
                />
            )}
        </header>
    );
};

export default Banner;

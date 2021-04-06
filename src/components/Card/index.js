import React from 'react';
import './style.css';
import { motion } from 'framer-motion';

const Card = ({ item, isPosterRow, setHeadingTitle, openDetails }) => {
    const {
        media_type,
        request_type,
        id,
        poster_path,
        backdrop_path,
        name,
        original_title,
    } = item;

    return (
        <motion.div
            className="card"
            onMouseOver={() => setHeadingTitle(name || original_title)}
            onMouseOut={() => setHeadingTitle('')}
            onClick={() => openDetails(media_type || request_type, id)}
            initial={{scale: 0}}
            animate={{scale: 1}}
        >
            <img
                className="card__poster"
                src={`https://image.tmdb.org/t/p/original${
                    isPosterRow ? poster_path : backdrop_path
                }`}
                alt={name || original_title}
            />
        </motion.div>
    );
};

export default Card;

import React, { useState, useEffect } from 'react';
import './style.css';
import { motion } from 'framer-motion';
import ModalDetails from '../../components/Details/Modal';

const MediaList = ({ listName, getDataFromApi, listArray, mediaType }) => {
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [itemMediaType, setItemMediaType] = useState(null);
    const [itemID, setItemID] = useState(null);

    useEffect(() => {
        if(listName !== 'Results') {
            document.title = `Netflix Clone | ${listName}`;
            getDataFromApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listName]);

    const openModalDetails = async (itemMediaType, id) => {
        setItemMediaType(itemMediaType || mediaType);
        setItemID(id);
        setIsOpenDetails(true);
    };

    const mapItems = listArray.map((item) => (
        <motion.div
            key={item.id}
            className="media-lists__card"
            onClick={() => openModalDetails(item.media_type, item.id)}
            initial={{scale: 0}}
            animate={{scale: 1}}
        >
            <img
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                alt={
                    item.name ||
                    item.original_name ||
                    item.title ||
                    item.original_title
                }
            />
        </motion.div>
    ));

    return (
        <div className="media-lists">
            <div className="container">
                <h2>{listName}</h2>
                {listArray.length === 0 && listName === 'Results' ? (
                    <h3>No results found for your search</h3>
                ) : (
                    <div className="media-lists__items">{mapItems}</div>
                )}
            </div>
            {isOpenDetails && (
                <ModalDetails
                    closeModalDetails={() => setIsOpenDetails(false)}
                    itemMediaType={itemMediaType}
                    itemID={itemID}
                />
            )}
        </div>
    );
};

export default MediaList;

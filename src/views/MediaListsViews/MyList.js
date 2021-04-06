import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { motion } from 'framer-motion';
import { UserContext } from '../../context/users';
import { MediaContext } from '../../context/media';

const MyList = () => {
    const { userData } = useContext(UserContext);
    const { myList, getMyList, removeItemOfMyList } = useContext(MediaContext);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [itemID, setItemID] = useState('');

    useEffect(() => {
        document.title = 'Netflix Clone | My List';
        getMyList(userData.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const mapItems = myList.map((item) => (
        <motion.div
            key={item.id}
            className="media-lists__card"
            onClick={() => {
                setItemID(item.id);
                setIsOpenConfirm(true);
            }}
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
        <>
            <div className="media-lists">
                <div className="container">
                    <h2>My List</h2>
                    {myList.length === 0 ? (
                        <h3>You have not added items yet</h3>
                    ) : (
                        <div className="media-lists__items">{mapItems}</div>
                    )}
                </div>
            </div>
            {isOpenConfirm && (
                <div className="modal">
                    <div className="modal__content">
                        <p>Are you sure you want to remove this item?</p>
                        <div className="actions">
                            <button
                                className="btn btn--red"
                                onClick={() => {
                                    removeItemOfMyList(userData, itemID);
                                    setIsOpenConfirm(false);
                                }}
                            >
                                Yes!
                            </button>
                            <button
                                className="btn btn--red"
                                onClick={() => {
                                    setItemID('');
                                    setIsOpenConfirm(false);
                                }}
                            >
                                Nop
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyList;

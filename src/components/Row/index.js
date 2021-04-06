import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import axios from '../../api';
//components
import Card from '../Card';
import Details from '../Details';
//assets
import ArrowToLeft from '@material-ui/icons/ArrowBackIosRounded';
import ArrowToRight from '@material-ui/icons/ArrowForwardIosRounded';

const Row = ({ title, requestUrl, requestType, isPosterRow }) => {
    const [items, setItems] = useState([]);
    const [headingTitle, setHeadingTitle] = useState('');
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [itemMediaType, setItemMediaType] = useState(null);
    const [itemID, setItemID] = useState(null);
    const carouselRef = useRef();
    const itemsWrapperRef = useRef();

    useEffect(() => {
        getData();
        scrollReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            setItems([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestUrl]);

    const getData = async () => {
        const res = await axios.get(requestUrl);
        const data = res.data.results
        setItems(data.map(item => {
            return {
                request_type: requestType,
                ...item
            }
        }))
    };

    const scrollReset = () => {
        let carousel = carouselRef.current;
        carousel.scrollLeft = 0;
    };

    const handleScrollToRight = () => {
        let carousel = carouselRef.current;
        let itemsWrapper = itemsWrapperRef.current 
        carousel.scrollLeft += itemsWrapper.offsetWidth;
    };

    const handleScrollToLeft = () => {
        let carousel = carouselRef.current;
        let itemsWrapper = itemsWrapperRef.current 
        carousel.scrollLeft -= itemsWrapper.offsetWidth;
    };

    const openDetails = (mediaType, id) => {
        setItemMediaType(mediaType);
        setItemID(id);
        setIsOpenDetails(!isOpenDetails)
    };

    const mapItems = items.map((item) => (
        <Card
            key={item.id}
            item={item}
            isPosterRow={isPosterRow}
            setHeadingTitle={setHeadingTitle}
            openDetails={openDetails}
        />
    ));

    return (
        <div className="row">
            <div className="row__header">
                <div className="container">
                    <h2>
                        {title} : <span>{headingTitle}</span>
                    </h2>
                    <div className="row__indicators"></div>
                </div>
            </div>
            <div className="row__wrapper-carousel">
                <span
                    className="row__arrow row__arrow--left"
                    onClick={handleScrollToLeft}
                >
                    <ArrowToLeft />
                </span>
                <div className="row__carousel" ref={carouselRef}>
                    <div className="container">
                        <div className="row__items" ref={itemsWrapperRef}>{mapItems}</div>
                    </div>
                </div>
                <span
                    className="row__arrow row__arrow--right"
                    onClick={handleScrollToRight}
                >
                    <ArrowToRight />
                </span>
            </div>
            {isOpenDetails && (
                
                    <Details itemMediaType={itemMediaType} itemID={itemID} closeDetails={() => setIsOpenDetails(false)} />
                
            )}
        </div>
    );
};

export default Row;

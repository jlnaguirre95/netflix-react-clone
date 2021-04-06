import React, { useEffect } from 'react';
//components
import Banner from '../components/Banner';
import Content from '../components/Content';

const Home = () => {

    useEffect(() => {
        document.title = 'Netflix Clone'
    });

    return (
        <div className="Home">
            <Banner />
            <Content />
        </div>
    );
};

export default Home;

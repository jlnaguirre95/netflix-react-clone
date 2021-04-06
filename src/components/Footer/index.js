import React from 'react';
import './style.css';

const Footer = () => {
    return (
        <footer>
            <p>Netflix Clone powered with React by Julián Aguirre</p>
            <p>
                Go to the Real{' '}
                <a
                    href="https://www.netflix.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Netflix
                </a>
            </p>
        </footer>
    );
};

export default Footer;

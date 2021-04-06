import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { UserContext } from '../../context/users';
//assets
import DiscoverIcon from '@material-ui/icons/PublicRounded';
import Loader from 'react-loader-spinner';

const Layout = ({ children }) => {
    const { isLoading } = useContext(UserContext);
    return (
        <div className="auth-view">
            <div className="container">
                <div className="auth-view__head">
                    <div className="auth-view__logo">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2014_logo.svg/1920px-Netflix_2014_logo.svg.png"
                            alt="Netflix logo"
                        />
                    </div>
                    <div className="auth-view__discover">
                        <Link to="/">Discover</Link>
                        <DiscoverIcon />
                    </div>
                </div>
                <div className="auth-view__form">
                    <div className="auth-view__form-container">
                        {children}
                        {isLoading && (
                            <div className="auth-view__loader">
                                <Loader type="Puff" color="#e50914" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;

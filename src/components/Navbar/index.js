import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './style.css';
import { motion } from 'framer-motion';
import { UserContext } from '../../context/users';
import { MediaContext } from '../../context/media';
//assets
import SearchIcon from '@material-ui/icons/Search';
import defaultAvatar from '../../assets/default-avatar.jpg';
import LogoutIcon from '@material-ui/icons/ExitToApp';

const Navbar = () => {
    const history = useHistory();
    const { query, setQuery, getSearchResults } = useContext(MediaContext);
    const { userData, isLogged, signOut } = useContext(UserContext);
    const [switchNavbarColor, setSwitchNavbarColor] = useState(false);
    const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setSwitchNavbarColor(true);
            } else {
                setSwitchNavbarColor(false);
            }
        });
    }, []);

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            getSearchResults(history)
            console.log('Searched')
        }
    }

    const toggleUserOptions = () => setIsUserOptionsOpen(!isUserOptionsOpen);

    return (
        <nav className={`navbar ${switchNavbarColor && 'navbar--solid-color'}`}>
            <div className="container">
                <div className="navbar__logo" onClick={() => history.push('/')}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2014_logo.svg/1920px-Netflix_2014_logo.svg.png"
                        alt="Netflix logo"
                    />
                </div>
                <ul className="navbar__navigation">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/tv-shows">TV Shows</Link>
                    </li>
                    <li>
                        <Link to="/movies">Movies</Link>
                    </li>
                    {isLogged && (
                        <li>
                            <Link to="/my-list">Mi lista</Link>
                        </li>
                    )}
                </ul>
                <div className="navbar__options">
                    <div className="navbar__search">
                        <button onClick={() => getSearchResults(history)}>
                            <SearchIcon />
                        </button>
                        <input
                            type="text"
                            placeholder="Movies and TV Shows"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    {isLogged ? (
                        <>
                            <div
                                className="navbar__user"
                                onClick={toggleUserOptions}
                            >
                                <img src={defaultAvatar} alt="user" />
                            </div>
                            {isUserOptionsOpen && (
                                <motion.div className="navbar__user-options" onClick={() => signOut(history)} initial={{x: 400}} animate={{x: 0}}>
                                    <span>{userData.username}</span>
                                    <button><LogoutIcon /></button>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <button
                            className="btn btn--red"
                            onClick={() => history.push('/login')}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

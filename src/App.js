import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MediaContext } from './context/media';
import { UserContext } from './context/users';
//components
import Loader from 'react-loader-spinner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const Home = lazy(() => import('./views/Home'));
const Login = lazy(() => import('./views/AuthViews/Login'));
const Register = lazy(() => import('./views/AuthViews/Register'));
const MediaList = lazy(() => import('./views/MediaListsViews'));
const MyList = lazy(() => import('./views/MediaListsViews/MyList'));

function App() {
    const { mediaResults, getMovies, getTvShows, movies, tvShows } = useContext(
        MediaContext
    );

    const { userData } = useContext(UserContext);

    return (
        <Router>
            <Suspense
                fallback={
                    <div className="loader">
                        <Loader type="Puff" color="#e50914" />
                    </div>
                }
            >
                <Switch>
                    <Route exact path="/">
                        <Navbar />
                        <Home />
                        <Footer />
                    </Route>
                    <Route exact path="/search/:query">
                        <Navbar />
                        <MediaList
                            listName="Results"
                            listArray={mediaResults}
                            //mediaType={}
                        />
                    </Route>
                    <Route exact path="/movies">
                        <Navbar />
                        <MediaList
                            listName="Movies"
                            getDataFromApi={getMovies}
                            listArray={movies}
                            mediaType="movie"
                        />
                    </Route>
                    <Route exact path="/tv-shows">
                        <Navbar />
                        <MediaList
                            listName="TV Shows"
                            getDataFromApi={getTvShows}
                            listArray={tvShows}
                            mediaType="tv"
                        />
                    </Route>
                    {userData && (
                        <Route exact path="/my-list">
                            <Navbar />
                            <MyList />
                        </Route>
                    )}
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/Register">
                        <Register />
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;

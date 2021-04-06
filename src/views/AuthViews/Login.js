import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/users';
import Layout from './index';

const Login = () => {
    const history = useHistory()
    const { signIn, error, setError } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = 'Netflix Clone | Login'
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(email, password, history);
    };

    return (
        <Layout>
            <h1>Sign In</h1>
            {error && (
                <div className="auth-view__error">
                    <p>{error} Try again!</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className={`auth-view__input ${error && 'auth-view__input--error'}`}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={`auth-view__input ${error && 'auth-view__input--error'}`}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn--red auth-view__btn"
                >
                    Login
                </button>
            </form>
            <p>
                First Time On Netflix?{' '}
                <strong onClick={() => {
                    history.push('/register')
                    setError('')
                }}>
                    Sign Up
                </strong>
            </p>
        </Layout>
    );
};

export default Login;

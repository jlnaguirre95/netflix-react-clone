import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/users';
import Layout from './index';

const Register = () => {
    const history = useHistory()
    const { signUp, signIn, error, setError } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        document.title = 'Netflix Clone | Sign Up'
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(email, password, confirmPassword, username);
        signIn(email, password, history);
    }

    return (
        <Layout>
            <h1>Sign Up</h1>
            {error && (
                <div className="auth-view__error">
                    <p>{error} Try again!</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className={`auth-view__input ${error && 'auth-view__input--error'}`}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={`auth-view__input ${error && 'auth-view__input--error'}`}>
                    <input
                        type="text"
                        placeholder="email"
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
                <div className={`auth-view__input ${error && 'auth-view__input--error'}`}>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn--red auth-view__btn">
                    Register
                </button>
            </form>
            <p>
                Already have an account?{' '}
                <strong onClick={() => {
                    history.push('/login')
                    setError('')
                }}>
                    Sign In
                </strong>
            </p>
        </Layout>
    );
};

export default Register;

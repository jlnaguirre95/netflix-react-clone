import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { MediaProvider } from './context/media';
import { UserProvider } from './context/users';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <MediaProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </MediaProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


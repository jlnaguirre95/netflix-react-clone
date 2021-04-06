import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: 'AIzaSyCIj1xOkDrCLABWkCVIvgeshWtHAkOpVKw',
    authDomain: 'netflix-clone-react-c4867.firebaseapp.com',
    projectId: 'netflix-clone-react-c4867',
    storageBucket: 'netflix-clone-react-c4867.appspot.com',
    messagingSenderId: '384661897773',
    appId: '1:384661897773:web:fa46f1d77f5fcd74252ea4',
});

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };

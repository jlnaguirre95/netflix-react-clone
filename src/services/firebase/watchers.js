import { db, auth } from './index';

export const userAuthWatcher = (callback) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
        if(userAuth) {
            callback(userAuth);
        } else {
            callback(null)
        }
    })
    return unsubscribe;
}

export const dataWatcher = (collection, callback) => {
    const unsubscribe = db
        .collection(collection)
        .onSnapshot(snapshot => {
            let data = [];
            snapshot.forEach(doc => {
                data.push({ id: doc.id, ...doc.data()})
            });
            callback(data);
        });
    return unsubscribe;
}
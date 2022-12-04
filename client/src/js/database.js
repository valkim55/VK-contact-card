import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

// export an async function to open a connection with the IndexedDB API, configure it and initialize a database
export const initDb = async() => {

    // creating a new database called 'contact_db' which will be using version 1 of the database
    openDB('contact_db', 1, {
        // using upgrade() method to check if the database already contains an object store called 'contacts'
        upgrade(db) {
            if(db.objectStoreNames.contains('contacts')) {
                console.log('contacts store already exists');
                return;
            }
            // if it doesn't contain 'contacts' object store, create a new object store for the data and give it a key name of 'id' which will increment automatically
            db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
            console.log('contacts store created');
        }
    })
}
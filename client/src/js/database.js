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
};

// GET/READ data form the database
export const getDb = async() => {
    console.log('GET from the database');

    // create a connection to the indexedDB database and the version we want to use
    const contactDb = await openDB('contact_db', 1);

    // create a new transaction and specify the store and data privileges
    const tx = contactDb.transaction('contacts', 'readonly');

    // open up desired object store
    const store = tx.objectStore('contacts');

    // use getAll() method to get all data in the database
    const request = store.getAll();

    // get information on the request
    const result = await request;
    console.log('result.value', result);
    return result;
}

// CREATE/POST data into the database
export const postDb = async(name, email, phone, profile) => {
    console.log('POST into the database');

    const contactDb = await openDB('contact_db', 1);
    const tx = contactDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');
    const request = store.add( { name: name, email: email, phone: phone, profile: profile } );
    const result = await request;
    console.log("data saved to the database", result);
}

// DELETE existing data from the database
export const deleteDb = async(id) => {
    console.log('DELETE from database', id);

    const contactDb = await openDB('contact_db', 1);
    const tx = contactDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');
    const request = store.delete(id);
    const result = await request;
    console.log('result.value', result);
    return result?.value;
}

// UPDATE database
export const editDb = async (id, name, email, phone, profile) => {
    console.log('PUT to the database');
  
    const contactDb = await openDB('contact_db', 1);
    const tx = contactDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');
    const request = store.put({ id: id, name: name, email: email, phone: phone, profile: profile });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  };
  
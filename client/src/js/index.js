import { initDb, postDb, deleteDb, editDb } from './database';
import {fetchCards} from './cards';
import { toggleForm, clearForm } from './form';

import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

// import CSS files
import "../css/index.css";

// import bootstrap
import { Tooltip, Toast, Popover} from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


window.addEventListener('load', function() {
    initDb();

    // pull data from IndexedDB database to create a new card and render data per object
    fetchCards();

    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
});

// form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
    toggleForm();
})

form.addEventListener('submit', event => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;

    // POST form data to IndexedDB or EDIT an existing card in IndexedDB
    if(submitBtnToUpdate == false) {
        postDb(name, email,phone, profile);
    } else {

        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let profile = document.querySelector('input[type="radio"]:checked').value;

        // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
        editDb(profileId, name, email, phone, profile);

        fetchCards();

        // toggle the submit button back to POST functionality
        submitBtnToUpdate = false;
    }

    // clear the forms after each submission
    clearForm();
    // toggle form
    toggleForm();
    // reload the DOM
    fetchCards();
})

// the function is scoped to the window object to give each card access to this function
window.deleteCard = (e) => {
    // grab the id from the button element attached to the contact card
    let id = parseInt(e.id);

    // delete the card by id
    deleteDb(id);

    // reload the DOM
    fetchCards();
};

// in order ot update the card, code needs to be added inside of this function to set submitBtnToUpdate to TRUE
window.editCard = (e) => {
    // Grabs the id from the button element attached to the contact card and sets a global variable that will be used in the form element.
    profileId = parseInt(e.dataset.id);
    
    // Grabs information to pre-populate edit form
    let editName = e.dataset.name;
    let editEmail = e.dataset.email;
    let editPhone = e.dataset.phone;
    
    document.getElementById("name").value = editName;
    document.getElementById("email").value = editEmail;
    document.getElementById("phone").value = editPhone;
    
    // controls visibility of the form element
    form.style.display = "block";
    
    // Toggles the submit button so that it now Updates an existing contact instead of posting a new one
    submitBtnToUpdate = true;
};

// service worker registration code
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  })};
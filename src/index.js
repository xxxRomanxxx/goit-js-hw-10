import './css/styles.css';
import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('input');

inputCountry.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
    const countryName = inputCountry.value.trim();
    console.log(countryName);
    fetch(`https://restcountries.com/v3.1/name/${countryName}`).then(r => r.json()).then(
    data => { 
    
        if (data.length > 10) {
            
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (data.length > 2 && data.length < 10) {
            console.log('від 2 до 10');
            data.map((item) => {
            console.log(item)
            })
        }
         else if (data.length === 1) data.map((item) => {
            console.log(item)
            });
    })
    
}

function fetchCountry(name) {
    
}

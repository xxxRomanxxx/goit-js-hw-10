import fetchCountries  from "./js/fetchCountries";
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('input');
const countryList = document.querySelector('.country-list');

inputCountry.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch() {
    const countryName = inputCountry.value.trim();
    if (countryName === '') {
        return;
      }
    fetchCountries(countryName).then(
        data => { 
            if (data.length > 10) {
                clener();
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (data.length >= 2 && data.length <= 10) {
              countryListInfo(data) 
            }
             else if(data.length = 1) {
                countryInfo(data)
             }     
        }).catch(error => {}).finally(() => {});

}

function countryInfo(data) {
    clener();
    const markupListOne = data.map(({flags, name, capital, population, languages}) => {
        return `<li class="country-list__item">
        <img class="country-list__image" src="${flags.svg}" alt="d${name}">
                <h2 class="country-list__title">${name}</h2>
                <p class="country-list__text-capital">Capital: ${capital}</p>
                <p class="country-list__text-pupulation">Population: ${population}</p>
                <p class="country-list__text-lenguages">:Languages: ${languages.map((item)=>item.name).join('')}</p>
                 </li>`  
      }).join('');
      countryList.insertAdjacentHTML('afterbegin', markupListOne);
}

function countryListInfo(data) {
    clener();
               const markupList = data.map(({flags, name}) => {
                  return `<li class="country-list__item">
                  <img class="country-list__image" src="${flags.svg}" alt="${name}">
                          <p class="country-list__text">${name}</p>
                           </li>`  
                }).join('');
                countryList.insertAdjacentHTML('afterbegin', markupList); 
}

function clener() {
    countryList.innerHTML='';
}
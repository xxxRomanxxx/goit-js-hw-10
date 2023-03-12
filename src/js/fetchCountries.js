export default fetchCountries;
import Notiflix from 'notiflix';

function fetchCountries(name) {
   return fetch(`https://restcountries.com/v2/name/${name}`).then(response => {
        if (!response.ok) {
            Notiflix.Notify.failure(
                'Oops, there is no country with that name');
            throw new Error(response.status);
        }
       return response.json()})
}
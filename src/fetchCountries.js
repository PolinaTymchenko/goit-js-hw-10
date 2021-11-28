export { fetchCountries };
import Notiflix from 'notiflix';
    
function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                onFetchError();
            }
        });
};


function onFetchError() {
    Notiflix.Notify.failure("Oops, there is no country with that name")
}

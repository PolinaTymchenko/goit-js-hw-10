// import './css/styles.css';
import { fetchCountries } from "./fetchCountries.js";
import Notiflix from 'notiflix';
import countryCard from "./country-card.hbs";
import countryList from "./country-list.hbs";
import _ from "lodash";

const DEBOUNCE_DELAY = 300;
const refs = {
    countryInfo: document.querySelector(".country-info"),
    countryList: document.querySelector(".country-list"),
    searchBox: document.querySelector("#search-box"),
}

refs.searchBox.addEventListener("input", _.debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const input = e.target.value;
    if (input === "") {
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
        return;
    }
    fetchCountries(input).then(renderCountryView);
};

function renderCountryView(countries) {
    if (countries.length > 10) {
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (countries.length <= 10 && countries.length > 1) {
        renderCountryList(countries)
    } else {
        renderCountryCard(countries)
    };
}

function renderCountryList(countries) {
    refs.countryInfo.innerHTML = "";
    const markup = countryList(countries)
    refs.countryList.innerHTML = markup;
}

function renderCountryCard(country) {
    refs.countryList.innerHTML = "";
    const markup = countryCard(country[0]);
    refs.countryInfo.innerHTML = markup;
};


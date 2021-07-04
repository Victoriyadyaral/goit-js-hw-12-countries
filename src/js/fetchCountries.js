import countriseListTpl from '../templates/countriesList.hbs';
import oneCountryTpl from '../templates/oneCountry.hbs';
import refs from './refs.js'

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/countdown/dist/PNotifyCountdown.css";
import { alert } from '@pnotify/core';

const BASE_URL = 'https://restcountries.eu/rest/v2/name';

const fetchCountries = (searchQuery) => {
  const url = `${BASE_URL}/${searchQuery}`;

  return fetch(url).then(response => response.json());
}
export default function getCountryInfo(searchQuery) {
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        alert({
          title: "Too many matches found",
          text: "Please enter a more specific query!",
          type: 'error',
          delay: 3000,
          hide: true,
        });
      } else if (data.length === 1) {
        buildListMarkup(data, oneCountryTpl);
        refs.input.value = '';
      } else if (data.length <= 10) {
        buildListMarkup(data, countriseListTpl);
        alert({
          title: "Found more than one country",
          text: "Choose country you are searching for!",
          type: 'info',
          delay: 2500,
          hide: true,
        });
      } else if (data.status === 404) {
        alert({
          title: "No country has been found",
          text: "Please enter the country!",
          type: 'error',
          delay: 3000,
          hide: true,
        });
      }
    })
    .catch(() => {
      alert({
        title: "Error",
        text: "Please, try again!",
        type: 'error',
        delay: 3000,
        hide: true,
      });
    });
}

function buildListMarkup(countries, template) {
  const markup = countries.map(country => template(country)).join('');
  refs.countryContainerList.insertAdjacentHTML('beforeend', markup)
};
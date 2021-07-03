import debounce from "lodash.debounce";
import getCountryInfo from './js/fetchCountries.js';
import refs from './js/refs.js'
import './sass/main.scss';

const handleClick = (event) => {
  clearCountryContainer();
  if (event.target.classList.contains('search-country__item')) {
    getCountryInfo(event.target.textContent);
    refs.countryContainerList.removeEventListener("click", handleClick);
  }
  refs.input.value = '';
};

const handleInput = (event) => {
  clearCountryContainer();
  const searchQuery = event.target.value.trim();
  getCountryInfo(searchQuery);
  refs.countryContainerList.addEventListener("click", handleClick);
};

refs.input.addEventListener('input', debounce(handleInput, 500));

 function clearCountryContainer() {
  refs.countryContainerList.innerHTML = '';
};
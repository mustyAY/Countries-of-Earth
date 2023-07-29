const cca3 = localStorage.getItem("code");
const cca2 = localStorage.getItem("code");
const ccn3 = localStorage.getItem("code");

const countryEl = document.querySelector('.country-details');
const errorEl = document.querySelector('.error');

 async function renderCountry(){
  try{

    document.body.classList += ' details-flags__loading';

    const country = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3},${cca2},${ccn3}`);
    const countryData = await country.json();

    document.body.classList.remove('details-flags__loading');

    countryEl.innerHTML = countryData.map(details => countryDetailsHTML(details)).join('');
    
  }catch(err){

    document.body.classList += ' error__message';

  }
  }

  renderCountry();

  function countryDetailsHTML(details){
    const curr = details.currencies;
    const lang = details.languages;

    return `<div class="country-details__img--container">
                <figure class="country-details__img--wrapper">
                <span class="country-details__img--title">Flag</span>
                <img src="${details.flags.svg}" alt="not available" class="country-details__img country-details__img--1">
                </figure>
                <figure class="country-details__img--wrapper">
                <span class="country-details__img--title">Coat Of Arms</span>
                <img src="${details.coatOfArms.svg}" alt="not available" class="country-details__img country-details__img--2">
                </figure>
            </div>
            <div class="country__infos--container">
              <ul class="country__infos">
                  <li class="countryinfo common-name">
                  <span class="list-name__color">Common Name:</span> ${details.name.common}
                  </li>
                  <li class="countryinfo official-name">
                  <span class="list-name__color">Official Name:</span> ${details.name.official}
                  </li>
                  <li class="countryinfo capital">
                  <span class="list-name__color">Capital City:</span> ${details.capital[0]}
                  </li>
                  <li class="countryinfo continent">
                  <span class="list-name__color">Continent:</span> ${details.continents[0]}
                  </li>
                  <li class="countryinfo sub-continent">
                  <span class="list-name__color">Sub-Region:</span> ${details.subregion}
                  </li>
                  <li class="countryinfo population">
                  <span class="list-name__color">Population:</span> ${details.population}
                  </li>
                  <li class="countryinfo language">
                  <span class="list-name__color">Language(s):</span> ${Object.values(lang).join(', ')}
                  </li>
                  <li class="countryinfo currency">
                  <span class="list-name__color">Currency:</span> ${Object.values(curr)[0].name}, ${Object.values(curr)[0].symbol}
                  </li>
                  <li class="countryinfo time-zone">
                  <span class="list-name__color">Time Zone(s):</span> ${details.timezones.join(', ')}
                  </li>
                  <li class="countryinfo UN">
                  <span class="list-name__color">UN Member:</span> ${details.unMember}
                  </li>
                  <li class="countryinfo maps">
                  <span class="list-name__color">Maps:</span> <a href="${details.maps.googleMaps}" target="_blank">${details.maps.googleMaps}</a>
                  </li>
              </ul>
            </div>`;
  }
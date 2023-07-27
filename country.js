const cca3 = localStorage.getItem("code");
const cca2 = localStorage.getItem("code");
const ccn3 = localStorage.getItem("code");

const countryEl = document.querySelector('.country-details');
const errorEl = document.querySelector('.error');

 async function renderCountry(){
  try{

    countryEl.classList += ' details-flags__loading';

    const country = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3},${cca2},${ccn3}`);
    const countryData = await country.json();

    countryEl.classList.remove('details-flags__loading');

    countryEl.innerHTML = countryData.map(details => countryDetailsHTML(details)).join('');
  }catch(err){

    document.body.classList += ' error__message';

  }
    console.log(countryData);
  }

  renderCountry();

  function countryDetailsHTML(details){
    const curr = details.currencies;
    return `<div class="country-details__img--container">
                <figure class="country-details__img--wrapper">
                <span class="country-details__img--title">Flag</span>
                <i class="fas fa-spinner details-img__loading--spinner"></i>
                <img src="${details.flags.svg}" alt="not available" class="country-details__img country-details__img--1">
                </figure>
                <figure class="country-details__img--wrapper">
                <span class="country-details__img--title">Coat Of Arms</span>
                <i class="fas fa-spinner details-img__loading--spinner"></i>
                <img src="${details.coatOfArms.svg}" alt="not available" class="country-details__img country-details__img--2">
                </figure>
            </div>
            <ol class="country__infos">
                <li class="countryinfo common-name">
                Common Name: ${details.name.common}
                </li>
                <li class="countryinfo official-name">
                Official Name: ${details.name.official}
                </li>
                <li class="countryinfo capital">
                Capital City: ${details.capital[0]}
                </li>
                <li class="countryinfo continent">
                Continent: ${details.continents[0]}
                </li>
                <li class="countryinfo sub-continent">
                Sub-Region: ${details.subregion}
                </li>
                <li class="countryinfo population">
                Population: ${details.population}
                </li>
                <li class="countryinfo currency">
                Currency: ${Object.values(curr)[0].name}, ${Object.values(curr)[0].symbol}
                </li>
                <li class="countryinfo time-zone">
                Time Zone(s): ${details.timezones.join(', ')}
                </li>
                <li class="countryinfo UN">
                UN Member: ${details.unMember}
                </li>
                <li class="countryinfo maps">
                Maps: <a href="${details.maps.googleMaps}" target="_blank">${details.maps.googleMaps}</a>
                </li>
            </ol>`;
  }
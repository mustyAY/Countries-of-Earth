
  async function renderCountry(){
    const cca3 = localStorage.getItem("code");
    const cca2 = localStorage.getItem("code");
    const ccn3 = localStorage.getItem("code");
    const cioc = localStorage.getItem("code");
    const country = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3},${cca2},${ccn3}`);
    const countryData = await country.json();
    const countryEl = document.querySelector('.country-details');
    countryEl.innerHTML = countryData.map(details => countryDetailsHTML(details)).join('');
    console.log(countryData);
  }

  renderCountry();

  function countryDetailsHTML(details){
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
                <li class="countryinfo UN">
                UN Member: ${details.unMember}
                </li>
                <li class="countryinfo maps">
                Maps: <a href="${details.maps.googleMaps}" target="_blank">${details.maps.googleMaps}</a>
                </li>
            </ol>`
  }
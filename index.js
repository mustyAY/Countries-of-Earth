const countriesEl = document.querySelector('.countries');
const searchedEl = document.querySelector('.searched-country');

 async function renderCountries(){
    const countries = await fetch("https://restcountries.com/v3.1/all");
    const countriesData = await countries.json();
    countriesEl.innerHTML = countriesData.map(country => countryHTML(country)).join("");
    console.log(countriesData)
 }

 renderCountries();

 async function onSearchChange(event){
   const name = event.target.value;

   countriesEl.classList += " country-search";

   const searched = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
   const searchedData = await searched.json();
   searchedEl.innerHTML = searchedData.map(search => countrySearchHTML(search)).join('');
   console.log(searchedData)
 }

 function showCountryDetails(cca3,cca2,ccn3){
   localStorage.setItem("code", cca3,cca2,ccn3);
   window.location.href = `${window.location.origin}/country.html`;
 }

 function countryHTML(country){
  return `<div class="country" onclick="showCountryDetails(${country.cca3,country.cca2,country.ccn3})">
            <figure class="country__img--wrapper">
               <div class="country__img--bg">${country.name.common}</div>
               <img src="${country.flags.svg}" alt="" class="country__img">
            </figure>
         </div>`;
 }

 function countrySearchHTML(search){
   return `<div class="country-details__img--container">
               <figure class="country-details__img--wrapper">
               <span class="country-details__img--title">Flag</span>
               <img src="${search.flags.svg}" alt="not available" class="country-details__img country-details__img--1">
               </figure>
               <figure class="country-details__img--wrapper">
               <span class="country-details__img--title">Coat Of Arms</span>
               <img src="${search.coatOfArms.svg}" alt="not available" class="country-details__img country-details__img--2">
               </figure>
           </div>
           <ol class="country__infos">
               <li class="countryinfo common-name">
               Common Name: ${search.name.common}
               </li>
               <li class="countryinfo official-name">
               Official Name: ${search.name.official}
               </li>
               <li class="countryinfo capital">
               Capital City: ${search.capital[0]}
               </li>
               <li class="countryinfo continent">
               Continent: ${search.continents[0]}
               </li>
               <li class="countryinfo sub-continent">
               Sub-Region: ${search.subregion}
               </li>
               <li class="countryinfo population">
               Population: ${search.population}
               </li>
               <li class="countryinfo UN">
               UN Member: ${search.unMember}
               </li>
               <li class="countryinfo maps">
               Maps: <a href="${search.maps.googleMaps}" target="_blank">${search.maps.googleMaps}</a>
               </li>
           </ol>`;
 }

const countriesEl = document.querySelector('.countries');

 async function renderCountries(){
    const countries = await fetch("https://restcountries.com/v3.1/all");
    const countriesData = await countries.json();
    countriesEl.innerHTML = countriesData.map(country => countryHTML(country)).join("");
    console.log(countriesData)
 }

 renderCountries();

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

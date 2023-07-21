 async function renderCountries(){
    const countries = await fetch("https://restcountries.com/v3.1/all");
    const countriesData = await countries.json();
    const countriesEl = document.querySelector('.countries');
    countriesEl.innerHTML = countriesData.map(country => countryHTML(country)).join(""); 
    console.log(countriesData);
 }

 renderCountries();

 function countryHTML(country){
  return `<div class="country" onclick="countryDetails()">
            <figure class="country__img--wrapper">
               <div class="country__img--bg">${country.name.common}</div>
               <img src="${country.flags.svg}" alt="" class="country__img">
            </figure>
         </div>`
 }

 function countryDetailsHTML(){
   return ``
 }

 function countryDetails(){
 }
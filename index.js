const countriesEl = document.querySelector(".countries");

async function renderCountries() {
  document.body.classList += " countries__loading";

  const countries = await fetch("https://restcountries.com/v3.1/all");
  const countriesData = await countries.json();

  document.body.classList.remove("countries__loading");

  countriesEl.innerHTML = countriesData
    .map((country) => countryHTML(country))
    .join("");
}

renderCountries();

async function onSearchChange(event) {
  event.preventDefault();

  const name = event.target.value;

  document.body.classList += " country-search country-loading";

  try {
    const searched = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    const searchedData = await searched.json();

    document.body.classList.remove("country-loading");

    countriesEl.innerHTML = searchedData
      .map((search) => countrySearchHTML(search))
      .join("");
  } catch (err) {
    if (name === undefined || name === "") {
      throw null;
    }

    document.body.classList += " search-error__message";

    setTimeout(() => {
      document.body.classList.remove("search-error__message");
    }, 3500);
  } finally {
    document.querySelector("input").value = "";
  }
}

function showCountryDetails(code) {
  localStorage.setItem("code", code);
  window.location.href = "./country.html";
}

function countryHTML(country) {
  let code = country.ccn3;
  return `<div class="country" onclick="showCountryDetails(${code})">
            <figure class="country__img--wrapper">
               <div class="country__img--bg">${country.name.common}</div>
               <img src="${country.flags.svg}" alt="" class="country__img">
            </figure>
         </div>`;
}

function countrySearchHTML(search) {
  const curr = search.currencies;
  const lang = search.languages;

  return ` <div class="country-details__img--container">
               <figure class="country-details__img--wrapper">
               <span class="country-details__img--title">Flag</span>
               <img src="${
                 search.flags.svg
               }" alt="not available" class="country-details__img country-details__img--1">
               </figure>
               <figure class="country-details__img--wrapper">
               <span class="country-details__img--title">Coat Of Arms</span>
               <img src="${
                 search.coatOfArms.svg
               }" alt="not available" class="country-details__img country-details__img--2">
               </figure>
            </div>
            <div class="country__infos--container">
               <ul class="country__infos">
                  <li class="countryinfo common-name">
                  <span class="list-name__color">Common Name:</span> ${
                    search.name.common
                  }
                  </li>
                  <li class="countryinfo official-name">
                  <span class="list-name__color">Official Name:</span> ${
                    search.name.official
                  }
                  </li>
                  <li class="countryinfo capital">
                  <span class="list-name__color">Capital City:</span> ${
                    search.capital[0]
                  }
                  </li>
                  <li class="countryinfo continent">
                  <span class="list-name__color">Continent:</span> ${
                    search.continents[0]
                  }
                  </li>
                  <li class="countryinfo sub-continent">
                  <span class="list-name__color">Sub-Region:</span> ${
                    search.subregion
                  }
                  </li>
                  <li class="countryinfo population">
                  <span class="list-name__color">Population:</span> ${
                    search.population
                  }
                  </li>
                  <li class="countryinfo language">
                  <span class="list-name__color">Language(s):</span> ${Object.values(
                    lang
                  ).join(", ")}
                  </li>
                  <li class="countryinfo currency">
                  <span class="list-name__color">Currency:</span> ${
                    Object.values(curr)[0].name
                  }, ${Object.values(curr)[0].symbol}
                  </li>
                  <li class="countryinfo time-zone">
                  <span class="list-name__color">Time Zone(s):</span> ${search.timezones.join(
                    ", "
                  )}
                  </li>
                  <li class="countryinfo UN">
                  <span class="list-name__color">UN Member:</span> ${
                    search.unMember
                  }
                  </li>
                  <li class="countryinfo maps">
                  <span class="list-name__color">Maps:</span> <a href="${
                    search.maps.googleMaps
                  }" target="_blank">${search.maps.googleMaps}</a>
                  </li>
               </ul>
            </div>`;
}

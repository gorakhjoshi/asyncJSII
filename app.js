const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags[0]}" />
        <div class="country__data">
          <h3 class="country__name">Name</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>language</p>
          <p class="country__row"><span>💰</span>CURR.</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeEnd', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // const request = new XMLHttpRequest();

  // request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  // request.send();

  // request.addEventListener('load', function () {
  //   const [data] = JSON.parse(this.responseText);
  //   renderCountry(data);

  //   const [neighbour] = data.borders;
  //   console.log(neighbour);

  //   console.log(data);
  //   const request2 = new XMLHttpRequest();

  //   request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
  //   request2.send();

  //   request2.addEventListener('load', function () {
  //     const data2 = JSON.parse(this.responseText);
  //     console.log(data2);

  //     renderCountry(data2, 'neighbour');
  //   });
  // });

  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data[0], 'neighbour'))
    .catch((error) => {
      console.log(error);
    });
};

getCountryAndNeighbour('np');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('russia');
// getCountryAndNeighbour('india');

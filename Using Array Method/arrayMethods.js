// Fetch data from the REST Countries API
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    // a. Get all the countries from Asia continent/region using filter
    const asianCountries = data.filter(country => country.region === 'Asia');
    console.log('Asian Countries:', asianCountries);

    // b. Get all the countries with a population of less than 200,000 using filter
    const smallPopulationCountries = data.filter(country => country.population < 200000);
    console.log('Countries with population < 200,000:', smallPopulationCountries);

    // c. Print the following details: name, capital, flag using forEach
    data.forEach(country => {
      const name = country.name.common;
      const capital = country.capital ? country.capital[0] : 'N/A';
      const flag = country.flags ? country.flags[1] : 'No flag available';
      console.log(`Name: ${name}, Capital: ${capital}, Flag: ${flag}`);
    });

    // d. Print the total population of all countries using reduce
    const totalPopulation = data.reduce((accumulator, country) => accumulator + (country.population || 0), 0);
    console.log(`Total Population: ${totalPopulation}`);

    // e. Print countries that use US Dollars as currency
    const usdCountries = data.filter(country => {
      return country.currencies && Object.values(country.currencies).some(currency => currency.name === 'United States Dollar');
    });

    usdCountries.forEach(country => {
      console.log(`Country using US Dollar: ${country.name.common}`);
    });

    // Print the currencies of each country for verification
    data.forEach(country => {
      if (country.currencies) {
        const currencies = Object.values(country.currencies).map(currency => currency.name).join(', ');
        console.log(`Country: ${country.name.common}, Currencies: ${currencies}`);
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));

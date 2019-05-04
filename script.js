'use strict'

const key = 'mTCFh5NPwIsLsPS9tdEc8XfCLGrH0pRBCI1XI0rt';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

  return queryItems.join('&');
}

function getParks(searchState, maxResults=10) {
  console.log(searchState);
  const apiURL = 'https://developer.nps.gov/api/v1/parks';

  const params = {
    api_key: key,
    stateCode: searchState,
    limit: maxResults,
  }

  console.log(params);

  const queryString= formatQueryParams(params);
  const url= apiURL + '?' + queryString;

  console.log(url);

  /*const options = {
    headers: new Headers({
      "api_Key": apikey})
  };*/

    fetch(url)
      .then(response => {
       if (response.ok) {
         return response.json();
       }
       throw new Error (response.statusText);
      })
      .then(responseJson => displayResults(responseJson, maxResults))
      .catch (err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      })
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#park-list').empty();

  for(let i=0; i < responseJson.data.length & i<maxResults; i++){
    $('#park-list').append(
      `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p></li>`
    )};
    $('#js-results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#states').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchState, maxResults);
  });
}

$(watchForm);
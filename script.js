const apiKey = 'ACtg67XSGKBGgZ8MTJcUcoz2WvlszhBA';
Infinitynpm
const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

const additionalParams = {
  
};

const fullUrl = `${apiUrl}?apikey=${apiKey}&${new URLSearchParams(additionalParams)}`;

const eventsContainer = document.getElementById('events-container');

fetch(fullUrl)
  .then(response => {
    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    data._embedded.events.forEach(event => {
      const eventDiv = document.createElement('div');

      eventDiv.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.dates.start.localDate} ${event.dates.start.localTime}</p>
        <p>${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}</p>
        <p>${event.url}</p>
      `;

      eventsContainer.appendChild(eventDiv);
    });
  })
  .catch(error => {
    console.error('There was a problem with the API request:', error);
  });

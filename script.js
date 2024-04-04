const apiKey = 'ACtg67XSGKBGgZ8MTJcUcoz2WvlszhBA';
const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

// Define additional parameters
const additionalParams = {
  size: 5 // Limit the number of events to 1
};

// Construct the full URL with API key and additional parameters
const fullUrl = `${apiUrl}?apikey=${apiKey}&${new URLSearchParams(additionalParams)}`;

// Get the events container element
const eventsContainer = document.getElementById('events-container');

// Fetch data from the Ticketmaster API
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
    // Check if events are available in the response
    if (data._embedded && data._embedded.events && data._embedded.events.length > 0) {
      // Iterate over each event
      data._embedded.events.forEach(event => {
        // Create an event container
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        
      
        // Display event details
        eventDiv.innerHTML = `
          <h2>${event.name}</h2>
          <p>Date: ${event.dates.start.localDate}   Time: ${event.dates.start.localTime}, 
          Location: ${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}
          <button class="view-button" onclick="viewEvent('${event.url}')">View</button>
          <button class="buy-ticket-button" onclick="buyTicket('${event.url}')">Buy Ticket</button></p>
        `;

        // Append the event container to the events container
        eventsContainer.appendChild(eventDiv);
      });
    } else {
      // No events found
      eventsContainer.innerHTML = 'No events found.';
    }
  })
  .catch(error => {
    console.error('There was a problem with the API request:', error);
  });

// Function to handle view button click
function viewEvent(url) {
  window.open(url, '_blank');
}

// Function to handle buy ticket button click
function buyTicket(url) {
  window.open(url, '_blank');
}

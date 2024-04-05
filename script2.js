const ApiKey = 'ACtg67XSGKBGgZ8MTJcUcoz2WvlszhBA';

// Function to create and append event elements to the events container
function displayEvents(events) {
  const eventsContainer = document.getElementById('events-container');
  eventsContainer.innerHTML = ''; // Clear previous events

  // Iterate over each event and create HTML elements to display event information
  events.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerHTML = `
      <h2>${event.name}</h2>
      <p>Date: ${event.dates.start.localDate} Time: ${event.dates.start.localTime}
      Location: ${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}
      <button class="view-button" onclick="viewEvent('${event.url}')">View</button>
      <button class="buy-ticket-button" onclick="buyTicket('${event.url}')">Buy Ticket</button></p>
    `;
    eventsContainer.appendChild(eventDiv);
  });
}

// Fetch data from the Ticketmaster API
fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + ApiKey)
  .then((response) => response.json())
  .then((data) => {
    // Check if events are available
    if (data._embedded && data._embedded.events && data._embedded.events.length > 0) {
      // Display events on the webpage
      displayEvents(data._embedded.events);
    } else {
      console.log('No events found.');
    }
  })
  .catch((error) => {
    console.error('There was a problem fetching data:', error);
  });

  // Function to handle view button click
function viewEvent(url) {
    window.open(url, '_blank');
  }
  
  // Function to handle buy ticket button click
  function buyTicket(url) {
    window.open(url, '_blank');
  }
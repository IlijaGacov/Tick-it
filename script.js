const ApiKey = 'ACtg67XSGKBGgZ8MTJcUcoz2WvlszhBA';
const searchBar = document.querySelector('.search-bar'); 

const filterButton = document.querySelector('.filter-button');
const filterDropdown = document.getElementById('filter-dropdown');

filterButton.addEventListener('click', () => {
  if (filterDropdown.style.display === 'none') {
    filterDropdown.style.display = 'block';
  } else {
    filterDropdown.style.display = 'none';
  }
});

// Get the Apply Filters button
const applyFilterButton = document.getElementById('apply-filter-button');

// Add event listener to the Apply Filters button
applyFilterButton.addEventListener('click', () => {
  // Get the selected country, genre, and area from the filter dropdowns
  const countryFilter = document.getElementById('country-filter').value;
  const genreFilter = document.getElementById('genre-filter').value;
  const areaFilter = document.getElementById('area-filter').value;

  // Log the selected country, genre, and area to the console for testing
  console.log('Selected Country:', countryFilter);
  console.log('Selected Genre:', genreFilter);
  console.log('Selected Area:', areaFilter);

});

// Trigger click event on the Apply Filters button when the page loads
window.addEventListener('load', () => {
  applyFilterButton.click();
});

// Function to create and append event elements to the events container
function displayEvents(events) {
  const eventsContainer = document.getElementById('events-container');
  eventsContainer.innerHTML = ''; 

  // Iterate over each event and create HTML elements to display event information
  events.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerHTML = `
      <h2>${event.name}</h2>
      <p>Date: ${event.dates.start.localDate} Time: ${event.dates.start.localTime}</p>
      <p>Location: ${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}</p>
      <button class="view-button" onclick="viewEvent('${event.url}')">View</button>
      <button class="buy-ticket-button" onclick="buyTicket('${event.url}')">Buy Ticket</button>
    `;
    eventsContainer.appendChild(eventDiv);
  });
}

// Function to filter events based on the search query
function filterEventsByName(events, searchQuery) {
  return events.filter(event => event.name.toLowerCase().includes(searchQuery.toLowerCase()));
}

applyFilterButton.addEventListener('click', () => {
  // Get the selected country, genre, and area from the filter dropdowns
  const countryFilter = document.getElementById('country-filter').value;
  const genreFilter = document.getElementById('genre-filter').value;
  const areaFilter = document.getElementById('area-filter').value;

  // Log the selected country, genre, and area to the console for testing
  console.log('Selected Country:', countryFilter);
  console.log('Selected Genre:', genreFilter);
  console.log('Selected Area:', areaFilter);

  // Fetch events data based on the selected country, genre, and area
  fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryFilter}&classificationName=${genreFilter}&dmaId=${areaFilter}&apikey=${ApiKey}`)
    .then((response) => response.json())
    .then((data) => {
      // Check if events are available
      if (data._embedded && data._embedded.events && data._embedded.events.length > 0) {
        // Store fetched events data
        const eventsData = data._embedded.events;
        // Display events on the webpage
        displayEvents(eventsData);

        // Add event listener to search bar input
        searchBar.addEventListener('input', () => {
          const searchQuery = searchBar.value.trim();
          // Filter events by name
          const filteredEvents = filterEventsByName(eventsData, searchQuery);
          // Display filtered events
          displayEvents(filteredEvents);
        });
      } else {
        console.log('No events found.');
      }
    })
    .catch((error) => {
      console.error('There was a problem fetching data:', error);
    });
});

// Function to handle view button click
function viewEvent(url) {
  window.open(url, '_blank');
}

// Function to handle buy ticket button click
function buyTicket(url) {
  window.open(url, '_blank');
}

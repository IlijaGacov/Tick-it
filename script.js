const apiKey = 'ACtg67XSGKBGgZ8MTJcUcoz2WvlszhBA';
const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

// Define additional parameters
const additionalParams = {
  size: 20
};


//WORKING INITIAL API CALL

// // Fetch data from the Ticketmaster API
// fetch(fullUrl)
//   .then(response => {
//     // Check if the response is successful (status code 200)
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     // Parse the JSON response
//     return response.json();
//   })
//   .then(data => {
//     // Check if events are available in the response
//     if (data._embedded && data._embedded.events && data._embedded.events.length > 0) {
//       // Iterate over each event
//       data._embedded.events.forEach(event => {
//         // Create an event container
//         const eventDiv = document.createElement('div');
//         eventDiv.classList.add('event');
        
      
//         // Display event details
//         eventDiv.innerHTML = `
//           <h2>${event.name}</h2>
//           <p>Date: ${event.dates.start.localDate}   Time: ${event.dates.start.localTime}, 
//           Location: ${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}
//           <button class="view-button" onclick="viewEvent('${event.url}')">View</button>
//           <button class="buy-ticket-button" onclick="buyTicket('${event.url}')">Buy Ticket</button></p>
//         `;

//         // Append the event container to the events container
//         eventsContainer.appendChild(eventDiv);
//       });
//     } else {
//       // No events found
//       eventsContainer.innerHTML = 'No events found.';
//     }
//   })
//   .catch(error => {
//     console.error('There was a problem with the API request:', error);
//   });


// Get the filter button and dropdown list elements
const filterButton = document.querySelector('.filter-button');
const filterDropdown = document.getElementById('filter-dropdown');

// Add event listener to the filter button
filterButton.addEventListener('click', () => {
  // Toggle visibility of the filter dropdown
  if (filterDropdown.style.display === 'none') {
    filterDropdown.style.display = 'block';
  } else {
    filterDropdown.style.display = 'none';
  }
});

// Function to fetch events based on filter parameters
function fetchEvents(category, date, location) {
  // Construct API request URL with filter parameters
  let apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
  let params = { apikey: apiKey };
  if (category) params.classificationName = category;
  if (date) params.startDateTime = new Date(date).toISOString();
  if (location) params.city = location;
  let url = `${apiUrl}?${new URLSearchParams(params)}`;

  // Fetch events
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the fetched events
      displayEvents(data._embedded.events);
    })
    .catch(error => {
      console.error('There was a problem with the API request:', error);
    });
}

// Construct the full URL with API key and additional parameters
const fullUrl = `${apiUrl}?apikey=${apiKey}&${new URLSearchParams(additionalParams)}`;

// Get the events container element
const eventsContainer = document.getElementById('events-container');


// Function to handle view button click
function viewEvent(url) {
  window.open(url, '_blank');
}

// Function to handle buy ticket button click
function buyTicket(url) {
  window.open(url, '_blank');
}

// Function to display events
function displayEvents(events) {
  const eventsContainer = document.getElementById('events-container');
  eventsContainer.innerHTML = ''; // Clear previous events
  events.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerHTML = `
      <h2>${event.name}</h2>
      <p>Date: ${event.dates.start.localDate}   Time: ${event.dates.start.localTime}, 
      Location: ${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}
      <button class="view-button" onclick="viewEvent('${event.url}')">View</button>
      <button class="buy-ticket-button" onclick="buyTicket('${event.url}')">Buy Ticket</button></p>
    `;
    eventsContainer.appendChild(eventDiv);
  });
}

// Function to handle applying the filter
function applyFilter() {
  // Get selected filter values
  const category = document.getElementById('category-filter').value;
  const date = document.getElementById('date-filter').value;
  const location = document.getElementById('location-filter').value;

  // Update filter parameters and fetch events
  fetchEvents(category, date, location);
}

const apiKey = 'ACtg67XSGKBGgZ8MTJcUcoz2WvlszhBA';
const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

// Define additional parameters
const additionalParams = {
  size: 20
};

// Get the filter button and dropdown list elements
const filterButton = document.querySelector('.filter-button');
const filterDropdown = document.getElementById('filter-dropdown');

// Add event listener to the filter button
filterButton.addEventListener('click', () => {
  console.log('Filter button clicked');
  // Toggle visibility of the filter dropdown
  console.log('Current display:', filterDropdown.style.display);
  if (filterDropdown.style.display === 'none' || filterDropdown.style.display === '') {
    filterDropdown.style.display = 'block';
    console.log('Display set to block');
  } else {
    filterDropdown.style.display = 'none';
    console.log('Display set to none');
  }
});

// Define global variables for filter parameters
let category = '';
let date = '';
let location = '';

// Function to fetch events from the Ticketmaster API
function fetchEvents(category, date, location, searchQuery) {
  // Construct API request URL with filter parameters and search query
  let params = { apikey: apiKey };
  if (category) params.classificationName = category;
  if (date) params.startDateTime = new Date(date).toISOString();
  if (location) params.city = location;
  if (searchQuery) params.keyword = searchQuery;
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
  category = document.getElementById('category-filter').value;
  date = document.getElementById('date-filter').value;
  location = document.getElementById('location-filter').value;
  const searchQuery = document.querySelector('.search-bar').value.trim();

  // Update filter parameters and fetch events
  fetchEvents(category, date, location, searchQuery);
}

// Add event listener to apply filter button
const applyFilterButton = document.getElementById('apply-filter-button');
applyFilterButton.addEventListener('click', applyFilter);

// Get the search bar element
const searchBar = document.querySelector('.search-bar');

// Add event listener to search bar input
searchBar.addEventListener('input', () => {
  const searchQuery = searchBar.value.trim();
  fetchEvents(category, date, location, searchQuery);
});

// Function to handle view button click
function viewEvent(url) {
  window.open(url, '_blank');
}

// Function to handle buy ticket button click
function buyTicket(url) {
  window.open(url, '_blank');
}

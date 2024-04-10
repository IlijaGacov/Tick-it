document.addEventListener('DOMContentLoaded', function() {
    // Retrieve query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('eventName');
    const eventLocation = urlParams.get('eventLocation');
    const eventDate = urlParams.get('eventDate');
    const eventTime = urlParams.get('eventTime');
    const eventDescription = urlParams.get('eventDescription'); 

    // Update elements with event details
    const eventNameElement = document.getElementById('event-name');
    const eventLocationElement = document.getElementById('event-location');
    const eventDateElement = document.getElementById('event-date');
    const eventTimeElement = document.getElementById('event-time');
    const eventDescriptionElement = document.getElementById('event-description'); 
    const eventImagesElement = document.getElementById('event-images');
    const buyTicketButton = document.getElementById('buy-ticket-button');

    if (eventNameElement && eventLocationElement && eventDateElement && eventTimeElement &&  eventDescriptionElement && eventImagesElement) {
      eventNameElement.textContent = eventName;
      eventLocationElement.textContent = "Location: " + eventLocation;
      eventDateElement.textContent = "Date: " + eventDate;
      eventTimeElement.textContent = "Time: " + eventTime;
      eventDescriptionElement.textContent = "Performer: " + eventDescription;   
    } else {
      console.error('One or more elements not found.');
    }
});

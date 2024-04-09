document.addEventListener('DOMContentLoaded', function() {
    // Retrieve query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('eventName');
    const eventLocation = urlParams.get('eventLocation');
    const eventDate = urlParams.get('eventDate');
    const eventTime = urlParams.get('eventTime');
    const eventPerformer = urlParams.get('eventPerformer');
  
    // Update elements with event details
    const eventNameElement = document.getElementById('event-name');
    const eventLocationElement = document.getElementById('event-location');
    const eventDateElement = document.getElementById('event-date');
    const eventTimeElement = document.getElementById('event-time');
    const eventPerformerElement = document.getElementById('event-performer');
  
    if (eventNameElement && eventLocationElement && eventDateElement && eventTimeElement && eventPerformerElement) {
      eventNameElement.textContent = eventName;
      eventLocationElement.textContent = eventLocation;
      eventDateElement.textContent = "Date: " + eventDate;
      eventTimeElement.textContent = "Time: " + eventTime;
      eventPerformerElement.textContent = "Performer: " + eventPerformer;
    } else {
      console.error('One or more elements not found.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('eventName');
    const eventLocation = urlParams.get('eventLocation');
  
    // Update elements with event details
    const eventNameElement = document.getElementById('event-name');
    const eventLocationElement = document.getElementById('event-location');
  
    if (eventNameElement && eventLocationElement) {
      eventNameElement.textContent = eventName;
      eventLocationElement.textContent = eventLocation;
    } else {
      console.error('One or more elements not found.');
    }
  });
  
// Handle the the redirect to the main page and alerts 
document.addEventListener('DOMContentLoaded', function() {
    const submitPaymentButton = document.getElementById('submit-payment');
     if (submitPaymentButton) {
      submitPaymentButton.addEventListener('click', function() {
    window.open('https://2ansdbague2g7ykhjjflqtv5em0hzggy.lambda-url.us-east-1.on.aws/')
    alert('You Purchased the ticket');
    setTimeout(function() {
     window.location.href = 'index.html';
    }, 500); 
});
}
});

function viewTicketCount() {
    window.open('https://qwl6xfpdgbw3ziedvwk5hwpnna0aiiah.lambda-url.us-east-1.on.aws/');
}
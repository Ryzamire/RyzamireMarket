document.addEventListener('DOMContentLoaded', function () {
  // Get the promotional banner image element
  var promoImage = document.getElementById('promoImage');

  // Change the banner image dynamically
  function changeBannerImage(newImagePath) {
    promoImage.src = newImagePath;
  }

  // Show the promotional overlay
  // For testing purposes, you can use a setTimeout to change the image after a delay
  setTimeout(function () {
    document.getElementById('promoOverlay').style.display = 'flex';
  }, 1000); // Change image after 3000 milliseconds (3 seconds)

  // Close the promotional overlay when the close button is clicked
  document.getElementById('closePromo').addEventListener('click', function () {
    document.getElementById('promoOverlay').style.display = 'none';
  });
});

document.getElementById("downloadLink").addEventListener("click", function(event) {

  window.location.href = this.href;
  event.preventDefault(); 
});

var endDate = new Date("2024-04-20T00:00:00");

function countdown() {
  var now = new Date().getTime();
  var distance = endDate - now;
  
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById("countdown").innerHTML = days + " hari " + hours + " jam " + minutes + " menit " + seconds + " detik ";
  
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("maintenanceOverlay").style.display = "none";
 
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "auto";
  } else {
  
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
  }
}


var timer = setInterval(countdown, 1000);

// JavaScript for toggling the menu
function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');
}

// Optional: Add event listener to the menu button if not already added
document.querySelector('.menu-button').addEventListener('click', toggleMenu);

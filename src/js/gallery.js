var galleryOpen = false;
var mobileNav = document.getElementById("mobile-nav");

// Open the Modal
function openModal() {
  document.getElementById("art_lightbox").style.display = "block";
  document.getElementById("content-art").classList.add("d-none");
  mobileNav.classList.replace("d-block", "d-none");

  galleryOpen = true;
}

// Close the Modal
function closeModal() {
  document.getElementById("art_lightbox").style.display = "none";
  document.getElementById("content-art").classList.remove("d-none");
  mobileNav.classList.replace("d-none", "d-block");

  galleryOpen = false;
}

//Art Description Toggle
function openArtDescription(e) {
  var parent = e.parentElement.parentElement;
  var inner = parent.querySelector('.item-inner');

  var img = inner.querySelector('.preview-img-art');
  var desc = inner.querySelector('.preview-img-desc');

  if (img.classList.contains("d-block")) {
    img.classList.replace("d-block", "d-none");
    desc.classList.replace("d-none", "d-block");
  }
  else {
    img.classList.replace("d-none", "d-block");
    desc.classList.replace("d-block", "d-none");
  }
}


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("galleryImage");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

// Email Forms
// const contact_submit_btn = $('#submit_button');
// $('#contact-form').on('submit', function (event) {
//   event.preventDefault();

//   contact_submit_btn.value = 'Sending...';

//   const serviceID = 'service_gc3nv3e';
//   const templateID = 'template_d9pvlme';

//   emailjs.sendForm(serviceID, templateID, this)
//     .then(() => {
//       contact_submit_btn.value = 'Submit';
//       alert('Your Message Has Been Submitted! Thank You!');
//     }, (err) => {
//       contact_submit_btn.value = 'Submit';
//       alert(JSON.stringify(err));
//     });
// });


//Magnifying Glass for Gallery Images
function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "galleryImage");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
    if (x < w / zoom) { x = w / zoom; }
    if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
    if (y < h / zoom) { y = h / zoom; }
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}
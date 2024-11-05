const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function startLoader(){
  var elemCounter = document.querySelector(".counter");
  var currentValue = 0;

  function updateCounter(){
    if(currentValue === 100){
      return;
    }
    
    currentValue += Math.floor(Math.random()*10)+1;

    if(currentValue > 100){
      currentValue = 100;
    }
    elemCounter.textContent = currentValue;
    let delay = Math.floor(Math.random()*200 +50);
    setTimeout(updateCounter,delay);
  }
  updateCounter();
}
startLoader();


//animation using gsap and timeline
var t1 = gsap.timeline()
t1.to(".counter",0.25,{
  opacity:0,
  delay:3.5
})
t1.to(".bar",{
  height:0,
  stagger:.3,
  ease: Power3
})
t1.from("#nav img,#nav a,#nav i",{
  y:-100,
  duration:1,
  opacity:0,
  stagger:0.1
})

t1.from("#homemain h1",{
  x:-100,
  duration:1,
  opacity:0,
  stagger:0.2
})

t1.from("#genres h1",{
  x:-100,
  duration:1,
  opacity:0,
  stagger:0.2,
  // scrollTrigger:{
  //   trigger:"#genres h1",
  //   scroll: "#main",
  //   markers:true,
  //   start:"top 60%",
  // }
})

//Navigation 
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('home nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('home nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

function cirMouseFoll(){
    window.addEventListener("mousemove",(details) => {
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px)`;
    });
}

function vidMouseFoll() {
  const videoContainer = document.querySelector(".video-container");
  const headingsH1 = document.querySelectorAll(".headings h1");

  headingsH1.forEach((h1) => {
    h1.addEventListener("mouseenter", () => {
      gsap.to(videoContainer, { opacity: 1, duration: 0.3 });
    });

    h1.addEventListener("mousemove", (e) => {
      gsap.to(videoContainer, {
        x: e.clientX,
        y: e.clientY,
        ease: "power2.out",
        duration: 0.2,
        scale:1
      });
    });

    h1.addEventListener("mouseleave", () => {
      gsap.to(videoContainer, { opacity: 0, duration: 0.3,scale:0});
    });
  });
}
cirMouseFoll();
vidMouseFoll();

//anchor tag scroll

document.getElementById('next').onclick = function(){
  let lists = document.querySelectorAll('.item');
  document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length-1]);
}
let totalPrice = 0;
// goToTicket
function goToTicket(name) {
    let url = `Ticket/Ticket.html?name=${name}&price=${totalPrice}`;
    // const url = `../Ticket/Ticket.html?name=${name}&score=${gameScore}`;
    window.location.href = url;
}

function redirectToMovies(genre) {
    //let url = 'List/index.html?genre='+genre;
    let url = `List/index.html?genre=${genre}&price=${totalPrice}`;
    window.location.href = url;
    // movies.html?genre=${genre};
}
// Genres
// document.querySelectorAll(".elem").forEach(function (elem){
//     elem.addEventListener("mousemove",function(details){
//         gsap.to(elem.querySelector("img"),{
//             opacity:1,
//             ease: Power3 ,
//         });
//     });
// });
document.querySelectorAll(".elem").forEach(function (elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove",function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot= details.clientX - rotate;
        rotate= details.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease: Power3 ,
            top:diff,
            left:details.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot*0.5)
        });
    });
});
document.querySelectorAll(".elem").forEach(function (elem){
    elem.addEventListener("mouseleave",function(details){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease: Power2,
            duration: .5
        });
    });
});


// Recommadation section
const tracks = document.querySelectorAll(".image-track");

// Add event listeners to all tracks
tracks.forEach(track => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = "0";

  track.addEventListener("mousedown", handleOnDown);
  track.addEventListener("touchstart", handleOnDown);
  track.addEventListener("mouseup", handleOnUp);
  track.addEventListener("touchend", handleOnUp);
  track.addEventListener("mousemove", handleOnMove);
  track.addEventListener("touchmove", handleOnMove);
});

function handleOnDown(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  this.dataset.mouseDownAt = e.clientX;
}

function handleOnUp() {
  this.dataset.mouseDownAt = "0";
  this.dataset.prevPercentage = this.dataset.percentage;
}

function handleOnMove(e) {
  if (this.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(this.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(this.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  this.dataset.percentage = nextPercentage;

  this.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of this.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`
      },
      { duration: 1200, fill: "forwards" }
    );
  }
}

// Hacker Effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelectorAll(".head-line").forEach(function (line) {
  line.addEventListener("mousemove", function (event) {
    let iteration = 0;
    const interval = setInterval(() => {
      line.innerText = line.innerText.split("").map((letter, index) => {
        if (index < iteration) {
          return line.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      }).join("");

      if (iteration >= line.dataset.value.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 40);
  });
});

// Food Section
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
      button.addEventListener("click", function() {
          const price = parseInt(this.closest(".card").querySelector('[data-price]').getAttribute('data-price'), 10);
          totalPrice += price;
          console.log("Total Price:", totalPrice);
      });
  });
});

// contact us details
const logo = document.getElementById("logo"),
      images = logo.querySelectorAll(".contact img");

const getActive = () => document.body.dataset.active === "true",
      setActiveTo = active => document.body.dataset.active = active;

const shift = (image, index, rangeX, rangeY) => {
  const active = getActive();
        
  const translationIntensity = active ? 24 : 4,
        maxTranslation = translationIntensity * (index + 1),
        currentTranslation = `${maxTranslation * rangeX}% ${maxTranslation * rangeY}%`;
  
  const scale = active ? 1 + (index * 0.4) : 1;
  
  image.animate({ 
    translate: currentTranslation, 
    scale 
  }, { duration: 750, fill: "forwards", easing: "ease" });
}

const shiftAll = (images, rangeX, rangeY) => 
  images.forEach((image, index) => shift(image, index, rangeX, rangeY));

const shiftLogo = (e, images) => {  
  const rect = logo.getBoundingClientRect(),
        radius = 1000;
  
  const centerX = rect.left + (rect.width / 2),
        centerY = rect.top + (rect.height / 2);
  
  const rangeX = (e.clientX - centerX) / radius,
        rangeY = (e.clientY - centerY) / radius;
  
  shiftAll(images, rangeX, rangeY);
}

const resetLogo = () => {
  setActiveTo(false);
  shiftAll(images, 0.4, -0.5);
}

window.onmousemove = e => shiftLogo(e, images);

document.body.onmouseleave = () => {
  if(!getActive()) resetLogo();
}

window.onmousedown = e => {
  setActiveTo(true);
  shiftLogo(e, images);
}

window.onmouseup = e => resetLogo();

resetLogo();
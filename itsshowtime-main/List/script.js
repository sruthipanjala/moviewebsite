// document.addEventListener('DOMContentLoaded', function() {
//     const genreParam = new URLSearchParams(window.location.search).get('genre');
//     const images = document.querySelectorAll('.image-box');

//     images.forEach(image => {
//         if (genreParam && image.dataset.genre !== genreParam) {
//             image.style.display = 'none';
//         }
//     });
// });

var t1 = gsap.timeline();

t1.from(".search-box,.image-box",{
    opacity: 0,
    x:-100,
    duration: 1,
    stagger: 0.1
});

document.addEventListener('DOMContentLoaded', function() {
    const genreParam = new URLSearchParams(window.location.search).get('genre');
    const images = document.querySelectorAll('.image-box');

    images.forEach(image => {
        const genres = image.dataset.genre.split(' ');
        if (genreParam && !genres.includes(genreParam)) {
            image.style.display = 'none';
        }
    });
});

const search = document.querySelector(".search-box input"),
      images = document.querySelectorAll(".image-box");

search.addEventListener("keyup", e =>{
    if(e.key == "Enter"){
        let searcValue = search.value,
            value = searcValue.toLowerCase();
            images.forEach(image =>{
                if(value === image.dataset.name){ //matching value with getting attribute of images
                    return image.style.display = "block";
                }
                image.style.display = "none";
         });
    }
});

search.addEventListener("keyup", () =>{
    if(search.value != "") return;

    images.forEach(image =>{
        image.style.display = "block";
    })
})

// function goToTicket(name) {
//     let url = '../Ticket/Ticket.html?name='+name;
//     window.location.href = url;
// }

// Get parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const totalPrice = urlParams.get('price');

function goToTicket(name) {
    let url = `../Ticket/Ticket.html?name=${name}&price=${totalPrice}`;
    // const url = `../Ticket/Ticket.html?name=${name}&score=${gameScore}`;
    window.location.href = url;
}
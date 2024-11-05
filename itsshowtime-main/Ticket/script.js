// let seats = document.querySelector(".all-seats");
// for (var i = 0; i < 59; i++) {
//     let randint = Math.floor(Math.random() * 2);
//     let booked = randint === 1 ? "booked" : "";
//     seats.insertAdjacentHTML("beforeend", '<input type="checkbox" name="tickets" id="s' + (i + 2) + '"><label for="s' + (i + 2) + '" class="seat ' + booked + '"></label>')
// };

var cityAreainfo = {
    Hyderabad: ["AMB Cinemas:Gachibowli","Prasads Multiplex: Hyderabad","Asian Lakshmikala Cinepride:Moosapet","AAA Cinemas: Ameerpet","GPR Multiplex:Nizampet","Asian M Cube Mall: Attapur","Asian Cineplanet Multiplex: Kompally","Asian CineSquare Multiplex: Uppal","BVK Multiplex Vijayalakshmi: LB Nagar","Asian Sha & Shahensha: Chintal"],
    Mumbai: ["G7 Multiplex:Bandra(W)","Cinepolis:NaviMumbai","INOX:Megaplex,Malad","PVR ICON:Goregan","MovieTime:Goregaon","Maxus Cinemas:Bhayander","Metro INOX:Marine Lines","BMX Cinemas","Woodland Cinemas:Virar(W)","Nishat Cinema: Grant Road"],
    Chennai: ["AGS Cinemas: Villivakkam","AGS Cinemas: T.Nagar","AGS Cinemas: Maduravoyal","PVR: Aerohub","Arul Muruga Theatre 4k: Thiryporur","EVP Cinemas: Chennai","INOX: The Marina Mall","INOX National: Arcot Road","Cinepolis: BSR Mall","Green Cinemas 4K Atmos:Padi"],
    Delhi: ["PVR: Vegas Dwarka","Delite Cinema: Asaf Ali Road","Liberty Cinema: Karol Bagh","Cinepolis: DLF Avenue","PVR Promenade: Vasant Kunj","PVR: Select City Walk","G3s Cinema: Rohini ","INOX: Janak Place","Amba Cinema:Delhi","INOX: Patel Nagar"],
    Bengaluru: ["PVR: Orion MAll","PVR: Vega City","Cinepolis: Lulu Mall","Gopalan Grand Mall: Old Madras","Miraj Cinemas: TGN Lotus Elite","Urvashi Cinema: Benguluru","Navrang Theatre: Rajaji Nagar","Veeresh Cinemas: Magadi Road","HMT Digital 4K Cinema: Jalahalli","INOX: Brookefield Mall"]
}

window.onload = function(){
    const selectCity = document.getElementById('city'),
     selectPlace = document.getElementById('area'),
     selects = document.querySelectorAll('select')

     selectPlace.disabled = true

     selects.forEach(select => {
        if(select.disabled == true){
            select.style.cursor = "auto"
        }
     })

     for(let city in cityAreainfo){
        selectCity.options[selectCity.options.length] = new Option(city,city)
     }
    selectCity.onchange = (e) =>{
        selectPlace.disabled = false
        selectPlace.length=1
        for(let place in cityAreainfo[e.target.value]){
            selectPlace.options[selectPlace.options.length] = new Option(cityAreainfo[e.target.value][place],cityAreainfo[e.target.value][place])
            selectPlace.onchange=(ev)=>{
                toggleBooked();
            }
        }

        // Call toggleBooked() when city selection changes
        toggleBooked();
    }
}


// Get parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const gameScore = urlParams.get('score');
const totalPrice = urlParams.get('price');
let food = urlParams.get('price');
food = Number(food);


// let urlParams= new URLSearchParams(window.location.search);
const name = urlParams.get('name');
let description = urlParams.get('description');

document.querySelector('.title').textContent = name;

let seats = document.querySelector(".all-seats");
let seatCategories = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',
'E1','E2','E3','E4','E5','E6','E7','E8','E9','E10',
'D1','D2','D3','D4','D5','D6','D7','D8','D9','D10',
'C1','C2','C3','C4','C5','C6','C7','C8','C9','C10',
'B1','B2','B3','B4','B5','B6','B7','B8','B9','B10',
'A1','A2','A3','A4','A5','A6','A7','A8','A9','A10'];

function randintgen(){
    for(var i=1;i<60;i++){
        let randint = Math.floor(Math.random()*2);
        let booked = randint === 1 ? "booked" : "";
        seats.insertAdjacentHTML("beforeend", '<input type="checkbox" name="tickets" id="s' + (i + 2) + '"><label for="s' + (i + 2) + '" class="seat ' + booked + '">'+seatCategories[i]+'</label>')
    };
};
// Generate a random seats whenever a person clicks on dates and times
randintgen();
function toggleBooked(){
    let seats = document.querySelectorAll(".seat");
    seats.forEach(seat => {
        let randint =Math.floor(Math.random()*2);
        let booked = randint === 1 ? "booked" : "";
        seat.classList.toggle('booked',booked === "booked");
    });
}

toggleBooked();
document.querySelector('.dates').addEventListener('click',() => {
    toggleBooked();
});
document.querySelector('.times').addEventListener('click',() => {
    toggleBooked();
});

console.log(food);
let tickets = seats.querySelectorAll("input");
let foodButton = document.getElementById("foodButton");
let bookButton = document.getElementById("bookButton");


// Function to toggle background color
function toggleBackgroundColor() {
    if (foodButton.style.backgroundColor === "green") {
        foodButton.style.backgroundColor = "black";
    } else {
        foodButton.style.backgroundColor = "green";
    }
}

foodButton.addEventListener("click", () => {
    toggleBackgroundColor();
    let amount = document.querySelector(".amount").innerHTML;
    amount = Number(amount);

    if (foodButton.style.backgroundColor === "green") {
        amount += food;
    } else {
        amount -= food;
    }

    document.querySelector(".amount").innerHTML = amount;
});

tickets.forEach((ticket, i) => {
    ticket.addEventListener("change", () => {
        if (ticket.classList.contains('booked')) {
            ticket.checked = false; // Uncheck if it's already booked
            return; // Don't proceed further
        }

        let amount = document.querySelector(".amount").innerHTML;
        let count = document.querySelector(".count").innerHTML;
        amount = Number(amount);
        count = Number(count);

        if (ticket.checked) {
            if (i >= 40) {
                count += 1;
                amount += 100; // Adjust for i >= 40
            } else if (i >= 20 && i < 40) {
                count += 1;
                amount += 150;
            } else if (i < 20) {
                count += 1;
                amount += 200; // Adjust for i < 20
            }
        } else {
            if (i >= 40) {
                count -= 1;
                amount -= 100; // Adjust for i >= 40
            } else if (i >= 20 && i < 40) {
                count -= 1;
                amount -= 150;
            } else if (i < 20) {
                count -= 1;
                amount -= 200; // Adjust for i < 20
            }
        }

        document.querySelector(".amount").innerHTML = amount;
        document.querySelector(".count").innerHTML = count;
  
        // Function to receive the game score and apply discount
        function receiveGameScore() {
            // Get the game score from the URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const score = parseInt(urlParams.get('score')) || 0;

            // Calculate discount based on the score (example: 5% for every 5 points)
            const discountPercentage = Math.floor(score / 5) * 2;
            if (discountPercentage >= 8) {
                discountPercentage = 8;
            }

            // Get the original ticket price (replace this with your actual logic)
            const ticketPrice = parseInt(document.querySelector(".amount").innerHTML);

            // Calculate the discounted price
            const discountedPrice = ticketPrice - (ticketPrice * discountPercentage) / 100;

            // Display the discounted price on the ticket booking site
            document.getElementById('discountedPrice').innerHTML =  discountedPrice;
            
        }

        // Call the function to apply discount based on the game score
        receiveGameScore();
    });
});

// Game Section
// Event listener for the "Play Game" button
document.getElementById('playGameButton').addEventListener('click', function() {
    // Redirect the user to the game site
    window.location.href = `../SimonGame/index.html?name=${name}&price=${totalPrice}`;
});
let username ="";
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('nameInput');
    const submitButton = document.getElementById('submitButton');

    nameInput.addEventListener('input', function() {
        username = this.value; 
        console.log('Entered Value:', username);
    });
});
var confirmationMessage = ``;
bookButton.addEventListener("click", () => {
    console.log("hello");
    let count = document.querySelector(".count").innerText;
    let amount = document.querySelector(".amount").innerText;
    let discountedPrice = document.getElementById("discountedPrice").innerText;

    // Get selected city and place
    const selectedCity = document.getElementById('city').value;
    const selectedPlace = document.getElementById('area').value;

    // Get selected date and time
    const selectedDate = document.querySelector('.dates input:checked + label .date').innerText;
    const selectedDay = document.querySelector('.dates input:checked + label .day').innerText;
    const selectedTime = document.querySelector('.times input:checked + label').innerText;

    // Get user's email address
    // const userEmail = document.getElementById("to").value;

    if (count > 0) {
        confirmationMessage = `Mr/Ms ${username}, Your ${count} movie ticket(s) at ${selectedCity} (city), ${selectedPlace} on ${selectedDay} ${selectedDate} at ${selectedTime} have been booked with food for a Total of Rs${Number(discountedPrice) + Number(food)}.`;
        console.log(confirmationMessage);
        alert(confirmationMessage);
        // Call a function to send the email
        // sendConfirmationEmail(userEmail, confirmationMessage);
    } else {
        alert("Please select at least one ticket before booking.");
    }
});
console.log(confirmationMessage);
//alert("Ticket pricing\nBalcony(F1-E10):- 200rs\n1st Class(D1-C10):-150rs\n2ndClass(B1-A10):-100rs");
// BackEnd
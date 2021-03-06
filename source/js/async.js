

// globale variabler

let data;
let jsonData;
let queueData;
let servingData;
let queueDetails;

async function hentData() {

// definér data / HENT Data
    data = FooBar.getData();

// omdan output/string om til JSON format
    jsonData = JSON.parse(data);


// find DOM elementer (TICKETS) til modtager og template elementer

let ticketTemplate = document.querySelector("#tickettemplate-container");
let ticketContainer = document.querySelector("#ticketcontainer");


console.log("kø data", jsonData.queue);

// find køen
queueDetails = jsonData.queue;

queueDetails.forEach(tickets => {
  //  console.log("TICKETS ORDRER",tickets.order);

// definér klon til tickets
  let ticketKlon = ticketTemplate.cloneNode(true).content;

// prop data for ticket ID ud i DOM'en
//  console.log("TICKET ID", tickets.id);
    ticketKlon.querySelector(".ticket-id").textContent = tickets.id;


// find ordrerne
let orders = tickets.order;

// adskil arrayet med ordrerne med et return/nyt linjeskift
let orderDetail = orders.join(' ');


// prop data for ticket order ud i DOM'en
    ticketKlon.querySelector(".ticket-order").textContent = orderDetail;
//    document.querySelector(".ticket-order").innerHTML = "";



// kald værdien af ordrerne i arrayet
    orders.forEach(function(value, index){
        console.log("ordererne er her", value, index);
        //ticketKlon.querySelector(".ticket-order").textContent = value + index;
    });

    ticketContainer.appendChild(ticketKlon);
});



// udvælg KØ og SERVING data der skal ind i DOM'en
// Definér KØ antal
queueData = jsonData.queue.length;
    console.log("In queue", queueData);

// Definér SERVING antal
servingData = jsonData.serving.length;
    console.log("In Service", servingData);



// prop data ud i DOM'en og Kald pågældende funktioner
propUdData();
circleStyling();
};



function circleStyling() {

    let circle1 = document.querySelector("#queue-light")

    if (queueData < 5) {
        circle1.style.background = "#87ab66";
        circle1.classList.remove("neon-yellow", "neon-red");
        circle1.classList.add("neon-green");

    } else if (queueData < 10) {
        circle1.style.background = "#e79d3f";
        circle1.classList.remove("neon-green", "neon-red");
        circle1.classList.add("neon-yellow");

    } else if (queueData < 15) {
        circle1.style.background = "#d94d4d";
        circle1.classList.remove("neon-yellow", "neon-green");
        circle1.classList.add("neon-red");;
    }

    let circle2 = document.querySelector("#serving-light")

    if (servingData == 1) {
        circle2.style.background = "#d94d4d";
        circle2.classList.remove("neon-yellow", "neon-green");
        circle2.classList.add("neon-red");
    } else if (servingData == 2) {
        circle2.style.background = "#e79d3f";
        circle2.classList.remove("neon-red", "neon-green");
        circle2.classList.add("neon-yellow");
    } else if (servingData == 3) {
        circle2.style.background = "#87ab66";
        circle2.classList.remove("neon-yellow", "neon-red");
        circle2.classList.add("neon-green");
    }
};


// Funktion til Antal i KØ
function propUdData(){
    document.querySelector("#queue .queueAmount").textContent = queueData;
    document.querySelector("#serving .servingAmount").textContent = servingData;
};





// sæt interval
window.setInterval(hentData, 2000);
hentData();


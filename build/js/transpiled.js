"use strict";

document.addEventListener("DOMContentLoaded", hentData);

//--------------------------------------------------------------------
// globale variabler

var data = void 0;
var jsonData = void 0;
var queueData = void 0;
var servingData = void 0;
var queueDetails = void 0;
var servingDetails = void 0;

//--------------------------------------------------------------------
// FUNKTION til hent data
function hentData() {
    // definér data / HENT Data
    data = FooBar.getData();
    // omdan output/string om til JSON format
    jsonData = JSON.parse(data);

    // Kald funktioner
    servingOrders();
    ticketOrders();
    tapInfo();
    queueList();
}

//--------------------------------------------------------------------
function servingOrders() {

    // find DOM elementer (SERVING ORDERS) til modtager og template elementer

    var servingTemplate = document.querySelector("#servingtemplate-container");
    var servingContainer = document.querySelector("#servingcontainer");

    //console.log("kø data", jsonData.serving);

    //udskift indhold i modtageren
    document.querySelector("#servingcontainer").innerHTML = "";

    servingDetails = jsonData.serving;
    //console.log("bliver serveret", servingDetails);

    servingDetails.forEach(function (servingTickets) {

        var servingKlon = servingTemplate.cloneNode(true).content;

        // prop data for serving ID ud i DOM'en
        servingKlon.querySelector(".serving-id").textContent = servingTickets.id;

        // find ordrerne
        var servingOrders = servingTickets.order;

        // adskil arrayet med ordrerne med et return/nyt linjeskift
        var orderDetail2 = servingOrders.join(" ");

        // Udvælg data for serving order detaljer
        servingKlon.querySelector(".serving-order").textContent = orderDetail2;

        servingContainer.appendChild(servingKlon);

        console.log("servingdubbi");
    });
}

//--------------------------------------------------------------------
// FUNKTION til TICKETS eller ordrer
function ticketOrders() {

    // find DOM elementer (TICKETS) til modtager og template elementer

    var ticketTemplate = document.querySelector("#tickettemplate-container");
    var ticketContainer = document.querySelector("#ticketcontainer");

    console.log("kø data", jsonData.queue);

    //udskift indhold i modtageren
    document.querySelector("#ticketcontainer").innerHTML = "";

    // find køen
    queueDetails = jsonData.queue;

    queueDetails.forEach(function (tickets) {
        //  console.log("TICKETS ORDRER",tickets.order);

        // definér klon til tickets
        var ticketKlon = ticketTemplate.cloneNode(true).content;

        // prop data for ticket ID ud i DOM'en
        //  console.log("TICKET ID", tickets.id);

        ticketKlon.querySelector(".ticket-id").textContent = tickets.id;

        // find ordrerne
        var orders = tickets.order;

        // adskil arrayet med ordrerne med et return/nyt linjeskift
        var orderDetail = orders.join('\n');

        // Udvælg data for ticket order detaljer
        ticketKlon.querySelector(".ticket-order").textContent = orderDetail;

        // prop Data ud i DOM'en for hver klon
        ticketContainer.appendChild(ticketKlon);
    });
};

//--------------------------------------------------------------------
// FUNKTION til KEGS, LEVEL & Storage eller ordrer

function tapInfo() {

    // find DOM elementer til template og modtager
    var tapinfoTemplate = document.querySelector("#tapinfotemplate-container");
    var tapinfoContainer = document.querySelector("#tapinfocontainer");

    var storageTemplate = document.querySelector("#storagetemplate-container");
    var storageContainer = document.querySelector("#storagecontainer");

    document.querySelector("#tapinfocontainer").innerHTML = "";
    document.querySelector("#storagecontainer").innerHTML = "";
    //console.log("TAP info", jsonData.taps);

    // find arrays (taps + storage)
    var tapData = jsonData.taps;
    var tapStorage = jsonData.storage;

    // concatenate/kombinér arrays (taps + storage)
    //let combiData = tapStorage.concat(tapData);
    //console.log("TAP info", combiData);


    tapData.forEach(function (element) {

        var tapKlon1 = tapinfoTemplate.cloneNode(true).content;

        tapKlon1.querySelector(".tap-level").textContent = element.level;
        tapKlon1.querySelector(".tap-cap").textContent = element.capacity;

        tapinfoContainer.appendChild(tapKlon1);
    });

    tapStorage.forEach(function (element2) {

        var tapKlon2 = storageTemplate.cloneNode(true).content;

        tapKlon2.querySelector(".tap-storage").textContent = element2.amount;

        storageContainer.appendChild(tapKlon2);
    });

    beerStyling();
}

function beerStyling() {}

//--------------------------------------------------------------------
// FUNKTION til Antal i KØ
function queueList() {

    // udvælg KØ og SERVING data der skal ind i DOM'en
    // Definér KØ antal
    queueData = jsonData.queue.length;
    console.log("In queue", queueData);

    // Definér SERVING antal
    servingData = jsonData.serving.length;
    console.log("In Service", servingData);

    // Udvælg data for KØ og Serving ANTAL og Prop Data ud i ODM'en
    document.querySelector("#queue .queueAmount").textContent = queueData;
    document.querySelector("#serving .servingAmount").textContent = servingData;

    circleStyling();
};

//--------------------------------------------------------------------
// FUNKTION til styling af cirkler
function circleStyling() {

    var circle1 = document.querySelector("#queue-light");

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

    var circle2 = document.querySelector("#serving-light");

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

//--------------------------------------------------------------------
// sæt interval
window.setInterval(hentData, 2000);
hentData();

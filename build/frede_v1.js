
document.addEventListener("DOMContentLoaded", hentData);

//--------------------------------------------------------------------
// globale variabler

let data;
let jsonData;
let queueData;
let servingData;
let queueDetails;
let servingDetails;
let sectionAnim;


//--------------------------------------------------------------------
// FUNKTION til hent data
function hentData(){
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
//FUNKTION til in service

function servingOrders(){

// find DOM elementer (SERVING ORDERS) til modtager og template elementer

let servingTemplate = document.querySelector("#servingtemplate-container");
let servingContainer = document.querySelector("#servingcontainer");

//console.log("serving data", jsonData.serving);

//udskift indhold i modtageren
document.querySelector("#servingcontainer").innerHTML = "";

servingDetails = jsonData.serving;
//console.log("bliver serveret", servingDetails);

servingDetails.forEach(servingTickets => {

    let servingKlon = servingTemplate.cloneNode(true).content;

    // prop data for serving ID ud i DOM'en
    servingKlon.querySelector(".serving-id").textContent = servingTickets.id;

// find ordrerne
let servingOrders = servingTickets.order;

// adskil arrayet med ordrerne med et return/nyt linjeskift
let orderDetail2 = servingOrders.join(" ");

    // Udvælg data for serving order detaljer
    servingKlon.querySelector(".serving-order").textContent = orderDetail2;


    // Prop data ud i DOM'en
    servingContainer.appendChild(servingKlon);

  //servingTest = servingDetails.length.i++;

/*   lengthTest = servingDetails.slice();
  console.log("nyt array", lengthTest) */

/*   for (i = 0; i<1; i++) {
    orderAntal = servingData + i++;
    document.querySelector("#orders-done .orderAmount").textContent = orderAntal;
  } */

});

};




//--------------------------------------------------------------------
// FUNKTION til TICKETS eller ordrer

function ticketOrders() {

// find DOM elementer (TICKETS) til modtager og template elementer

let ticketTemplate = document.querySelector("#tickettemplate-container");
let ticketContainer = document.querySelector("#ticketcontainer");

//console.log("kø data", jsonData.queue);

//udskift indhold i modtageren
document.querySelector("#ticketcontainer").innerHTML = "";

// find køen
queueDetails = jsonData.queue;
queueDetails.slice(0,5).forEach(tickets => {

//  console.log("TICKETS ORDRER",tickets.order);
// definér klon til tickets
let ticketKlon = ticketTemplate.cloneNode(true).content;

    // prop data for ticket ID ud i DOM'en
    //  console.log("TICKET ID", tickets.id);
    ticketKlon.querySelector(".ticket-id").textContent = tickets.id;

// find ordrerne
let orders = tickets.order;

// adskil arrayet med ordrerne med et return/nyt linjeskift
let orderDetail = orders.join('\n');

    // Udvælg data for ticket order detaljer
    ticketKlon.querySelector(".ticket-order").textContent = orderDetail;

    // prop Data ud i DOM'en for hver klon
    ticketContainer.appendChild(ticketKlon);
});
};



//--------------------------------------------------------------------
// FUNKTION til KEGS, LEVEL & Storage eller ordrer

function tapInfo(){

// find DOM elementer til template og modtager
let tapinfoTemplate = document.querySelector("#tapinfotemplate-container");
let tapinfoContainer = document.querySelector("#tapinfocontainer");

//let tapSection = document.querySelector(".tapsection");

/* let storageTemplate = document.querySelector("#storagetemplate-container");
let storageContainer = document.querySelector("#storagecontainer"); */

document.querySelector("#tapinfocontainer").innerHTML = "";
//document.querySelector("#storagecontainer").innerHTML = "";
//console.log("TAP info", jsonData.taps);

// find arrays (taps + storage)
let tapData = jsonData.taps;
let tapStorage = jsonData.storage;

// concatenate/kombinér arrays (taps + storage)
//let combiData = tapStorage.concat(tapData);
//console.log("TAP info", combiData);



tapData.forEach(element => {

    //let i = 1;

    let tapKlon1 = tapinfoTemplate.cloneNode(true).content;

    tapKlon1.querySelector(".tap-beer").textContent = element.beer;
    tapKlon1.querySelector(".tap-level").textContent = element.level;
    tapKlon1.querySelector(".tap-cap").textContent = element.capacity;

    //tapKlon1.querySelector(".tapsection").className = "sectionTap" + i++;


    const glass = document.createElement("div");
    glass.setAttribute("class", "glass");
    document.body.appendChild(glass);


    const beer = document.createElement("div");
    beer.setAttribute("class", "beer");
    document.body.appendChild(beer);

    tapinfoContainer.appendChild(tapKlon1);

    beerStyling();
});


/* tapStorage.forEach(element2 => {

    let tapKlon2 = storageTemplate.cloneNode(true).content;


    tapKlon2.querySelector(".tap-storage").textContent = element2.amount;


    storageContainer.appendChild(tapKlon2);
}); */

}


function beerStyling(){

    let topFill = jsonData.taps.capacity;

    let maxFill = topFill = '100%';

    console.log("HANSEN", maxFill)

   // document.querySelector(".app").style.height = `${tapData.level}0%`;
}




//--------------------------------------------------------------------
// FUNKTION til Antal i KØ
function queueList(){

// udvælg KØ og SERVING data der skal ind i DOM'en
// Definér KØ antal
queueData = jsonData.queue.length;
console.log("In queue", queueData);

// Definér SERVING antal
servingData = jsonData.serving.length;
console.log("In Service", servingData);

/*  for (i = 0; i<1; i++) {
    orderAntal = servingData + i++;
    document.querySelector("#orders-done .orderAmount").textContent = orderAntal;
  }  */

// Udvælg data for KØ og Serving ANTAL og Prop Data ud i ODM'en
    document.querySelector("#queue .queueAmount").textContent = queueData;
    document.querySelector("#serving .servingAmount").textContent = servingData;

    circleStyling();
};



//--------------------------------------------------------------------
// FUNKTION til styling af cirkler
function circleStyling() {

    let bar1 = document.querySelector("#queue-light");
    let barFill1 = document.querySelector("#queue-light-fill");
    let busy = document.querySelector(".busy");
    let almost = document.querySelector(".almost");
    let good = document.querySelector(".good");

    if (queueData < 5) {
        almost.style.display = "none";
        busy.style.display = "none";
        good.style.display = "inherit"
        bar1.style.border = "#87ab66";
        barFill1.style.background = "#87ab66"
        barFill1.style.height = "50px"
        bar1.classList.remove("neon-yellow", "neon-red");
        bar1.classList.add("neon-green");
        
    } else if(queueData < 10) {
        busy.style.display = "none";
        good.style.display = "none";
        almost.style.display = "inherit"
        bar1.style.border = "#e79d3f";
        barFill1.style.background = "#e79d3f"
        barFill1.style.height = "100px";
        bar1.classList.remove("neon-green", "neon-red");
        bar1.classList.add("neon-yellow");
    } else if (queueData < 15) {
        almost.style.display = "none";
        good.style.display = "none";
        busy.style.display = "inherit"
        bar1.style.border = "#d94d4d";
        barFill1.style.background = "#d94d4d"
        barFill1.style.height = "200px";
        bar1.classList.remove("neon-yellow", "neon-green");
        bar1.classList.add("neon-red");;
    }

    let bar2 = document.querySelector("#serving-light")
    let barFill2 = document.querySelector("#serving-light-fill");
    let eff1 = document.querySelector(".eff1");
    let eff2 = document.querySelector(".eff2");
    let eff3 = document.querySelector(".eff3");

    if (servingData == 1) {
        eff3.style.display = "none";
        eff2.style.display = "none";
        eff1.style.display = "inherit"
        barFill2.style.background = "#d94d4d"
        barFill2.style.height = "30px";
        bar2.style.border = "#d94d4d";
        bar2.classList.remove("neon-yellow", "neon-green");
        bar2.classList.add("neon-red");
    } else if (servingData == 2) {
        eff1.style.display = "none";
        eff2.style.display = "inherit";
        eff3.style.display = "none"
        barFill2.style.background = "#e79d3f"
        barFill2.style.height = "100px";
        bar2.style.border = "#e79d3f";
        bar2.classList.remove("neon-red", "neon-green");
        bar2.classList.add("neon-yellow");
    } else if (servingData == 3) {
        eff1.style.display = "none";
        eff2.style.display = "none";
        eff3.style.display = "inherit"
        barFill2.style.background = "#87ab66"
        barFill2.style.height = "200px";
        bar2.style.border = "#87ab66";
        bar2.classList.remove("neon-yellow", "neon-red");
        bar2.classList.add("neon-green");
    }
};




//--------------------------------------------------------------------
// sæt interval
window.setInterval(hentData, 2000);
hentData();

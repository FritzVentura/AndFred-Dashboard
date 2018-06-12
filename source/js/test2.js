document.addEventListener("DOMContentLoaded", hentData);

// globale variabler

let data;
let jsonData;
let queueData;
let servingData;
let queueDetails;

//--------------------------------------------------------------------


function hentData() {
    // definér data / HENT Data
    data = FooBar.getData();
    // omdan output/string om til JSON format
    jsonData = JSON.parse(data);
    servingOrders();
    ticketOrders();
    tapInfo();
    // prop data ud i DOM'en og Kald pågældende funktioner
    queueList();
    circleStyling();

}



//--------------------------------------------------------------------



function servingOrders() {
    // find DOM elementer (TICKETS) til modtager og template elementer
    let servingTemplate = document.querySelector("#servingtemplate-container");
    let servingContainer = document.querySelector("#servingcontainer");

    //udskift indhold i modtageren
    document.querySelector("#servingcontainer").innerHTML = "";
    // find køen
    servingDetails = jsonData.serving;
    servingDetails.forEach(servingTickets => {
        //  console.log("TICKETS ORDRER",tickets.order);
        // definér klon til tickets
        let servingKlon = servingTemplate.cloneNode(true).content;
        // prop data for ticket ID ud i DOM'en
        //  console.log("TICKET ID", tickets.id);
        servingKlon.querySelector(".serving-id").textContent = servingTickets.id;
        // find ordrerne
        let servingOrders = servingTickets.order;
        // adskil arrayet med ordrerne med et return/nyt linjeskift
        let orderDetail2 = servingOrders.join(' ');
        // udvælg data for ticketOrder detaljer
        servingKlon.querySelector(".serving-order").textContent = orderDetail2;
        //kast data ind i containeren for hver klon
        servingContainer.appendChild(servingKlon);
    });
}


//--------------------------------------------------------------------

function ticketOrders() {
    // find DOM elementer (TICKETS) til modtager og template elementer
    let ticketTemplate = document.querySelector("#tickettemplate-container");
    let ticketContainer = document.querySelector("#ticketcontainer");

    //udskift indhold i modtageren
    document.querySelector("#ticketcontainer").innerHTML = "";
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
        // udvælg data for ticketOrder detaljer
        ticketKlon.querySelector(".ticket-order").textContent = orderDetail;
        //kast data ind i containeren for hver klon
        ticketContainer.appendChild(ticketKlon);
    });


};




//--------------------------------------------------------------------

function tapInfo() {

    let tapInfoTemplate = document.querySelector("#tapinfotemplate-container");
    let tapInfoContainer = document.querySelector("#tapinfocontainer");

    let storageTemplate = document.querySelector("#storagetemplate-container");
    let storageContainer = document.querySelector("#storagecontainer");

    //få den til at udskifte data
    document.querySelector("#tapinfocontainer").innerHTML = "";
  /*   document.querySelector("#storagecontainer").innerHTML = ""; */

    //find arrays for taps og storage og gem data i variabler
    let tapData = jsonData.taps;
    let tapStorage = jsonData.storage;

   //kombiner de to arrays med concat
     let combiData = tapStorage.concat(tapData);
 /* 
    console.log("tap info", combiData)  */
    let i = 1;

    tapData.forEach(element => {

        let tapKlon = tapInfoTemplate.cloneNode(true).content;
        const app = document.createElement("div");

        tapKlon.querySelector(".tap-beer").textContent = element.beer;
        tapKlon.querySelector(".tap-level").textContent = element.level;
        tapKlon.querySelector(".tap-cap").textContent = element.capacity;

        tapKlon.querySelector(".tapsection").className = "hans" + i++ 
       
        app.setAttribute("class", "liquid");

        tapInfoContainer.appendChild(tapKlon)
        tapInfoContainer.appendChild(app)

    });

    //TIL BRUG SENERE
/* 
    tapStorage.forEach(element2 => {

        let tapKlon2 = storageTemplate.cloneNode(true).content;

        tapKlon2.querySelector(".tap-name").textContent = element2.name;
        tapKlon2.querySelector(".tap-storage").textContent = element2.amount;

        storageContainer.appendChild(tapKlon2);
    }); 
*/
beerStyling();
} 




//--------------------------------------------------------------------

function beerStyling() {




/*     var array1 = jsonData.taps;

   array1.forEach(hej =>{ 
    var found = array1.find(function(element) {
      return element.level;
    });
    
    console.log("found", found);

}) */

}

//--------------------------------------------------------------------


// Funktion til Antal i KØ
function queueList() {
    // udvælg KØ og SERVING data der skal ind i DOM'en
    // Definér KØ antal
    queueData = jsonData.queue.length;
    console.log("In Queue", queueData);
    // Definér SERVING antal
    servingData = jsonData.serving.length;
    console.log("In Service", servingData);
    // Udvælg data for kø og serving antal og prop data ud i DOM'en
    document.querySelector("#queue .queueAmount").textContent = queueData;
    document.querySelector("#serving .servingAmount").textContent = servingData;
};




//--------------------------------------------------------------------



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
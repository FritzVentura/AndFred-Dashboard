"use strict";


//Hent data ind

let data;
let jsonData;
let queueData;
let servingData;
let queueDetails
let ticketKlon;

 async function hentData() {
    //definer data
    data = FooBar.getData();
    //lav string til JSON format
    jsonData = JSON.parse(data);
    let ticketTemplate = document.querySelector("#tickettemplate-container");
    let ticketContainer = document.querySelector("#ticketcontainer")
    //Find kø
    queueDetails = jsonData.queue;
    document.querySelector(".ticketcontainer").innerHTML = "";
    queueDetails.forEach(tickets => {

        ticketKlon = ticketTemplate.cloneNode(true).content;
        //data for ticket ID ud i DOM'en
        ticketKlon.querySelector(".ticket-id").textContent = tickets.id;
        //Find ordrene
        let orders = tickets.order
        //adskil med linjeskift
        let orderDetail = orders.join(' ')
        //prop data ud for ordrer
        ticketKlon.querySelector(".ticket-order").textContent = orderDetail;
/*         //kald værdi af ordrerne 
        orders.forEach(function (value) {
        console.log(value)
        }) */
        ticketContainer.appendChild(ticketKlon);
   
    });
    //Find DOM elementer (TICKCETS) til modtager og template elementer
    //Udvælg Data:
    //Kø data
    queueData = jsonData.queue.length;
    //Serving data
    servingData = jsonData.serving.length;
    //
    console.log("i kø", jsonData.queue.length)
    console.log("serving", jsonData.serving.length)

    //kald på function der kaster data ud i DOM'en
    propUdData();
    circleStyling();
}


function circleStyling() {

    let circle1 = document.querySelector("#queue-light")

    if (queueData < 5) {
        circle1.style.background = "#87ab66";
        circle1.classList.remove("neon-yellow", "neon-red");
        circle1.classList.add("neon-green");

    } else if (queueData < 10) {
        circle1.style.background = "#e79d3f";
        circle1.classList.remove("neon-red", "neon-green");
        circle1.classList.add("neon-yellow");

    } else if (queueData < 15) {
        circle1.style.background = "#d94d4d";
        circle1.classList.remove("neon-yellow", "neon-green");
        circle1.classList.add("neon-red");;
    }

    let circle2 = document.querySelector("#serving-light")

    if (servingData < 2) {
        circle2.style.background = "#d94d4d";
        circle2.classList.remove("neon-yellow", "neon-green");
        circle2.classList.add("neon-red");
    } else if (servingData < 3) {
        circle2.style.background = "#e79d3f";
        circle2.classList.remove("neon-red", "neon-green");
        circle2.classList.add("neon-yellow");
    } else if (servingData < 4) {
        circle2.style.background = "#87ab66";
        circle2.classList.remove("neon-yellow", "neon-red");
        circle2.classList.add("neon-green");
    }
};


function propUdData() {
    //prop data fra queue ud i DOM'en
    document.querySelector("#queue .queueAmount").textContent = queueData;
    document.querySelector("#serving .servingAmount").textContent = servingData;
}

//Bestem interval hvorpaa data skal hentes ind igen
window.setInterval(hentData, 2000);
hentData();
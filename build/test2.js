"use strict";


//Hent data ind

let data;
let jsonData;
let queueData;
let servingData;

async function hentData() {
    //definer data
    data = FooBar.getData();

    //lav string til JSON format
    jsonData = JSON.parse(data);

    queueData = jsonData.queue.length;
    servingData = jsonData.serving.length

    console.log("i kø", jsonData.queue.length)
    console.log("serving", jsonData.serving.length)

    //Find DOM elementer til modtager og template elementer

    //Udvælg data elementer der skal ud i DOM'en





    //kald på function der kaster data ud i DOM'en
    propUdData();
    circleStyling();


}

function circleStyling() {

    let circle1 = document.querySelector("#queue-light")

    if (queueData < 5) {
        circle1.style.background = "#87ab66";
        circle1.classList.remove("neon-yellow");
        circle1.classList.remove("neon-red");
        circle1.classList.add("neon-green");

    } else if (queueData < 10) {
        circle1.style.background = "#e79d3f";
        circle1.classList.remove("neon-green");
        circle1.classList.remove("neon-red");
        circle1.classList.add("neon-yellow");

    } else if (queueData < 15) {
        circle1.style.background = "#d94d4d";
        circle1.classList.remove("neon-yellow");
        circle1.classList.remove("neon-green")
        circle1.classList.add("neon-red");;
    }

    let circle2 = document.querySelector("#serving-light")

    if (servingData < 2) {
        circle2.style.background = "#d94d4d";
        circle2.classList.remove("neon-yellow");
        circle2.classList.remove("neon-green");
        circle2.classList.add("neon-red");
    } else if (servingData < 3) {
        circle2.style.background = "#e79d3f";
        circle2.classList.remove("neon-red");
        circle2.classList.remove("neon-green");
        circle2.classList.add("neon-yellow");
    } else if (servingData < 4) {
        circle2.style.background = "#87ab66";
        circle2.classList.remove("neon-yellow");
        circle2.classList.remove("neon-red");
        circle2.classList.add("neon-green");
    }
};


function propUdData() {
    //prop data fra queue ud i DOM'en
    document.querySelector("#queue .queueAmount").textContent = queueData;
    document.querySelector("#serving .servingAmount").textContent = servingData;
}


//Bestem interval 
window.setInterval(hentData, 2000);
hentData();
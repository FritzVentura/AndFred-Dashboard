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

function circleStyling(){

    let circle1 = document.querySelector(".circle1")

    if (queueData < 5){    
        circle1.style.background = "#87ab66";
            } else if (queueData < 10){    
        circle1.style.background = "#e79d3f";
            } else if (queueData < 15){    
                circle1.style.background = "#d94d4d";
            }
           
    let circle2 = document.querySelector(".circle2")
    
    if (servingData < 2){    
        circle2.style.background = "#d94d4d";
            } else if (servingData < 3){    
        circle2.style.background = "#e79d3f";
            } else if (servingData < 4){    
                circle2.style.background = "#87ab66";
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



















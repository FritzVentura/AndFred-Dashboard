"use strict";





//Hent data ind

let data;
let jsonData;

async function hentData() {
    //definer data
    data = FooBar.getData();

    //lav string til JSON format
    jsonData = JSON.parse(data);

    console.log("i kø", jsonData.queue.length)
    console.log("serving", jsonData.serving.length)
    
    //kald på function der kaster data ud i DOM'en
 propUdData();

}

//Find DOM elementer til modtager og template elementer

//Udvælg data elementer der skal ud i DOM'en


function propUdData() {
    //prop data fra queue ud i DOM'en
    document.querySelector("#queue .queueAmount").textContent = jsonData.queue.length;
    document.querySelector("#serving .servingAmount").textContent = jsonData.serving.length;
}


//Bestem interval 
window.setInterval(hentData, 2000);
hentData(); 



















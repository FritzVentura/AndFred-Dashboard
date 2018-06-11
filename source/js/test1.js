

// globale variabler

let data;
let jsonData;
let queueData;
let servingData;

async function hentData() {

// definér data / HENT Data
    data = FooBar.getData();

// omdan output/string om til JSON format
    jsonData = JSON.parse(data);

// Definér KØ antal
    queueData = jsonData.queue.length;

// Definér SERVING antal
    servingData = jsonData.serving.length;
    
    console.log("In queue", queueData);
    console.log("In Service", servingData);



// find DOM elementer til modtager og template elementer


// udvælg data der skal ind i DOM'en

// find 


// prop data ud i DOM'en og Kald pågældende funktioner
propUdData();
circleStyling();
};


function circleStyling(){

// find circle 1
    let circle1 = document.querySelector(".circle1");

// lav condition til skift farve på cirkel 1
    if (queueData < 5){
        circle1.style.background = "#87ab66";
    } else if (queueData < 10 ){
        circle1.style.background = "#e79d3f";
    } else if (queueData < 15 ){
        circle1.style.background = "#d94d4d";
    }

// find circle 2
    let circle2 = document.querySelector(".circle2");

// lav condition til skift farve på cirkel 2
    if (servingData < 2){
        circle2.style.background = "#d94d4d";
    } else if (servingData < 3 ){
        circle2.style.background = "#e79d3f";
    } else if (servingData < 4 ){
        circle2.style.background = "#87ab66";
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


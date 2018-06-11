

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


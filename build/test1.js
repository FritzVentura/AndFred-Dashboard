

// globale variabler

let data;
let jsonData;

async function hentData() {

// definér data
    data = FooBar.getData();

// lav output/string om til JSON format
    jsonData = JSON.parse(data);
    
    console.log("i kø", jsonData.queue.length);


// find DOM elementer til modtager og template elementer


// udvælg data der skal ind i DOM'en


// prop data ud i DOM'en og Kald pågældende funktioner
propUdData();

}


// Funktion til Antal i KØ
function propUdData(){
    document.querySelector("#queue .queueAmount").textContent = jsonData.queue.length;
    document.querySelector("#serving .servingAmount").textContent = jsonData.serving.length;
};


// sæt interval
window.setInterval(hentData, 2000);
hentData();


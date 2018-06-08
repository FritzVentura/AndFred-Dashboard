
// sæt interval

window.setInterval(hentData, 2000);
hentData();

// globale variabler

let data;
let jsonData;

async function hentData() {

// definér data
    data = FooBar.getData();

// lav output/string om til JSON format
    jsonData = JSON.parse(data);
    
    console.log("i kø", jsonData.queue.length);


// find DOM elementer

// udvælg data der skal ind i DOM'en

// prop data ud i DOM'en

}


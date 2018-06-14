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
let queueId = [];
let storageInfo;
let beerInfo;
let i;


//--------------------------------------------------------------------
// FUNKTION til hent data
function hentData() {
    // definér data / HENT Data
    data = FooBar.getData();
    // omdan output/string om til JSON format
    jsonData = JSON.parse(data);

    // Kald funktioner
    servingOrders();
    ticketOrders();
    tapInfo();
    queueList();
    customerList();
    beerStorageData()
    beerTypeData();
}


//--------------------------------------------------------------------
//FUNKTION til in service

function servingOrders() {

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
        let orderDetail2 = servingOrders.join("<li>");

        // Udvælg data for serving order detaljer
        servingKlon.querySelector(".serving-order").innerHTML = orderDetail2;


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
    queueDetails.slice(0, 4).forEach(tickets => {

        //  console.log("TICKETS ORDRER",tickets.order);
        // definér klon til tickets
        let ticketKlon = ticketTemplate.cloneNode(true).content;

        // prop data for ticket ID ud i DOM'en
        //  console.log("TICKET ID", tickets.id);
        ticketKlon.querySelector(".ticket-id").textContent = tickets.id;

        // find ordrerne
        let orders = tickets.order;

        // adskil arrayet med ordrerne med et return/nyt linjeskift
        let orderDetail = orders.join('<li>');

        // Udvælg data for ticket order detaljer
        ticketKlon.querySelector(".ticket-order").innerHTML = orderDetail;

        // prop Data ud i DOM'en for hver klon
        ticketContainer.appendChild(ticketKlon);
    });
};



//--------------------------------------------------------------------
// FUNKTION til KEGS, LEVEL & Storage eller ordrer

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

    //kombiner de to arrays med concat
   // let combiData = tapStorage.concat(tapData);
    /* 
       console.log("tap info", combiData)  */

       tapData.forEach(element => {
        
        
        let tapKlon = tapInfoTemplate.cloneNode(true).content;
        let tapLevel = element.level*0.01;
        let tapCap = element.capacity*0.01;
        let tapColor = tapKlon.querySelector(".tap-level");

        const newDiv = document.createElement("div");
 
       
        newDiv.setAttribute("class", "liquid");


        tapKlon.querySelector(".tap-beer").textContent = element.beer;
        tapKlon.querySelector(".tap-level").textContent = tapLevel + " L.";
        tapKlon.querySelector(".tap-cap").textContent = tapCap + " L.";
/*         tapKlon.appendChild = newDiv;
        tapKlon.appendChild = beerGlass; */

        newDiv.style.height = `${element.level*0.04}%` 

  
        

        if ( tapLevel <= 25) {
            tapColor.style.color = "#87ab66";
        }  if (tapLevel <= 15){
            tapColor.style.color = "#e79d3f";
        }   if(tapLevel <= 10){
            tapColor.style.color = "#d94d4d"
        };

        tapKlon.querySelector(".beer-glass").appendChild(newDiv)   
        tapInfoContainer.appendChild(tapKlon)

    });

}



//--------------------------------------------------------------------
// EVENT til klik home knap
let homeBtn = document.querySelector(".home-btn");

homeBtn.addEventListener("click", function(event){

    storageInfo = document.querySelector("#storagecontainer");

    storageInfo.classList.remove("bounceInRight");
    storageInfo.classList.add("bounceOutRight");

    beerInfo.classList.remove("bounceInRight");
    beerInfo.classList.add("bounceOutRight");

    setTimeout(function(){ 
        storageInfo.style.display = "none";
    }, 800);

    setTimeout(function(){ 
        beerInfo.style.display = "none";
    }, 800);

});


//--------------------------------------------------------------------
// EVENT til Keg Storage knap
let storageBtn = document.querySelector(".storage-btn");

storageBtn.addEventListener("click", function(event){

    storageInfo = document.querySelector("#storagecontainer");

    storageInfo.style.display = "grid";

    storageInfo.classList.remove("bounceOutRight");
    storageInfo.classList.add("bounceInRight");

    beerInfo.classList.remove("bounceInRight");
    beerInfo.classList.add("bounceOutRight");

    setTimeout(function(){ 
        beerInfo.style.display = "none";
    }, 800);

});


//--------------------------------------------------------------------
// EVENT til Beer Types knap
let beersBtn = document.querySelector(".beers-btn");

    beersBtn.addEventListener("click", function(event){
    
    beerInfo = document.querySelector("#beertypecontainer");
    //storageInfo = document.querySelector("#storagecontainer");

    beerInfo.style.display = "grid";

    beerInfo.classList.remove("bounceOutRight");
    beerInfo.classList.add("bounceInRight");

    storageInfo.classList.remove("bounceInRight");
    storageInfo.classList.add("bounceOutRight");

    setTimeout(function(){ 
        storageInfo.style.display = "none";
    }, 800);

});




//--------------------------------------------------------------------
// FUNKTION til Beer STORAGE
function beerStorageData(){

    let storageTemplate = document.querySelector("#storagetemplate-container");
    let storageContainer = document.querySelector("#storagecontainer");

    document.querySelector("#storagecontainer").innerHTML = "";

    let tapStorage = jsonData.storage;
    i = 1;

    tapStorage.forEach(storage => {

        let storageKlon = storageTemplate.cloneNode(true).content;

        storageKlon.querySelector(".storage-section").classList = "storage-section storage" + i++;

        storageKlon.querySelector(".tap-name").textContent = storage.name;
        storageKlon.querySelector(".tap-storage").textContent = storage.amount;

        storageContainer.appendChild(storageKlon);

    });
}




//--------------------------------------------------------------------
// FUNKTION til Beer TYPES
function beerTypeData(){

    let beerTypeTemplate = document.querySelector("#beertypetemplate-container");
    let beerTypeContainer = document.querySelector("#beertypecontainer");

    document.querySelector("#beertypecontainer").innerHTML = "";

    let beerTypes = jsonData.beertypes;
    i = 1;
    let imgPath = "imgs/";

    beerTypes.forEach(type => {

        let typeKlon = beerTypeTemplate.cloneNode(true).content;

        // tilføj unik class til hver section
        typeKlon.querySelector(".beertype-section").classList = "beertype-section section" + i++;

        //typeKlon.querySelector(".beer-name").textContent = type.name;
        typeKlon.querySelector(".beer-cat").textContent = type.category;
        typeKlon.querySelector(".beer-alco").textContent = type.alc + "%";
        typeKlon.querySelector(".beer-speed").textContent = type.pouringSpeed;
        typeKlon.querySelector(".beer-popul").textContent = type.popularity;
        // Description box her
        typeKlon.querySelector(".beer-aroma").textContent = type.description.aroma;
        typeKlon.querySelector(".beer-appea").textContent = type.description.appearance;
        typeKlon.querySelector(".beer-flavour").textContent = type.description.flavor;
        typeKlon.querySelector(".beer-mouth").textContent = type.description.mouthfeel;
        typeKlon.querySelector(".beer-impress").textContent = type.description.overallImpression;
        typeKlon.querySelector(".beer-label").setAttribute("src", imgPath + type.label);
        

    // Definér SE MERE KNAP 
    let btn1 = typeKlon.querySelector(".info-btn");
    // Definér SE MINDRE KNAP 
    let btn2 = typeKlon.querySelector(".close-btn");

    btn1.addEventListener("click", function(event){
        
        // find target
        let clicked = event.target;
        //console.log("button er clicked - event target",clicked);

        // find targets prevoius sibling = full
        let targetClick = clicked.previousSibling.previousSibling;
        //console.log("Previous Sibling",targetClick);

        // VIS TEXTBOX
        targetClick.style.display = "inherit"; 
        btn2.style.display = "inherit";
        btn1.style.display = "none";

        targetClick.classList.remove("fadeOut");
        targetClick.classList.add("fadeInDown");
    })
    
    btn2.addEventListener("click", function(event){
        
        // find target
        let clicked2 = event.target;
        //console.log("button er clicked - event target",clicked);

        // find targets prevoius sibling = full
        let targetClick2 = clicked2.previousSibling.previousSibling.previousElementSibling;
        //console.log("Previous Sibling",clicked2.previousSibling.previousSibling.previousElementSibling);

        // SKJUL TEXTBOX
        btn1.style.display = "inherit";
        btn2.style.display = "none";

        targetClick2.classList.remove("fadeInDown");
        targetClick2.classList.add("fadeOut");

        setTimeout(function(){ 
            targetClick2.style.display = "none"; 
        }, 1000);

    });
        
        beerTypeContainer.appendChild(typeKlon);

    });
}



//--------------------------------------------------------------------
// FUNKTION til Antal i KØ
function queueList() {

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

    } else if (queueData < 10) {
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
//FUNKTION til Orders Done!

function customerList() {

    // find array for serving i JSON output
    servingData = jsonData.serving;
  
    // loop serving array igennem  
    servingData.forEach(function (elm) {

      // tilføj array til serving array med korresponderende ID
      queueId.push(elm.id);
      //console.log("length", queueId)
  
      // begræns array til length = 3
       if(queueId.length > 2) {
           // fjern det ældste id fra array
          queueId.shift();
      }
    })
  
    // vend/sortér array så det nyeste ID er det første
    let newId =  queueId.sort(function (a,b){
      return b - a;
    })

    //console.log("højeste ID", highestId)

    // nulstil/tilføj +1 til ID (da ticket id starter fra 0)
    let customerAmount = newId[0]+1;

    // output data i DOM'en
    document.querySelector(".orderAmount").textContent = customerAmount;

    //console.log("Ny ID",newId)

    // hvis ID'et er = 0 output --> 0
    if(queueId == 0){
        document.querySelector(".orderAmount").textContent = "0";
    }
  };




//--------------------------------------------------------------------
// sæt interval
window.setInterval(hentData, 5000);
hentData();
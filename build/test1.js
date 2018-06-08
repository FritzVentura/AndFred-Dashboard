


function jsonLoaded(jsonData,element,callBack){

    // fetch og load json til DOM'en
    fetch(jsonData)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            
            callBack(data);
        })
    }
    
    
    jsonLoaded("https://kea-alt-del.dk/customersupport/?count=10", "#template_modtager", showData);


    function showData(data){
        //  document.querySelector("#bike").style.display = "none";
          console.log("json er loaded", data);

        

          jsonLoaded.forEach(function(event){
    
            // klon template og vis i DOM
            let klon = template.cloneNode(true).content;
                
            klon.querySelector(".first").textContent = event.first;
            klon.querySelector(".last").textContent = event.last;
            klon.querySelector(".message").textContent = event.message;
            klon.querySelector(".date").textContent = event.time.year;
        
            // Link til single view
         //   klon.querySelector(".linkToSingle").setAttribute("href", "singleview.html?id="+event.id);
         //   klon.querySelector(".linkToSingle_2").setAttribute("href", "singleview.html?id="+event.id);
                
                
            eventscontainer.appendChild(klon);
                
            });




      }
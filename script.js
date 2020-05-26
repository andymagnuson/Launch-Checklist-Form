// Write your JavaScript code here!

function allLetter(input)
  {
   let letters = /^[A-Za-z]+$/;
   if(input.match(letters) ||input.match(' '))
     {
      return input;
      }else {
     alert("Can only include letters in names");
     return "";
     }
  }

  function isNumber(input){
   //   alert(input)
   if (input ==="") {
      return true;
     }
   if (isNaN(Number(input))) {
    alert("Fuel Level and Cargo Mass must be a number")
    return true;
     } else {
        return false;
     }
  }

window.addEventListener("load", function() {
   let form = document.querySelector("form");

   fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response){
      response.json().then(function(json){
          const missionTarget = document.getElementById("missionTarget");
          let ranNum= Math.floor(Math.random() * 6) 
          alert(ranNum)
          missionTarget.innerHTML =`
          <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[ranNum].name}</li>
               <li>Diameter: ${json[ranNum].diameter}</li>
               <li>Star: ${json[ranNum].star}</li>
               <li>Distance from Earth: ${json[ranNum].distance}</li>
               <li>Number of Moons: ${json[ranNum].moons}</li>
            </ol>
            <img src="${json[ranNum].image}"></img>`
      })
   })

         const pilotStatus = document.getElementById('pilotStatus');
         const copilotStatus = document.getElementById('copilotStatus');
         const fuelStatus = document.getElementById('fuelStatus');
         const cargoStatus = document.getElementById('cargoStatus');
         const launchStatus=document.getElementById('launchStatus');
         
         form.addEventListener("submit", function(event) {
            let pilotName=document.querySelector('input[name=pilotName]');
            let copilotName=document.querySelector('input[name=copilotName]');
            let fuelLevel=document.querySelector('input[name=fuelLevel]');
            let cargoMass=document.querySelector('input[name=cargoMass]');
                                    
            if (allLetter(pilotName.value) =="" || allLetter(copilotName.value) ==="" || isNumber(fuelLevel.value) || isNumber(cargoMass.value)){
                alert("All fields are required to be filled out with the correct data types");
                event.preventDefault();
             } else {
            pilotStatus.innerHTML= `Pilot ${pilotName.value} is ready for launch`;
            copilotStatus.innerHTML=`Co-Pilot ${copilotName.value} is ready for launch`;
              if(Number(fuelLevel.value) < 10000){
                   launchStatus.innerHTML="Shuttle NOT ready for launch";
                   fuelStatus.innerHTML="Insufficent Fuel for the journey";
                   document.getElementById('faultyItems').style.visibility = 'visible';
                   document.getElementById('launchStatus').style.color = 'red';
              }
              if (Number(cargoMass.value) > 10000){
               launchStatus.innerHTML="Shuttle NOT ready for launch";
               document.getElementById('launchStatus').style.color = 'red';
               cargoStatus.innerHTML="Too much cargo to launch!";
               document.getElementById('faultyItems').style.visibility = 'visible';
              }
            if (Number(fuelLevel.value) >= 10000 && Number(cargoMass.value) <= 10000 ){
               launchStatus.innerHTML="Shuttle is ready for launch";
               document.getElementById('launchStatus').style.color = 'green';
               document.getElementById('faultyItems').style.visibility = 'hidden';
               fuelStatus.innerHTML="Fuel level high enough for launch";
               cargoStatus.innerHTML="Cargo mass low enough for launch";
            
            }
            event.preventDefault();
         }
         });
   })



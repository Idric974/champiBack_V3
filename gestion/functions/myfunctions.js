//? Afficher la date.

const showDate=()=>{  

  let myDate;

    let mois = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    let maintenant = new Date();
    let jour = maintenant.getDate();
    let moisAnnee = mois[maintenant.getMonth()];
    let annee = maintenant.getFullYear();

    myDate = `${jour}/${moisAnnee}/${annee}`;

    const element = document.getElementById("afficheDate");
    if (element) {
      element.innerHTML = myDate;
    };
    // console.log("La date ==>",myDate);
  
}

//? -------------------------------------------------

//? Afficher l'heure.

const showTime=()=>{  

  let myHeure;

  function updateTime() {
    let myDate = new Date();
    let heure = myDate.getHours().toString().padStart(2, "0");
    let minute = myDate.getMinutes().toString().padStart(2, "0");
    let seconde = myDate.getSeconds().toString().padStart(2, "0");

    myHeure = `  ${heure}:${minute}:${seconde}`;

    const element = document.getElementById("afficheHeure");
    if (element) {
      element.innerHTML = myHeure;
    } else {
      console.log("Pas d'heure");
    }
  }

  setInterval(() => {
    updateTime();
  }, 1000);
}

//? -------------------------------------------------

//? Gestion des boutons sec et humidité de l'accueil.

//* switch Valve A/B.

let vanneActive = "vanneHum";
const switchValve = ()=>{
  document.addEventListener("DOMContentLoaded", function () {
  const buttonHum = document.getElementById("switchHum");
  const buttonSec = document.getElementById("switchSec");

  function togglebuttonHum() {
    buttonHum.innerHTML = "ON";
    buttonHum.style.backgroundColor = "var(--orangeClic974)";

    buttonSec.innerHTML = "OFF";
    buttonSec.style.backgroundColor = "var(--greenColor)";
  }

  function togglebuttonSec() {
    buttonSec.innerHTML = "ON";
    buttonSec.style.backgroundColor = "var(--orangeClic974)";

    buttonHum.innerHTML = "OFF";
    buttonHum.style.backgroundColor = "var(--greenColor)";
  }

  buttonHum.addEventListener("click", function () {
    let pin = 22;
    let action = "off"
    togglebuttonHum();
    vanneActive = "vanneHum";
    console.log("Vanne active", vanneActive);
    saveVanneActive();
    gpioAction(action,pin);
  });

  buttonSec.addEventListener("click", function () {
    let pin = 22;
    let action = "off"
    togglebuttonSec();
    vanneActive = "vanneSec";
    console.log("Vanne active", vanneActive);
    saveVanneActive();
    gpioAction(action,pin);
  });
});}

const saveVanneActive =()=>{
  fetch('http://localhost:3003/api/gestionAirRoutes/postVanneActive/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      vanneActive
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log("postVanneActive => ",data);
  })
  .catch("postVanneActive error=> ",error => {
    console.log(error);
  });
}

//? -------------------------------------------------

//? Fermeture de la vanne lors du switch.

const gpioAction = (action, pin) => {
console.log('action + pin ==> ',action, pin);


  fetch('http://localhost:3003/api/relayRoutes/fermetureVanneSwitch/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action,  pin })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

//? -------------------------------------------------

module.exports = {
  showDate,
  showTime,
  switchValve
}
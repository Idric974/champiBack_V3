(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
const { 
        showDate,
        showTime,
        switchValve,
      }= require('../../functions/myfunctions')

showDate();
showTime();
switchValve();

//? Récupération de la tempèrature Air dans la base.

//* Température Air.

let temperatureAir;
let temperatureAirLocalStorage;

//* Consigne Air.


let deltaAirLocalStorage;

let getTemperatureAir = () => {
  fetch('http://localhost:3003/api/gestionAirRoutes/getTemperatureAir/', {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // console.log("DATA BRUTE : temperatureAir =>",data);

      let temperatureAir = data.temperatureAir.temperatureAir;
      //console.log("👉 temperatureAir =>",temperatureAir);
      //console.log("👉 temperatureAir typeof =>",typeof temperatureAir);

      localStorage.setItem('gestionAir ==> Tempèrature Air:', temperatureAir);

      let temperatureAirLocalStorage = localStorage.getItem(
        'gestionAir ==> Tempèrature Air:'
      );

      document.getElementById('temperatureAir').innerHTML =
        temperatureAirLocalStorage + '°C';
    })
    .catch(error => {
      console.log(error);
      console.log(JSON.stringify(error));
    });
};

getTemperatureAir();


setInterval(() => {
  getTemperatureAir();
  //console.log('récup tempAir');
}, 10000);

//? -------------------------------------------------

//? Récupération de la consigne Air dans la base.

//* température Air.

let consigneAir;
let consigneAirLocalStorage;
let objectifAir;
let pasAir;
let nbJourAir;
let nbHeureAir;
let getDernierConsigneAirEntree;
let getdernierPasAirEntree;
let getDernierObjectifAirEntree;
let deltaAir;

let getConsigneAir = () => {
  fetch('http://localhost:3003/api/gestionAirRoutes/getDataAir/', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      //* Consigne Air.
       //console.log("DATA BRUTE : Consigne Air =>",data);

      consigneAir = data.datatemperatureAir.consigneAir;
      //console.log("👉 consigneAir =>",consigneAir);
      //console.log("👉 consigneAir typeof =>",typeof consigneAir);

      localStorage.setItem('gestionAir ==> Consigne :', consigneAir);

      consigneAirLocalStorage = localStorage.getItem(
        'gestionAir ==> Consigne :'
      );

      document.getElementById('consigneAir').innerHTML =
        consigneAirLocalStorage + '°C';

      //* -------------------------------------------------

      //* Affichage historique Consigne.
      getDernierConsigneAirEntree = localStorage.getItem(
        'gestionAir ==> Dernier consigne:'
      );

      document.getElementById('dernierConsigneAirEntree').innerHTML =
        getDernierConsigneAirEntree;

      //* -------------------------------------------------

      //* Affichage historique Pas.
      getdernierPasAirEntree = localStorage.getItem(
        'gestionAir ==> Dernier Pas:'
      );

      document.getElementById('dernierPasAirEntree').innerHTML =
        getdernierPasAirEntree;

      //* -------------------------------------------------

      //* Affichage historique Objectif.
      getDernierObjectifAirEntree = localStorage.getItem(
        'gestionAir ==> Dernier Objectif:'
      );

      document.getElementById('dernierObjectifAirEntree').innerHTML =
        getDernierObjectifAirEntree;

      //* -------------------------------------------------
    })
    .then(() => {
      let CalculeNombreJour = () => {
        if (
          consigneAir == 0 ||
          consigneAir == '' ||
          consigneAir == null ||
          getDernierObjectifAirEntree == 0 ||
          getDernierObjectifAirEntree == '' ||
          getDernierObjectifAirEntree == null ||
          getdernierPasAirEntree == 0 ||
          getdernierPasAirEntree == '' ||
          getdernierPasAirEntree == null
        ) {
          //  console.log('Pas de paramètre pas de calcule des jours');
          return;
        } else {
          let dureeDescenteAir =
            ((consigneAir - getDernierObjectifAirEntree) /
              getdernierPasAirEntree) *
            12;

          // console.log('Durée Descente Air', dureeDescenteAir);

          let totalHeures = dureeDescenteAir;

          nbJourAir = Math.floor(totalHeures / 24);

          totalHeures %= 360;

          nbHeureAir = Math.floor(totalHeures / 36);

          // console.log(
          //   'La durée de la descente Air est de  : ' +
          //   nbJourAir +
          //   ' Jours ' +
          //   nbHeureAir +
          //   ' Heures '
          // );
        }

        localStorage.setItem('gestionAir ==> Nombre de jour:', nbJourAir);
        nbJourAirLocalStorage = localStorage.getItem('Valeure nbJour Air : ');

        let nombreDeJour = localStorage.getItem(
          'gestionAir ==> Nombre de jour:'
        );

        localStorage.setItem('gestionAir ==> Nombre de heure:', nbHeureAir);

        let nombreDeHeure = localStorage.getItem(
          'gestionAir ==> Nombre de heure:'
        );

        document.getElementById('descenteAir').innerHTML =
          nombreDeJour +
          ' ' +
          'Jours et' +
          ' ' +
          nombreDeHeure +
          ' ' +
          'Heures';
      };

      CalculeNombreJour();

      setInterval(() => {
        CalculeNombreJour();
      }, 120000);
    })
    .then(() => {
      deltaAir = temperatureAir - consigneAir;

      //console.log("👉 delta Air =>",deltaAir);
      //console.log("👉 delta Air typeof =>",typeof deltaAir);

      localStorage.setItem('Valeure delta Air : ', deltaAir);

      deltaAirLocalStorage = localStorage.getItem('Valeure delta Air : ');

      document.getElementById('deltaAir').innerHTML =
        deltaAirLocalStorage + '°C';


    })
    .catch(error => {
      console.log(error);
      console.log(JSON.stringify(error));
    });
};



getConsigneAir();

setInterval(() => {
  getConsigneAir();
  // console.log('récup consigneAir');
}, 15000);

//? -------------------------------------------------

//? 3 Calcul du delta.

// let deltaAir;
const calculDuDelta =()=>{


      // deltaAir = parseFloat(temperatureAir - consigneAir).toFixed(2);

      deltaAir = temperatureAir - consigneAir;

      console.log("👉 delta Air =>",deltaAir);
      console.log("👉 delta Air typeof =>",typeof deltaAir);

      localStorage.setItem('Valeure delta Air : ', deltaAir);

      deltaAirLocalStorage = localStorage.getItem('Valeure delta Air : ');

      document.getElementById('deltaAir').innerHTML =
        deltaAirLocalStorage + '°C';



}

//calculDuDelta();

//? -------------------------------------------------


//?  Post consigne air dans la base.

document
  .getElementById('validationConsigneAir')
  .addEventListener('click', function () {
    //
    console.log('Clic sur bouton validation consigne air ');

    let consigneAirForm = document.getElementById('consigneAirForm').value;
    // console.log('consigneAirForm', consigneAirForm);

    localStorage.setItem('gestionAir ==> Dernier consigne:', consigneAirForm);

    const boutonValiderEtalAir = () => {
      fetch('http://localhost:3003/api/gestionAirRoutes/postConsigneAir/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          consigneAir: consigneAirForm
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
    };
    
  });

//? Post des datas air dans la base.

document
  .getElementById('validationdataAir')
  .addEventListener('click', function () {
    //
    // console.log('Clic sur bouton validation Etal Hum');

    //* Pas Air.

    let pasAirForm = document.getElementById('pasAirForm').value;
    // console.log('pasAirForm', pasAirForm);

    localStorage.setItem('gestionAir ==> Dernier Pas:', pasAirForm);

    //* -------------------------------------------------

    //* Objectif Air.

    let objectiAirForm = document.getElementById('objectiAirForm').value;

    localStorage.setItem('gestionAir ==> Dernier Objectif:', objectiAirForm);

    //* -------------------------------------------------

    const boutonValiderEtalHum = () => {
      fetch('http://localhost:3003/api/gestionAirRoutes/postDataAir/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pasAir: pasAirForm,
          objectifAir: objectiAirForm
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
    };
    

    window.location.reload();
  });

//? -------------------------------------------------


},{"../../functions/myfunctions":1}]},{},[2]);

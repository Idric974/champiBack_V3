const { 
        showDate,
        showTime,
        switchValve,
      }= require('../../functions/myfunctions')

showDate();
showTime();
switchValve();

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

calculDuDelta();

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


//? Afficher la date.

const afficherDateEtHeure=()=>{  

  let dateEtHeure;

  function afficherDate() {
    let jours = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
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
    let jourSemaine = jours[maintenant.getDay()];
    let jour = maintenant.getDate();
    let moisAnnee = mois[maintenant.getMonth()];
    let annee = maintenant.getFullYear();
    let heure = maintenant.getHours().toString().padStart(2, "0");
    let minute = maintenant.getMinutes().toString().padStart(2, "0");
    let seconde = maintenant.getSeconds().toString().padStart(2, "0");

    dateEtHeure = `${jour}/${moisAnnee}/${annee}`;

    const element = document.getElementById("afficheDate");
    if (element) {
      element.innerHTML = dateEtHeure;
    }
  }

  setInterval(() => {
    // console.log(afficherDate());
    afficherDate();
  }, 1000);
}

//? -------------------------------------------------

//? Afficher l'heure.

const afficherHeure=()=>{  

  let myHeure;

  function afficherHeure() {
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
    afficherHeure();
  }, 1000);
}

//? -------------------------------------------------

//? Gestion des boutons SEC et

const gpioOn = () => {
  fetch('http://localhost:3003/api/relayRoutes/relayOnSecHum/')
      .then(response => response.text())
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

const gpioOff = () => {
  fetch('http://localhost:3003/api/relayRoutes/relayOffSecHum/')
      .then(response => response.text())
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
}


module.exports = {
  afficherDateEtHeure,
  afficherHeure,
  gpioOn,
  gpioOff,

}
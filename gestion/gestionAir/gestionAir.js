const sequelize = require("sequelize");
const db = require("../../models");
const {
  sendSMS,
  miseAjourEtatRelay,
  gpioAction,
} = require("../functions/myfunctions");

//? Recupération de la vanne à utiliser.

let vanneActive;
let ouvertureVanne;
let fermetureVanne;

const gestionAirVannesModels = db.gestionAirVannes;

const recuperationDeLaVanneActive = () => {
  return new Promise((resolve, reject) => {
    gestionAirVannesModels
      .findOne({
        attributes: [[sequelize.fn("max", sequelize.col("id")), "maxid"]],
        raw: true,
      })
      .then((maxIdResult) => {
        if (!maxIdResult) {
          throw new Error("No max ID found");
        }
        return gestionAirVannesModels.findOne({
          where: { id: maxIdResult.maxid },
        });
      })
      .then((result) => {
        if (!result) {
          throw new Error("No vanne found with max ID");
        }
        vanneActive = result.vanneActive;

        if (vanneActive === "vanneHum") {
          ouvertureVanne = "23";
          fermetureVanne = "22";
          console.log(
            "✅ SUCCÈS | Gestions Air | Vanne à utiliser = ",
            vanneActive
          );

          resolve({ ouvertureVanne, fermetureVanne });
        } else if (vanneActive === "vanneSec") {
          ouvertureVanne = "25";
          fermetureVanne = "24";
          console.log(
            "✅ SUCCÈS | Gestions Air | Vanne à utiliser = ",
            vanneActive
          );
          resolve({ ouvertureVanne, fermetureVanne });
        } else {
          reject(console.log(`Unknown vanneActive value: ${vanneActive}`));
          throw new Error(`Unknown vanneActive value: ${vanneActive}`);
        }
      })
      .catch((error) => {
        console.error(
          "? %c ERREUR ==> gestions Air ==> Récupération de l'étalonage",
          "color: orange",
          error
        );
        reject(error);
      });
  });
};

//? --------------------------------------------------

//? Récupération de la consigne.

let consigne;
let pas;
let objectif;

const gestionAirsDataModels = db.gestionAirData;

const recupérationDeLaConsigne = () => {
  return new Promise((resolve, reject) => {
    gestionAirsDataModels
      .findOne({
        attributes: [[sequelize.fn("max", sequelize.col("id")), "maxid"]],
        raw: true,
      })
      .then((maxIdResult) => {
        if (!maxIdResult) {
          throw new Error("No max ID found");
        }
        return gestionAirsDataModels.findOne({
          where: { id: maxIdResult.maxid },
        });
      })
      .then((result) => {
        if (!result) {
          throw new Error("No data found with max ID");
        }

        consigne = result.consigneAir;
        pas = result.pasAir;
        objectif = result.objectifAir;

        console.log(
          "✅ SUCCÈS | Gestions Air | Récupération de la Consigne Air =",
          consigne
        );
        console.log(
          "✅ SUCCÈS | Gestions Air | Récupération du Pas Air =",
          pas
        );
        console.log(
          "✅ SUCCÈS | Gestions Air | Récupération de l'Objectif Air =",
          objectif
        );

        resolve({ consigne, pas, objectif });
      })
      .catch((error) => {
        console.error(
          "❌ ERREUR ==> gestions Air ==> Récupération de la consigne",
          "color: orange",
          error
        );
        reject(error);
      });
  });
};

//? --------------------------------------------------

//? Récupération de l'étalonage.

let etalonnage;

const gestionAirEtalonnageModels = db.etalonnageAir;

const recuperationDeEtalonage = () => {
  return new Promise((resolve, reject) => {
    gestionAirEtalonnageModels
      .findOne({
        attributes: [[sequelize.fn("max", sequelize.col("id")), "maxid"]],
        raw: true,
      })
      .then((maxIdResult) => {
        if (!maxIdResult) {
          throw new Error("No max ID found");
        }
        return gestionAirEtalonnageModels.findOne({
          where: { id: maxIdResult.maxid },
        });
      })
      .then((result) => {
        if (!result) {
          throw new Error("No data found with max ID");
        }

        etalonnage = result.etalonnageAir;

        console.log(
          "✅ SUCCÈS | Gestions Air | Récupération de l'étalonage = ",
          etalonnage
        );

        resolve(etalonnage);
      })
      .catch((error) => {
        console.error(
          "❌ ERREUR ==> gestions Air ==> Récupération de l'étalonage",
          "color: orange",
          error
        );
        reject(error);
      });
  });
};

//? --------------------------------------------------

//? Récupération de l'état de la vanne froid.

let etatVanneBDD;
let deltaAirPrecedent;

const gestionAirModels = db.gestionAir;

const recuperationEtatVanneFroid = () => {
  return new Promise((resolve, reject) => {
    gestionAirModels
      .findOne({
        attributes: [[sequelize.fn("max", sequelize.col("id")), "maxid"]],
        raw: true,
      })
      .then((maxIdResult) => {
        if (!maxIdResult) {
          throw new Error("No max ID found");
        }
        return gestionAirModels.findOne({ where: { id: maxIdResult.maxid } });
      })
      .then((result) => {
        if (!result) {
          throw new Error("No data found with max ID");
        }

        etatVanneBDD = result.etatRelay;
        deltaAirPrecedent = result.deltaAir;

        console.log(
          "✅ SUCCÈS | Gestions Air | Récupération de l'état de la vanne froid =",
          etatVanneBDD
        );
        console.log(
          "✅ SUCCÈS | Gestions Air | Récupération du delta Air =",
          deltaAirPrecedent
        );

        resolve({ etatVanneBDD, deltaAirPrecedent });
      })
      .catch((error) => {
        console.error(
          "❌ ERREUR ==> gestions Air ==> Récupération de l'état de la vanne froid",
          "color: orange",
          error
        );
        reject(error);
      });
  });
};

//? --------------------------------------------------

//? Construction de la valeur de l'axe x.

let dateDuJour;
let dateDemarrageCycle;
let jourDuCycle;
let heureDuCycle;
let minuteDuCycle;
let heureMinute;
let valeurAxeX;

const gestionCourbesModels = db.gestionCourbes;

let constructionAxeX = () => {
  return new Promise((resolve, reject) => {
    try {
      gestionCourbesModels
        .findOne({
          attributes: [[sequelize.fn("max", sequelize.col("id")), "maxid"]],
          raw: true,
        })
        .then((id) => {
          // console.log('Le dernier id de gestionAir est : ', id);
          // console.log(id.maxid);

          gestionCourbesModels
            .findOne({
              where: { id: id.maxid },
            })
            .then((result) => {
              //* dade démarrage du cycle.

              dateDemarrageCycle = result.dateDemarrageCycle;

              console.log(
                "✅ SUCCÈS | Gestions Air | Construction de la valeur de l'axe X = ",
                dateDemarrageCycle
              );

              //* --------------------------------------------------

              // console.log('Le dernier id de gestionAir est : ', id);
              // console.log(id.maxid);

              gestionCourbesModels
                .findOne({
                  where: { id: id.maxid },
                })
                .then((result) => {
                  //* Date de démarrage du cycle.

                  dateDemarrageCycle = new Date(result["dateDemarrageCycle"]);

                  console.log(
                    "✅ SUCCÈS | Gestions Air | Date de démarrage du cycle = ",
                    dateDemarrageCycle
                  );

                  //* --------------------------------------------------

                  //* Date du jour.

                  dateDuJour = new Date();

                  // console.log(
                  //     "✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe X ===> Date du jour",
                  //     'color: green', dateDuJour
                  // );

                  //* --------------------------------------------------

                  //* Calcul du nombre de jour du cycle.

                  let nbJourBrut =
                    dateDuJour.getTime() - dateDemarrageCycle.getTime();
                  jourDuCycle = Math.round(nbJourBrut / (1000 * 3600 * 24)) + 1;

                  // console.log(
                  //     "✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe X ===> Calcul du nombre de jour du cycle",
                  //     'color: green', jourDuCycle
                  // );

                  //* --------------------------------------------------

                  //* Affichage de l'heure.
                  heureDuCycle = new Date().getHours();
                  minuteDuCycle = new Date().getMinutes();
                  heureMinute = heureDuCycle + "h" + minuteDuCycle;

                  // console.log(
                  //     "✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe x ===> Affichage de l'heure",
                  //     'color: green', heureMinute
                  // );

                  //* --------------------------------------------------

                  //* Valeure de l'axe x.
                  valeurAxeX = "Jour " + jourDuCycle + " - " + heureMinute;

                  // console.log(
                  //     "✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe x ===> Valeure de l'axe X",
                  //     'color: green', valeurAxeX
                  // );

                  //* --------------------------------------------------
                });
            })

            .then(() => {
              resolve();
            });
        });
    } catch (error) {
      console.log(
        "❌ %c ERREUR ==> gestions Air ==> Construction de la valeur de l'axe X",
        "color: orange",
        error
      );

      reject();
    }
  });
};

//? --------------------------------------------------

//? Mesure de la température Air.

let mcpBroche = 2;
const mcpadc = require("mcp-spi-adc");

let getTemperatures = () => {
  return new Promise((resolve, reject) => {
    try {
      let temps = 0;

      let count = () => {
        temps = temps++;

        //console.log(temps++);

        if (temps++ === 9) {
          clearInterval(conteur);
        }

        // console.log(jaune, '[ GESTION SUBSTRAT CALCULES  ] temps', temps);

        const tempSensor = mcpadc.open(mcpBroche, { speedHz: 20000 }, (err) => {
          if (err) throw err;

          tempSensor.read((err, reading) => {
            if (err) throw err;
            listValAir.push(reading.value * 40);

            console.log(
              "✅ SUCCÈS | Gestions Air | Mesure de la température Air",
              "color: green",
              listValAir
            );

            if (listValAir.length >= 10) {
              // console.log('listValAir.length >=10');
              resolve();
            }
          });
        });
      };

      let conteur = setInterval(count, 1000);
    } catch (error) {
      console.log(
        "❌ %c ERREUR ==> gestions Air ==> Mesure de la température Air",
        "color: orange",
        error
      );

      reject();
    }
  });
};

//? --------------------------------------------------

//? Calcule de la température moyenne.

let listValAir = [];
let temperatureMoyenneAir;

const calculeDeLaTemperatureMoyenne = () => {
  return new Promise((resolve, reject) => {
    try {
      const arrayLength = listValAir.length;
      if (arrayLength === 0) {
        throw new Error("List of air values is empty");
      }

      const sumlistValAir = listValAir.reduce(
        (accumulator, curr) => accumulator + curr,
        0
      );
      temperatureMoyenneAir =
        Math.round((sumlistValAir / arrayLength) * 100) / 100;

      console.log(
        "✅ SUCCÈS | Gestions Air | Temperature air moyenne = ",
        temperatureMoyenneAir
      );

      resolve(temperatureMoyenneAir);
    } catch (error) {
      console.error(
        "❌ ERREUR ==> gestions Air ==> Temperature air moyenne",
        "color: orange",
        error
      );
      reject(error);
    }
  });
};

//? --------------------------------------------------

//? Définition de la température air corrigée.

let temperatureCorrigee;

let definitionTemperatureAirCorrigee = () => {
  return new Promise((resolve, reject) => {
    try {
      temperatureCorrigee =
        parseFloat(temperatureMoyenneAir.toFixed(1)) + etalonnage;

      console.log(
        "✅ SUCCÈS | Gestions Air | Définition de la température air corrigée = ",
        temperatureCorrigee
      );

      resolve();
    } catch (error) {
      console.log(
        "❌ %c ERREUR ==> gestions Air ==> Définition de la température air corrigée",
        "color: orange",
        error
      );

      reject();
    }
  });
};

//? --------------------------------------------------

//? Définition du delta.

let delta;

let definitionDuDelta = () => {
  return new Promise((resolve, reject) => {
    try {
      delta = parseFloat((temperatureCorrigee - consigne).toFixed(1));

      console.log("✅ SUCCÈS | Gestions Air | Définition du delta = ", delta);

      resolve();
    } catch (error) {
      console.log(
        "❌ %c ERREUR ==> gestions Air ==> Définition du delta",
        "color: orange"
      );

      reject();
    }
  });
};

//? --------------------------------------------------

//? Définition des actions.

let duree1Seconde = 1000;
let duree2Seconde = 2000;
let duree5Seconde = 5000;
let duree15Seconde = 15000;

let definitionDesActions = () => {
  return new Promise((resolve, reject) => {
    try {
      //

      if (delta >= 3) {
        console.log(
          "✅ SUCCÈS | Gestions Air | ALERTE, le delta est supérieur à 3°C"
        );

        // sendSMS("Attention : le delta est supérieur à 3°C");

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Ouverture vanne pendant : " +
            duree15Seconde +
            " secondes"
        );

        gpioAction("out", ouvertureVanne);

        if (etatVanneBDD >= 100) {
          etatRelay = 100;
        } else {
          etatRelay = 100;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", ouvertureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve(etatRelay, (actionRelay = 0));
        }, duree15Seconde);

        //?-----------------------------------------
        //
      } else if (delta > 1.5 && delta < 3) {
        //

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta > 1.5° < 3° | Action = Ouverture vanne pendant : " +
            duree15Seconde +
            " secondes"
        );

        gpioAction("out", ouvertureVanne);

        if (etatVanneBDD >= 100) {
          etatRelay = 100;
        } else {
          etatRelay = 100;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", ouvertureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve(etatRelay, (actionRelay = 0));
        }, duree15Seconde);

        //?-----------------------------------------
        //
      } else if (delta > 1 && delta <= 1.5) {
        //

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Ouverture vanne pendant : " +
            duree5Seconde +
            " secondes"
        );

        gpioAction("out", ouvertureVanne);

        if (etatVanneBDD >= 100) {
          etatRelay = 100;
        } else {
          etatRelay = etatVanneBDD + 37.5;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", ouvertureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve(etatRelay, (actionRelay = 0));
        }, duree5Seconde);

        //?-----------------------------------------
        //
      } else if (delta > 0.5 && delta <= 1) {
        //

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Ouverture vanne pendant : " +
            duree2Seconde +
            " secondes"
        );

        gpioAction("out", ouvertureVanne);

        if (etatVanneBDD >= 100) {
          etatRelay = 100;
        } else {
          etatRelay = etatVanneBDD + 12.5;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", ouvertureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve(etatRelay, (actionRelay = 0));
        }, duree2Seconde);

        //?-----------------------------------------
        //
      } else if (delta > 0.3 && delta <= 0.5) {
        //

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Ouverture vanne pendant : " +
            duree1Seconde +
            " secondes"
        );

        gpioAction("out", ouvertureVanne);

        if (etatVanneBDD >= 100) {
          etatRelay = 100;
        } else {
          etatRelay = etatVanneBDD + 5;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", ouvertureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve(etatRelay, (actionRelay = 0));
        }, duree1Seconde);

        //?-----------------------------------------
        //
      } else if (delta >= -0.3 && delta <= 0.3) {
        //

        //! Pas d'action car interval entre -0.3 et 0.3"

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Pas d'action"
        );

        etatRelay = etatVanneBDD;
        miseAjourEtatRelay(etatRelay, (actionRelay = 0));
        resolve(etatRelay, (actionRelay = 0));

        //!-----------------------------------------
        //
      } else if (delta < -0.3 && delta >= -0.5) {
        //

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Fermuture vanne pendant : " +
            duree1Seconde +
            " secondes"
        );

        gpioAction("out", fermetureVanne);

        if (etatVanneBDD <= 0) {
          etatRelay = 0;
        } else {
          etatRelay = etatVanneBDD - 5;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", fermetureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve();
        }, duree1Seconde);

        //? -----------------------------------------------
        //
      } else if (delta < -0.5 && delta >= -1) {
        //
        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Fermuture vanne pendant : " +
            duree5Seconde +
            " secondes"
        );

        gpioAction("out", fermetureVanne);

        if (etatVanneBDD <= 0) {
          etatRelay = 0;
        } else {
          etatRelay = etatVanneBDD - 12.5;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", fermetureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve();
        }, duree5Seconde);

        //? -----------------------------------------------
        //
      } else if (delta < -1 && delta >= -1.5) {
        //

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Fermuture vanne pendant : " +
            duree5Seconde +
            " secondes"
        );

        gpioAction("out", fermetureVanne);

        if (etatVanneBDD <= 0) {
          etatRelay = 0;
        } else {
          etatRelay = etatVanneBDD - 37.5;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", fermetureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve();
        }, duree5Seconde);

        //? -----------------------------------------------
        //
      } else if (delta < -1.5 && delta > -3) {
        //

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Fermuture vanne pendant : " +
            duree15Seconde +
            " secondes"
        );

        gpioAction("out", fermetureVanne);

        if (etatVanneBDD <= 0) {
          etatRelay = 0;
        } else {
          etatRelay = 0;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", fermetureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve();
        }, duree15Seconde);

        //? -----------------------------------------------
        //
      } else if (delta <= -3) {
        console.log(
          "✅ SUCCÈS | Gestions Air | ALERTE, le delta est supérieur à -3°C"
        );

        // sendSMS("Attention : le delta est inférieur à -3°C");

        console.log(
          "✅ SUCCÈS | Gestions Air | Delta >= 3° | Action = Fermuture vanne pendant : " +
            duree15Seconde +
            " secondes"
        );

        gpioAction("out", fermetureVanne);

        if (etatVanneBDD <= 0) {
          etatRelay = 0;
        } else {
          etatRelay = 0;
        }

        miseAjourEtatRelay(etatRelay, (actionRelay = 1));

        setTimeout(() => {
          gpioAction("in", fermetureVanne);
          miseAjourEtatRelay(etatRelay, (actionRelay = 0));
          resolve(etatRelay, (actionRelay = 0));
        }, 15000);

        //? -----------------------------------------------
        //
      }
    } catch (error) {
      console.log("🔴 Définition des actions :", error);
      reject();
    }
  });
};

//? --------------------------------------------------

//? Enregistrement des datas dans la base.

let enregistrementDatas = () => {
  return new Promise((resolve, reject) => {
    try {
      gestionAirModels
        .create({
          temperatureAir: temperatureCorrigee,
          deltaAir: delta,
          actionRelay: actionRelay,
          etatRelay: etatRelay,
          consigne: consigne,
          valeurAxeX: valeurAxeX,
          jourDuCycle: jourDuCycle,
        })

        .then(function (result) {
          console.log(
            "✅ SUCCÈS | Gestions Air | Enregistrement des datas dans la base de données sous l'id :",
            result["dataValues"].id
          );
        })

        .then(() => {
          resolve();
        });
    } catch (error) {
      console.log(
        "❌ ERREUR | gestions Air | Enregistrement des datas dans la base",
        error
      );

      reject();
    }
  });
};

//? --------------------------------------------------

//! Exécution des fonctions asynchrones.

let handleMyPromise = async () => {
  try {
    await recuperationDeLaVanneActive();
    await recupérationDeLaConsigne();
    await recuperationDeEtalonage();
    await recuperationEtatVanneFroid();
    await constructionAxeX();
    await getTemperatures();
    await calculeDeLaTemperatureMoyenne();
    await definitionTemperatureAirCorrigee();
    await definitionDuDelta();
    await definitionDesActions();
    await enregistrementDatas();
  } catch (err) {
    console.log("err finale :", err);
  }
};

handleMyPromise();

//! -------------------------------------------------- !

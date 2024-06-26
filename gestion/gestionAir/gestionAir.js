const Gpio = require('onoff').Gpio;
const sequelize = require('sequelize');
const db = require('../../models');
const {sendSMS, miseAjourEtatRelay}= require("../functions/myfunctions")

//? Recupération de la vanne à utiliser.

let vanneActive;
let ouvertureVanne;
let fermetureVanne;

const gestionAirVannesModels = db.gestionAirVannes;

const recuperationDeLaVanneActive = () => {
    return new Promise((resolve, reject) => {
        gestionAirVannesModels
            .findOne({
                attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxid']],
                raw: true,
            })
            .then(maxIdResult => {
                if (!maxIdResult) {
                    throw new Error("No max ID found");
                }
                return gestionAirVannesModels.findOne({ where: { id: maxIdResult.maxid } });
            })
            .then(result => {
                if (!result) {
                    throw new Error("No vanne found with max ID");
                }
                vanneActive = result.vanneActive;
                let ouvertureVanne;
                let fermetureVanne;

                if (vanneActive === "vanneHum") {

                    new Gpio(24, 'in');
                    setTimeout(() => {
                    new Gpio(24, 'out');  
                    }, 40000);
                    ouvertureVanne = 23;
                    fermetureVanne = 22;
                    console.log("✅ SUCCÈS ==> gestions Air ==>", vanneActive);
                    resolve({ ouvertureVanne, fermetureVanne });

                } else if (vanneActive === "vanneSec") {

                    new Gpio(22, 'in');
                    setTimeout(() => {
                    new Gpio(22, 'out');  
                    }, 40000);
                    ouvertureVanne = 25;
                    fermetureVanne = 24;
                    console.log("✅ SUCCÈS ==> gestions Air ==>", vanneActive);
                    resolve({ ouvertureVanne, fermetureVanne });

                } else {
                    reject(console.log(`Unknown vanneActive value: ${vanneActive}`));
                    throw new Error(`Unknown vanneActive value: ${vanneActive}`);
                }
             
            })
            .catch(error => {
                console.error(
                    "? %c ERREUR ==> gestions Air ==> Récupération de l'étalonage",
                    'color: orange', error
                );
                reject(error);
            });
    });
}

//? --------------------------------------------------

//? Récupération de la consigne.

let consigne ;
let pas ;
let objectif ;

const gestionAirsDataModels = db.gestionAirData;

const recupérationDeLaConsigne = () => {
    return new Promise((resolve, reject) => {
        gestionAirsDataModels
            .findOne({
                attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxid']],
                raw: true,
            })
            .then(maxIdResult => {
                if (!maxIdResult) {
                    throw new Error("No max ID found");
                }
                return gestionAirsDataModels.findOne({ where: { id: maxIdResult.maxid } });
            })
            .then(result => {
                if (!result) {
                    throw new Error("No data found with max ID");
                }

                consigne = result.consigneAir;
                pas = result.pasAir;
                objectif = result.objectifAir;

                console.log("✅ SUCCÈS ==> gestions Air ==> Récupération de la Consigne Air =", consigne);
                console.log("✅ SUCCÈS ==> gestions Air ==> Récupération du Pas Air =", pas);
                console.log("✅ SUCCÈS ==> gestions Air ==> Récupération de l'Objectif Air =", objectif);

                resolve({ consigne, pas, objectif });
            })
            .catch(error => {
                console.error("❌ ERREUR ==> gestions Air ==> Récupération de la consigne", 'color: orange', error);
                reject(error);
            });
    });
}


//? --------------------------------------------------

//? Récupération de l'étalonage.

let etalonnage;

const gestionAirEtalonnageModels = db.etalonnageAir;

const recuperationDeEtalonage = () => {
    return new Promise((resolve, reject) => {
        gestionAirEtalonnageModels
            .findOne({
                attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxid']],
                raw: true,
            })
            .then(maxIdResult => {
                if (!maxIdResult) {
                    throw new Error("No max ID found");
                }
                return gestionAirEtalonnageModels.findOne({ where: { id: maxIdResult.maxid } });
            })
            .then(result => {
                if (!result) {
                    throw new Error("No data found with max ID");
                }

              etalonnage = result.etalonnageAir;

                console.log("✅ SUCCÈS ==> gestions Air ==> Récupération de l'étalonage =", etalonnage);

                resolve(etalonnage);
            })
            .catch(error => {
                console.error("❌ ERREUR ==> gestions Air ==> Récupération de l'étalonage", 'color: orange', error);
                reject(error);
            });
    });
}

//? --------------------------------------------------

//? Récupération de l'état de la vanne froid.

let etatVanneBDD;
let deltaAirPrecedent;

const gestionAirModels = db.gestionAir;

const recuperationEtatVanneFroid = () => {
    return new Promise((resolve, reject) => {
        gestionAirModels
            .findOne({
                attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxid']],
                raw: true,
            })
            .then(maxIdResult => {
                if (!maxIdResult) {
                    throw new Error("No max ID found");
                }
                return gestionAirModels.findOne({ where: { id: maxIdResult.maxid } });
            })
            .then(result => {
                if (!result) {
                    throw new Error("No data found with max ID");
                }

                const etatVanneBDD = result.etatRelay;
                const deltaAirPrecedent = result.deltaAir;

                console.log("✅ SUCCÈS ==> gestions Air ==> Récupération de l'état de la vanne froid =", etatVanneBDD);
                console.log("✅ SUCCÈS ==> gestions Air ==> Récupération du delta air =", deltaAirPrecedent);

                resolve({ etatVanneBDD, deltaAirPrecedent });
            })
            .catch(error => {
                console.error("❌ ERREUR ==> gestions Air ==> Récupération de l'état de la vanne froid", 'color: orange', error);
                reject(error);
            });
    });
}

//? --------------------------------------------------

//? Construction de la valeur de l'axe x.

let valeurAxeX;

const  axeX = () => { 
  return new Promise((resolve, reject) => { 
  
        fetch('http://localhost:3003/api/functionsRoutes/constructionAxeX/', {
          method: 'GET',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
             //console.log("DATA BRUTE : axeX =>",data);
             valeurAxeX = data.valeurAxeX;
             console.log("DATA BRUTE : valeurAxeX =>",valeurAxeX);
             resolve({valeurAxeX})
          })
          .catch(error => {
            reject( console.log(error))
            console.log(JSON.stringify(error));
          });
    
   }); 
 }  
 
//? --------------------------------------------------

//? Mesure de la température Air.

let mcpBroche = 2;
const mcpadc = require('mcp-spi-adc');

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
                            "✅ %c SUCCÈS ==> gestions Air ==> Mesure de la température Air",
                            'color: green', listValAir
                        );

                        if (listValAir.length >= 10) {
                            // console.log('listValAir.length >=10');
                            resolve()
                        }
                    });
                });

            };

            let conteur = setInterval(count, 1000);

        } catch (error) {

            console.log("❌ %c ERREUR ==> gestions Air ==> Mesure de la température Air",
                'color: orange', error);

            reject();

        }

    });
}


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

            const sumlistValAir = listValAir.reduce((accumulator, curr) => accumulator + curr, 0);
            temperatureMoyenneAir = Math.round((sumlistValAir / arrayLength) * 100) / 100;

            console.log(
                "✅ SUCCÈS ==> gestions Air ==> Temperature air moyenne ====================>",
                'color: green ', temperatureMoyenneAir
            );

            resolve(temperatureMoyenneAir);
        } catch (error) {
            console.error("❌ ERREUR ==> gestions Air ==> Temperature air moyenne", 'color: orange', error);
            reject(error);
        }
    });
}


//? --------------------------------------------------

//? Définition de la température air corrigée.

let temperatureCorrigee;

let definitionTemperatureAirCorrigee = () => {
    return new Promise((resolve, reject) => {

        try {

            temperatureCorrigee =
                parseFloat(temperatureMoyenneAir.toFixed(1)) + etalonnage;

            console.log(
                "✅ %c SUCCÈS ==> gestions Air ==> Définition de la température air corrigée ==>",
                'color: green', temperatureCorrigee
            );

            resolve();

        } catch (error) {

            console.log("❌ %c ERREUR ==> gestions Air ==> Définition de la température air corrigée",
                'color: orange', error);

            reject();

        }

    });
}

//? --------------------------------------------------

//? Définition du delta.

let delta;

let definitionDuDelta = () => {
    return new Promise((resolve, reject) => {

        try {

            delta = parseFloat((temperatureCorrigee - consigne).toFixed(1));

            console.log(
                "✅ %c SUCCÈS ==> gestions Air ==> Définition du delta ========================>",
                'color: green', delta
            );

            resolve();

        } catch (error) {

            console.log("❌ %c ERREUR ==> gestions Air ==> Définition du delta",
                'color: orange');

            reject();

        }

    });
}

//? --------------------------------------------------

//? Définition des actions.

let definitionDesActions = () => {
    return new Promise((resolve, reject) => {

        try {

            if (delta >= 3) {

                console.log(
                    "🔺 %c SUCCÈS ==> gestions Air ==> ALERTE, le delta est supérieur à 3°C");

                let temperatureDuMessage = 'le delta est supérieur à 3°C'

               // sendSMS(temperatureDuMessage);

                //! Condition à 15 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action ouverture ==> delta >= 3");

                let dureeAction = 15000;

                new Gpio(ouvertureVanne, 'out');

                // console.log('Ouverture du froid');

                if (etatVanneBDD >= 100) {
                    etatRelay = 100;
                } else {
                    etatRelay = 100;
                }

                actionRelay = 1;

                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(ouvertureVanne, 'in');

                    // console.log('FIN Ouverture du froid');

                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------

            } else if (delta > 1.5 && delta < 3) {

                //! Condition à 15 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action ouverture ==> delta > 1.5 && delta < 3");

                let dureeAction = 15000;

                new Gpio(ouvertureVanne, 'out');

                // console.log('Ouverture du froid');

                if (etatVanneBDD >= 100) {
                    etatRelay = 100;
                } else {
                    etatRelay = 100;
                }

                actionRelay = 1;

                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(ouvertureVanne, 'in');

                    // console.log('FIN Ouverture du froid');

                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------
                //
            } else if (delta > 1 && delta <= 1.5) {
                //
                //! Condition à 15 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action ouverture ==> delta > 1 && delta <= 1.5");

                let dureeAction = 5000;

                new Gpio(ouvertureVanne, 'out');

                if (etatVanneBDD >= 100) {
                    etatRelay = 100;
                } else {
                    etatRelay = etatVanneBDD + 37.5;
                }

                actionRelay = 1;
                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(ouvertureVanne, 'in');

                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------
                //
            } else if (delta > 0.5 && delta <= 1) {
                //
                //! Condition à 5 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action ouverture ==> delta > 0.5 && delta <= 1");


                let dureeAction = 2000;

                new Gpio(ouvertureVanne, 'out');

                if (etatVanneBDD >= 100) {
                    etatRelay = 100;
                } else {
                    etatRelay = etatVanneBDD + 12.5;
                }

                actionRelay = 1;
                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(ouvertureVanne, 'in');

                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------
                //
            } else if (delta > 0.3 && delta <= 0.5) {
                //
                //! Condition à 2 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action ouverture ==> delta > 0.3 && delta <= 0.5");

                let dureeAction = 1000;

                new Gpio(ouvertureVanne, 'out');

                if (etatVanneBDD >= 100) {
                    etatRelay = 100;
                } else {
                    etatRelay = etatVanneBDD + 5;
                }

                actionRelay = 1;
                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(ouvertureVanne, 'in');
                    // console.log('ouverture  du froid');
                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------
                //
            } else if (delta >= -0.3 && delta <= 0.3) {

                //***************************************************************

                //! Pas d'action car interval entre -0.3 et 0.3"

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action ouverture ==> delta >= -0.3 && delta <= 0.3");

                etatRelay = etatVanneBDD;
                actionRelay = 0;
                miseAjourEtatRelay(etatRelay, actionRelay);
                resolve();

                //***************************************************************

            } else if (delta < -0.3 && delta >= -0.5) {
                //
                //! Condition à 2 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action ouverture ==> delta < -0.3 && delta >= -0.5");

                let dureeAction = 1000;

                new Gpio(fermetureVanne, 'out');

                if (etatVanneBDD <= 0) {
                    etatRelay = 0;
                } else {
                    etatRelay = etatVanneBDD - 5;
                }

                actionRelay = 1;
                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(fermetureVanne, 'in');

                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------
                //
            } else if (delta < -0.5 && delta >= -1) {
                //
                //! Condition à 5 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action ouverture ==> delta < -0.5 && delta >= -1");

                let dureeAction = 2000;

                new Gpio(fermetureVanne, 'out');

                if (etatVanneBDD <= 0) {
                    etatRelay = 0;
                } else {
                    etatRelay = etatVanneBDD - 12.5;
                }

                actionRelay = 1;
                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(fermetureVanne, 'in');

                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------
                //
            } else if (delta < -1 && delta >= -1.5) {
                //
                //! Condition à 15 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action fermeture ==> delta < -1 && delta >= -1.5");

                let dureeAction = 5000;

                new Gpio(22, 'out');

                if (etatVanneBDD <= 0) {
                    etatRelay = 0;
                } else {
                    etatRelay = etatVanneBDD - 37.5;
                }

                actionRelay = 1;
                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(fermetureVanne, 'in');

                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------
                //
            } else if (delta < -1.5 && delta > -3) {
                //
                //! Condition à 5 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action fermeture ==> delta < -1.5 && delta < -3");

                let dureeAction = 15000;

                new Gpio(fermetureVanne, 'out');

                if (etatVanneBDD <= 0) {
                    etatRelay = 0;
                } else {
                    etatRelay = 0;
                }

                actionRelay = 1;
                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(fermetureVanne, 'in');

                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------
                //
            } else if (delta <= -3) {

                console.log(
                    "🔺 %c SUCCÈS ==> gestions Air ==> ALERTE, le delta est supérieur à -3°C");

                let temperatureDuMessage = 'le delta est inférieur à -3°C'

               // sendSMS(temperatureDuMessage);

                //! Condition à 5 secondes.

                console.log(
                    "⭐ %c SUCCÈS ==> gestions Air ==> Action fermeture ==> delta < -1.5");

                let dureeAction = 40000;

                new Gpio(fermetureVanne, 'out');

                if (etatVanneBDD <= 0) {
                    etatRelay = 0;
                } else {
                    etatRelay = 0;
                }

                actionRelay = 1;
                miseAjourEtatRelay(etatRelay, actionRelay);

                setTimeout(() => {
                    //
                    new Gpio(fermetureVanne, 'in');

                    actionRelay = 0;
                    miseAjourEtatRelay(etatRelay, actionRelay);
                    //
                    resolve();
                }, dureeAction);

                //! -----------------------------------------------

            }

        } catch (error) {
            // logger.info(
            //     'Fchier source : gestionAir | Module : Définition des actions | Type erreur : ',
            //     error
            // );

            console.log('🔴 Définition des actions :', error);

            reject();

        }


    })

}

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
                        "✅ %c SUCCÈS ==> gestions Air ==> Enregistrement des datas dans la base de données sous l'id :",
                        'color: green', result["dataValues"].id
                    );

                })

                .then(() => {

                    resolve();

                })

        } catch (error) {


            console.log("❌ %c ERREUR ==> gestions Air ==> Enregistrement des datas dans la base",
                'color: orange', error);

            reject();

        }

    });
}

//? --------------------------------------------------

//! Exécution des fonctions asynchrones.

let handleMyPromise = async () => {

    try {
        await recuperationDeLaVanneActive();
        await recupérationDeLaConsigne();
        await recuperationDeEtalonage();
        await recuperationEtatVanneFroid();
        await axeX();
        await getTemperatures();
        await calculeDeLaTemperatureMoyenne();
        await definitionTemperatureAirCorrigee();
        await definitionDuDelta();
        await definitionDesActions();
        await enregistrementDatas();
    }
    catch (err) {
        console.log('err finale :', err);
    }
};

handleMyPromise();

//! -------------------------------------------------- !
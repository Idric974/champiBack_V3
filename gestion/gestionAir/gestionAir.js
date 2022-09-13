//! Les constantes.

const Gpio = require('onoff').Gpio;
const jaune = '\x1b[33m';
const sequelize = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

//! -------------------------------------------------- !

// ! Les fonctions appelées

//? Mise à jour de l'état des relay.

let etatRelay;

let miseAjourEtatRelay = () => {
    gestionAirModels
        .findOne({
            attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'maxid']],
            raw: true,
        })
        .then((id) => {
            // console.log('Le dernier id de gestionAir est : ', id);
            // console.log(id.maxid);
            lastId = id.maxid;

            gestionAirModels
                .update(
                    { actionRelay: actionRelay, etatRelay: etatRelay },
                    { where: { id: lastId } }
                )

                .then(function (result) {
                    // console.log('Nb mise à jour data =======> ' + result);
                })

                .catch((err) => console.log(err));
        });
};

//? --------------------------------------------------

//! --------------------------------------------------

//! Les fonctions asynchrones.

//? Récupération de la consigne.

const gestionAirsDataModels = db.gestionAirData;

let recupérationDeLaConsigne = () => {
    return new Promise((resolve, reject) => {

        try {
            gestionAirsDataModels
                .findOne({
                    attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxid']],
                    raw: true,
                })
                .then((id) => {
                    // console.log(id.maxid);

                    gestionAirsDataModels
                        .findOne({
                            where: { id: id.maxid },
                        })
                        .then((result) => {
                            // console.log(result);

                            lastId = result['id'];
                            // console.log('LastId :   ', lastId);

                            consigne = result['consigneAir'];

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Récupération de la Consigne Air ==> ",
                                'color: green', consigne
                            );

                            pas = result['pasAir'];

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Récupération du Pas Air ==========> ",
                                'color: green', pas
                            );

                            objectif = result['objectifAir'];

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Récupération de l'Objectif Air ===> ",
                                'color: green', objectif
                            );
                        })
                        .then(() => {

                            resolve();

                        });
                });
        } catch (error) {

            console.log('❌ %c ERREUR ==> gestions Air ==> Récupération de la consigne',
                'color: orange', error);

            reject();
        }

    });
}

//? --------------------------------------------------

//? Récupération de l'étalonage.

const gestionAirEtalonnageModels = db.etalonnageAir;

let recuperationDeEtalonage = () => {
    return new Promise((resolve, reject) => {

        try {
            gestionAirEtalonnageModels
                .findOne({
                    attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxid']],
                    raw: true,
                })
                .then((id) => {
                    // console.log(id.maxid);

                    gestionAirEtalonnageModels
                        .findOne({
                            where: { id: id.maxid },
                        })
                        .then((result) => {
                            // console.log(result);

                            etalonnage = result['etalonnageAir'];

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Récupération de l'étalonage",
                                'color: green', etalonnage
                            );
                        })
                        .then(() => {

                            resolve();

                        });
                });
        } catch (error) {

            console.log("❌ %c ERREUR ==> gestions Air ==> Récupération de l'étalonage",
                'color: orange', error);

            reject();
        }

    });
}

//? --------------------------------------------------

//? Récupération de l'état de la vanne froid.

const gestionAirModels = db.gestionAir;

let recuperationEtatVanneFroid = () => {
    return new Promise((resolve, reject) => {

        try {
            gestionAirModels
                .findOne({
                    attributes: [[sequelize.fn('max', sequelize.col('id')), 'maxid']],
                    raw: true,
                })
                .then((id) => {
                    // console.log(id.maxid);

                    gestionAirModels
                        .findOne({
                            where: { id: id.maxid },
                        })
                        .then((result) => {
                            // console.log(result);

                            etatVanneBDD = result['etatRelay'];

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Récupération de l'état de la vanne froid",
                                'color: green', etatVanneBDD
                            );

                        }).then(() => {

                            resolve();

                        });
                });

        } catch (error) {

            console.log("❌ %c ERREUR ==> gestions Air ==> Récupération de l'état de la vanne froid",
                'color: orange', error);

            reject();
        }

    });
}

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
                    attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'maxid']],
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

                            dateDemarrageCycle = result['dateDemarrageCycle'];

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe X",
                                'color: green', dateDemarrageCycle
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

                                    dateDemarrageCycle = new Date(result['dateDemarrageCycle']);

                                    console.log(
                                        "✅ %c SUCCÈS ==> gestions Air ==> Date de démarrage du cycle ===>",
                                        'color: green', dateDemarrageCycle
                                    );

                                    //* --------------------------------------------------

                                    //* Date du jour.

                                    dateDuJour = new Date();

                                    console.log(
                                        "✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe X ===> Date du jour",
                                        'color: green', dateDuJour
                                    );

                                    //* --------------------------------------------------

                                    //* Calcul du nombre de jour du cycle.

                                    let nbJourBrut = dateDuJour.getTime() - dateDemarrageCycle.getTime();
                                    jourDuCycle = Math.round(nbJourBrut / (1000 * 3600 * 24)) + 1;

                                    console.log(
                                        "✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe X ===> Calcul du nombre de jour du cycle",
                                        'color: green', jourDuCycle
                                    );

                                    //* --------------------------------------------------

                                    //* Affichage de l'heure.
                                    heureDuCycle = new Date().getHours();
                                    minuteDuCycle = new Date().getMinutes();
                                    heureMinute = heureDuCycle + 'h' + minuteDuCycle;

                                    console.log(
                                        "✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe x ===> Affichage de l'heure",
                                        'color: green', heureMinute
                                    );

                                    //* --------------------------------------------------

                                    //* Valeure de l'axe x.
                                    valeurAxeX = 'Jour ' + jourDuCycle + ' - ' + heureMinute;

                                    console.log(
                                        "✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe x ===> Valeure de l'axe X",
                                        'color: green', valeurAxeX
                                    );

                                    //* --------------------------------------------------

                                })

                        })

                        .then(() => {

                            resolve();

                        });
                });

        } catch (error) {

            console.log("❌ %c ERREUR ==> gestions Air ==> Construction de la valeur de l'axe X",
                'color: orange', error);

            reject();

        }

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

let calculeDeLaTemperatureMoyenne = () => {
    return new Promise((resolve, reject) => {

        try {

            let arrayLength = listValAir.length
            // console.log('Nb valeurs de listValAir :', arrayLength);

            const reducer = (accumulator, curr) => accumulator + curr;
            let sumlistValAir = listValAir.reduce(reducer)
            // console.log('Somme valeurs listValAir : ', sumlistValAir);

            temperatureMoyenneAir = Math.round((sumlistValAir / arrayLength) * 100) / 100;

            console.log(
                "✅ %c SUCCÈS ==> gestions Air ==> Temperature air moyenne",
                'color: green ', temperatureMoyenneAir
            );

            resolve();

        } catch (error) {

            console.log("❌ %c ERREUR ==> gestions Air ==> Temperature air moyenne",
                'color: orange', error);

            reject();

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
                "✅ %c SUCCÈS ==> gestions Air ==> Définition de la température air corrigée ===> ",
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

// let delta;
let delta = -0.2;

let definitionDuDelta = () => {
    return new Promise((resolve, reject) => {

        try {

            delta = parseFloat((temperatureCorrigee - consigne).toFixed(1));

            console.log(
                "✅ %c SUCCÈS ==> gestions Air ==> Définition du delta ===> ",
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

            //! Delta >= 1.5.

            if (delta >= 1.5) {

                console.log(
                    "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta >= 1.5",
                    'color: green'
                );

                //* Actions.

                let ouvertureVanne = () => {
                    return new Promise((resolve, reject) => {
                        if (delta) {

                            new Gpio(23, 'out');

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta >= 1.5 | Début ouverture du froid",
                                'color: green'
                            );

                            actionRelay = 1;
                            etatRelay = etatRelay;
                            miseAjourEtatRelay();

                            resolve();

                        } else {

                            console.log("❌ %c ERREUR =====> Definition des actions delta >= 1.5 | Début ouverture du froid",
                                'color: orange');

                            reject();
                        }
                    });
                }


                let arretOvertureVanne = () => {
                    return new Promise((resolve, reject) => {
                        if (delta) {
                            //
                            let preconisation = 40000;

                            setTimeout(() => {
                                //
                                const relay_23_OFF = new Gpio(23, 'in');
                                console.log(
                                    "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta >= 1.5 | Fin ouverture du froid",
                                    'color: green'
                                );

                                actionRelay = 0;
                                etatRelay = 100;
                                miseAjourEtatRelay();

                                resolve();
                                //
                            }, preconisation);

                        } else {

                            console.log("❌ %c ERREUR =====> Definition des actions delta >= 1.5 | Fin ouverture du froid",
                                'color: orange');

                            reject();
                        }
                    });
                }

                let resolveAction = async () => {

                    console.log(
                        "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta >= 1.5 | Fin des actions",
                        'color: green'
                    );

                    resolve();

                }

                //* --------------------------------------------------

                //* Resolve des promises. 

                let handleMyPromise = async () => {

                    try {

                        await ouvertureVanne();
                        await arretOvertureVanne();
                        await resolveAction();

                    }
                    catch (err) {
                        console.log('🔺 Erreur :', err);
                    }
                };

                handleMyPromise();

                //* --------------------------------------------------

            } else if (delta === 0) {

                //! Delta = 0.

                console.log(
                    "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta === 0",
                    'color: green'
                );

                //* Actions.
                let fermetureTotalVanne40 = () => {
                    return new Promise((resolve, reject) => {
                        if (delta === 0) {
                            //
                            const relay_23_OFF = new Gpio(23, 'in');

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta === 0 | Lancement fermeture total de la vanne.",
                                'color: green'
                            );

                            actionRelay = 1;
                            etatRelay = etatRelay;
                            miseAjourEtatRelay();

                            resolve();

                        } else {

                            console.log("❌ %c ERREUR =====> Definition des actions delta === 0 | Lancement fermeture total de la vanne.",
                                'color: orange');

                            reject();
                        }
                    });
                }


                let fermetureTotalVanne40Stop = () => {
                    return new Promise((resolve, reject) => {
                        if (delta === 0) {

                            setTimeout(() => {
                                new Gpio(23, 'out');

                                console.log(
                                    "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta === 0 | Arrêt fermeture total de la vanne.",
                                    'color: green'
                                );

                                actionRelay = 0;
                                etatRelay = 0;
                                miseAjourEtatRelay();

                                resolve();

                            }, 40000);

                        } else {

                            console.log("❌ %c ERREUR =====> Definition des actions delta === 0 | Arrêt fermeture total de la vanne.",
                                'color: orange');

                            reject();
                        }
                    });
                }

                let ouvertureVanne15 = () => {
                    return new Promise((resolve, reject) => {
                        if (delta === 0) {

                            new Gpio(23, 'out');

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta === 0 | Lancement ouverture de la vanne pour 15 secondes.",
                                'color: green'
                            );

                            actionRelay = 1;
                            etatRelay = etatRelay;
                            miseAjourEtatRelay();

                            resolve();

                        } else {

                            console.log("❌ %c ERREUR =====> Definition des actions delta === 0 | Lancement ouverture de la vanne pour 15 secondes.",
                                'color: orange');

                            reject();
                        }
                    });
                }

                let ouvertureVanne15Stop = () => {
                    return new Promise((resolve, reject) => {
                        if (delta === 0) {

                            setTimeout(() => {
                                new Gpio(23, 'out');

                                console.log(
                                    "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta === 0 | Arrêt ouverture de la vanne pour 15 secondes.",
                                    'color: green'
                                );

                                actionRelay = 0;
                                etatRelay = 37, 5;
                                miseAjourEtatRelay();

                                resolve();
                            }, 15000);

                        } else {

                            console.log("❌ %c ERREUR =====> Definition des actions delta === 0 | Arrêt ouverture de la vanne pour 15 secondes",
                                'color: orange');

                            reject();
                        }
                    });
                }

                let resolveAction = async () => {

                    console.log(
                        "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta === 0 | Fin des actions.",
                        'color: green'
                    );

                    resolve();

                }

                //* --------------------------------------------------

                //* Resolve des promises. 

                let handleMyPromise = async () => {

                    try {
                        await fermetureTotalVanne40();
                        await fermetureTotalVanne40Stop();
                        await ouvertureVanne15();
                        await ouvertureVanne15Stop();
                        await resolveAction();
                    }
                    catch (err) {
                        console.log('🔺 Erreur :', err);
                    }
                };

                handleMyPromise();

                //* --------------------------------------------------


            } else if (delta <= -0.3) {

                //! Delta <= -0.3

                console.log(
                    "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta <= -0.3",
                    'color: green'
                );

                //* Actions.

                let fermetureVanne = () => {
                    return new Promise((resolve, reject) => {
                        if (delta) {

                            new Gpio(23, 'in');

                            console.log(
                                "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta <= -0.3 | Début fermeture du froid",
                                'color: green'
                            );

                            actionRelay = 1;
                            etatRelay = etatRelay;
                            miseAjourEtatRelay();

                            resolve();

                        } else {

                            console.log("❌ %c ERREUR =====> Definition des actions delta <= -0.3 | Début fermeture du froid",
                                'color: orange');

                            reject();
                        }
                    });
                }


                let arretFermetureVanne = () => {
                    return new Promise((resolve, reject) => {
                        if (delta) {
                            //
                            let preconisation = 40000;

                            setTimeout(() => {
                                //
                                const relay_23_OFF = new Gpio(23, 'out');
                                console.log(
                                    "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta <= -0.3 | Fin fermeture du froid",
                                    'color: green'
                                );

                                actionRelay = 0;
                                etatRelay = 0;
                                miseAjourEtatRelay();

                                resolve();
                                //
                            }, preconisation);

                        } else {

                            console.log("❌ %c ERREUR =====> Definition des actions delta <= -0.3 | Fin fermeture du froid",
                                'color: orange');

                            reject();
                        }
                    });
                }

                let resolveAction = async () => {

                    console.log(
                        "✅ %c SUCCÈS ==> gestions Air ==> Definition des actions delta >= -0.3 | Fin des actions",
                        'color: green'
                    );

                    resolve();

                }

                //* --------------------------------------------------

                //* Resolve des promises. 

                let handleMyPromise = async () => {

                    try {

                        await fermetureVanne();
                        await arretFermetureVanne();
                        await resolveAction();

                    }
                    catch (err) {
                        console.log('🔺 Erreur :', err);
                    }
                };

                handleMyPromise();

                //* --------------------------------------------------

            } else if (delta > -0.3 && delta < 1.5) {

                //! Delta delta > -0.3 && delta < 1.5.

                console.log('delta > -0.3 && delta < 1.5');

            }

            //? --------------------------------------------------

        } catch (error) {

            console.log("❌ %c ERREUR ==> gestions Air ==> Définition des actions",
                'color: orange', error);

            reject();

        }

    });
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


//! -------------------------------------------------- !

//! Exécution des fonctions asynchrones.

let handleMyPromise = async () => {

    try {

        await recupérationDeLaConsigne();

        await recuperationDeEtalonage();

        await recuperationEtatVanneFroid();

        await constructionAxeX();

        await getTemperatures();

        await calculeDeLaTemperatureMoyenne();

        await definitionTemperatureAirCorrigee();

        // await definitionDuDelta();

        await definitionDesActions();

        await enregistrementDatas();

    }
    catch (err) {
        console.log('err finale :', err);
    }
};

handleMyPromise();

//! -------------------------------------------------- !

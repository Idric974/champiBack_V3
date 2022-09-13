const mcpadc = require('mcp-spi-adc');
const sequelize = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../../models');
const gestionAirModels = db.gestionAir;



//? Mesure de la température du substrat.

let mcpBroche = 2;

let getTemperatures = () => {
    return new Promise((resolve) => {

        let temps = 0;

        let count = () => {
            temps = temps++;

            //console.log(temps++);

            if (temps++ === 9) {
                clearInterval(conteur);

                setTimeout(() => {
                    resolve()
                }, 1500);

            }

            // console.log(jaune, '[ GESTION SUBSTRAT CALCULES  ] temps', temps);

            const tempSensor = mcpadc.open(mcpBroche, { speedHz: 20000 }, (err) => {
                if (err) throw err;

                tempSensor.read((err, reading) => {
                    if (err) throw err;
                    listValAir.push(reading.value * 40);
                    // console.log(jaune, '[ GESTION AIR CALCULES  ] listValAir', listValAir);
                });
            });

        };

        let conteur = setInterval(count, 1000);

    });
}

//? --------------------------------------------------

//? Calcule de la température moyenne.

let listValAir = [];
let temperatureMoyenneAir;

let calculeDeLaTemperatureMoyenne = () => {
    return new Promise((resolve, reject) => {
        if (listValAir.length > 0) {

            let arrayLength = listValAir.length
            // console.log('Nb valeurs de listValAir :', arrayLength);

            const reducer = (accumulator, curr) => accumulator + curr;
            let sumlistValAir = listValAir.reduce(reducer)
            // console.log('Somme valeurs listValAir : ', sumlistValAir);

            temperatureMoyenneAir = Math.round((sumlistValAir / arrayLength) * 100) / 100;

            console.log('Temperature Air moyenne : ', temperatureMoyenneAir);



            resolve();

        } else {

            console.log('ERREUR : Test calcule De La Temperature Air Moyenne');

            reject();
        }
    });
}

//? --------------------------------------------------

//? Enregistrement des datas dans la base.

let enregistrementTemperature = () => {
    return new Promise((resolve, reject) => {

        gestionAirModels
            .create({
                temperatureSubstrat: temperatureSubstratMoyenne,
                actionRelay: actionRelay,
                etatRelay: etatRelay,
                valeurAxeX: valeurAxeX,
                jourDuCycle: jourDuCycle,
            })

            .then(function (result) {

                console.log(
                    'Enregistrement des datas dans la base =======> ' + result
                );

                resolve();
            })

            .catch((error) => {

                console.log(
                    jaune,
                    '[ GESTION SUBSTRAT CALCULES  ] Erreur dans le processus d’enregistrement',
                    error
                );

                reject();
            });

    });
}

//? --------------------------------------------------


//! Resolve promise. 

let handleMyPromise = async () => {

    try {

        await getTemperatures();

        await calculeDeLaTemperatureMoyenne();

        await enregistrementTemperature();

    }
    catch (err) {
        console.log('err finale :', err);
    }
};

handleMyPromise();
const db = require('../models');
const Sequelize = require('sequelize');

const gestionCourbesModels = db.gestionCourbes;

let constructionAxeX = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const maxIdResult = await gestionCourbesModels.findOne({
                attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'maxid']],
                raw: true,
            });

            const result = await gestionCourbesModels.findOne({
                where: { id: maxIdResult.maxid },
            });

            const dateDemarrageCycle = new Date(result.dateDemarrageCycle);
            const dateDuJour = new Date();
            const nbJourBrut = dateDuJour.getTime() - dateDemarrageCycle.getTime();
            const jourDuCycle = Math.round(nbJourBrut / (1000 * 3600 * 24));

            const heureDuCycle = dateDuJour.getHours();
            const minuteDuCycle = dateDuJour.getMinutes();

            // Fonction pour formater les heures et minutes
            const formatTime = (unit) => (unit < 10 ? '0' : '') + unit;
            const heureMinute = `${formatTime(heureDuCycle)}h${formatTime(minuteDuCycle)}`;

            const valeurAxeX = `Jour ${jourDuCycle} - ${heureMinute}`;

            console.log("✅ %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe X", 'color: green', valeurAxeX);

            resolve(valeurAxeX);
        } catch (error) {
            console.log("❌ %c ERREUR ==> gestions Air ==> Construction de la valeur de l'axe X", 'color: orange', error);
            reject(error);
        }
    });
};

// Appel de la fonction et gestion de la promesse
constructionAxeX()
    .then((valeurAxeX) => {
        console.log("Valeur de l'axe X:", valeurAxeX);
    })
    .catch((error) => {
        console.error("Erreur lors de la construction de l'axe X:", error);
    });

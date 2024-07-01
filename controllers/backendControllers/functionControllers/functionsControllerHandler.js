const Sequelize = require('sequelize');
const db = require('../../../models');

//? Construction de la valeur de l'axe x.

const gestionCourbesModels = db.gestionCourbes;

exports.constructionAxeX = async (req, res) => {

  try {
    // Combinez les requêtes pour récupérer maxid et dateDemarrageCycle en une seule requête
    const maxIdResult = await gestionCourbesModels.findOne({
      attributes: [
        [Sequelize.fn('max', Sequelize.col('id')), 'maxid'],
        'dateDemarrageCycle'
      ],
      order: [[Sequelize.fn('max', Sequelize.col('id')), 'DESC']],
      raw: true,
    });

    if (!maxIdResult) {
      return res.status(404).json({ error: "Aucune donnée trouvée" });
    }

    const dateDemarrageCycle = new Date(maxIdResult.dateDemarrageCycle);
    const dateDuJour = new Date();

    const nbJourBrut = dateDuJour.getTime() - dateDemarrageCycle.getTime();
    const jourDuCycle = Math.floor(nbJourBrut / (1000 * 3600 * 24));

    const heureDuCycle = dateDuJour.getHours();
    const minuteDuCycle = dateDuJour.getMinutes();

    const formatTime = (unit) => (unit < 10 ? '0' : '') + unit;
    const heureMinute = `${formatTime(heureDuCycle)}h${formatTime(minuteDuCycle)}`;

    const valeurAxeX = `Jour ${jourDuCycle} - ${heureMinute}`;

    console.log("? %c SUCCÈS ==> gestions Air ==> Construction de la valeur de l'axe X", 'color: green', valeurAxeX);

    res.status(200).json({ valeurAxeX });
  } catch (error) {
    console.log("? %c ERREUR ==> gestions Air ==> Construction de la valeur de l'axe X", 'color: orange', error);
    res.status(500).json({ error: "Erreur lors de la construction de la valeur de l'axe X" });
  }
}

//? --------------------------------------------------

//? Mise à jour de l'état des relay.

const majEtatRelaydata = db.gestionAir;

exports.majEtatRelay = async (req, res) => {

let etatRelay = req.body.etatRelay;
let actionRelay = req.body.actionRelay;

  let lastId;
  majEtatRelaydata
        .findOne({
            attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'maxid']],
            raw: true,
        })
        .then((id) => {
            //console.log('Le dernier id de gestionAir est : ', id);
            // console.log(id.maxid);
            lastId = id.maxid;

            majEtatRelaydata
                .update(
                    { actionRelay: actionRelay, etatRelay: etatRelay },
                    { where: { id: lastId } }
                )

                .then(function (result) {
                   console.log('Nb mise à jour data =======> ' + result);
                   res.status(200).json({ Message : result });
                })

                .catch((err) => console.log(err));
        });

}
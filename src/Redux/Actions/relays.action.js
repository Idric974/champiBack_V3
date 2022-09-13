import axios from 'axios';
export const EAU_AU_SOL = 'EAU_AU_SOL';

//! Logique pour la création d'un posts.

export const eauAuSol = (data) => {

  return async (dispatch) => {
    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:3000/api/relays/ActivationEauAuSol`, data
      });

      dispatch({ type: EAU_AU_SOL, payload: data });

      console.log(
        '✅ %c SUCCÈS ==> relays.action ==> Clic sur un bouton activation eau au sol',
        'color: green',
        res
      );

    } catch (err) {
      return console.log('❌ %c ERREUR ==> relays.action ==> Clic sur un bouton activation eau au sol',
        'color: orange', err);
    }
  };
};

//! -------------------------------------------------




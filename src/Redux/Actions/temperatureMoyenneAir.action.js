
export const TEMPERATURE_MOYENNE_AIR = 'TEMPERATURE_MOYENNE_AIR';

//! Logique pour la création d'un posts.

export const temperatureMoyenneAir = (state) => {
  // console.log('createPost data :', data);
  return async (dispatch) => {
    try {

      dispatch({ type: TEMPERATURE_MOYENNE_AIR, payload: state });

      console.log(
        '✅ %c temperatureMoyenneAir.action ==> Tempèrature moyenne Air',
        'color: green',
        state
      );

    } catch (err) {
      return console.log(err);
    }
  };
};

//! -------------------------------------------------


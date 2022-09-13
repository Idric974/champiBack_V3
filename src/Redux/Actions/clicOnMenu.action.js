
export const CLIC_ON_MENU = 'CLIC_ON_MENU';

//! Logique pour la création d'un posts.

export const clicOnMenu = (state) => {
  // console.log('createPost data :', data);
  return async (dispatch) => {
    try {

      dispatch({ type: CLIC_ON_MENU, payload: state });

      // console.log(
      //   '✅ %c clicOnMenu.action ==> Clic sur un bouton menu',
      //   'color: green',
      //   state
      // );

    } catch (err) {
      return console.log(err);
    }
  };
};

//! -------------------------------------------------


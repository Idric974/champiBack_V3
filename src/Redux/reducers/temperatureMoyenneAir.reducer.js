import {
  CLIC_ON_MENU,
} from '../Actions/temperatureMoyenneAir.action';

const initialState = {};

export default function temperatureMoyenneAirReducer(state = initialState, action) {
  switch (action.type) {

    case CLIC_ON_MENU:
      return action.payload;

    default:
      return state;
  }
}

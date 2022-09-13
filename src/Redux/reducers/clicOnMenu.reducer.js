import {
  CLIC_ON_MENU,
} from '../Actions/clicOnMenu.action';

const initialState = {};

export default function clicOnMenuReducer(state = initialState, action) {
  switch (action.type) {

    case CLIC_ON_MENU:
      return action.payload;

    default:
      return state;
  }
}

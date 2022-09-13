import {
  EAU_AU_SOL,
} from '../Actions/relays.action';

const initialState = {};

export default function relaysReducer(state = initialState, action) {
  switch (action.type) {

    case EAU_AU_SOL:
      return action.payload;

    default:
      return state;
  }
}

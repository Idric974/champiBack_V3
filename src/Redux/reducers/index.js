import { combineReducers } from 'redux';
import clicOnMenu from './clicOnMenu.reducer';
import temperatureMoyenneAir from './temperatureMoyenneAir.reducer';
import relays from './relays.reducer';


export default combineReducers({
  clicOnMenu,
  temperatureMoyenneAir,
  relays
});

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import event from './modules/event';

export default combineReducers({
  form: formReducer,
  event
});

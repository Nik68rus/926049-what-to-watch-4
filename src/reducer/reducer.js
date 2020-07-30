import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as appliccation} from './application/application';

import NameSpace from './name-space';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APPLICATION]: appliccation,
});

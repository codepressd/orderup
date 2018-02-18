import * as Redux from 'redux';

import { RouterReducer } from './RouterReducer';
import { AuthUserReducer } from './UserReducer';

export default Redux.combineReducers({
    RouterReducer,
    AuthUserReducer
});
import { LOCATION_CHANGE, LOCATION_CHANGE_TAB } from '../actions/RouterActions';

const intialState = {
    pathname: '/',
    search: '',
    queries: {},
    hash: '',
    state: { tab: '' }
}

export const RouterReducer = (state: any = intialState, action: any) => {
    switch (action.type) {
        // This is used for routes without a tab.
        case LOCATION_CHANGE:
            return {
                ...state,
                ...action.payload
            };
        //This is used for routes with a tab. Eventually I would like to have no tabs
        case LOCATION_CHANGE_TAB:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
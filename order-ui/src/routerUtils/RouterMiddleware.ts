import { PUSH, REPLACE, GO, GO_BACK, GO_FORWARD } from '../actions/RouterActions';

// This is catches all our actions and does a history push that our RouterListener watches for 
// and then dispatchs a location change action to update the state.

export const RouterMiddleware = (history: any) => () => (next: any) =>

    (action: any) => {
        switch (action.type) {
            case PUSH:
                history.push(action.payload, action.state);
                break;
            case REPLACE:
                history.replace(action.payload);
                break;
            case GO:
                history.go(action.payload);
                break;
            case GO_BACK:
                history.goBack();
                break;
            case GO_FORWARD:
                history.goForward();
                break;
            default:
                return next(action);
        }
    };

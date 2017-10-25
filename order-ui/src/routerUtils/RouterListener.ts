import { locationChange, locationChangeTab } from '../actions/RouterActions';

// listens for any route change through out the whole app
export const beginListener = (history: any, store: any) => {
    store.dispatch(
        locationChange(
            history.location.pathname,
            history.location.search,
            history.location.hash,
        ));
    history.listen((location: any) => {
        if (!location.state) {
            store.dispatch(
                locationChange(
                    location.pathname,
                    location.search,
                    location.hash
                ));
        } else {
            store.dispatch(
                locationChangeTab(
                    location.pathname,
                    location.search,
                    location.hash,
                    location.state
                ));
        }
    });
};
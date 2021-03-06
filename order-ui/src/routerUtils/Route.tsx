import * as React from 'react';
import * as ReactRedux from 'react-redux';

import { matchRoute } from './RouteMatching';

interface BrowserRouteProps {

    component: any;
    route?: any;
    path?: string;
    exact?: boolean;
    render?: (obj: object) => JSX.Element;
}
// This is a very simple route match which really need to take more time to make more robust

class BrowserRoute extends React.Component<BrowserRouteProps, {}>{

    render() {

        const {
            route,
            component,
            path,
            exact,
            render,
        } = this.props;
        // Check for matching route need to figure out route matching
        let match: any = matchRoute(route, { path, exact });

        if (!match) {
            return null;
        }
        // This is no good and needs more time to solve. But would take some time digging in to our routePattern
        if (component) {
            return (React.cloneElement(component, { ...this.props }));

        }
        if (render) {
            return render({ match });
        }
        return null;
    }

    constructor(props: BrowserRouteProps) {
        super(props);
    }

}
const mapStateToProps = (state: any) => ({
    route: state.Router
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => {
    return { ...ownProps, ...stateProps, ...dispatchProps };
};

const Route = ReactRedux.connect(mapStateToProps, {}, mergeProps)(BrowserRoute);

export default Route;

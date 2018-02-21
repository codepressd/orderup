import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';

import { Column } from '../../Layout/Column';
import { Row } from '../../Layout/Row';
import BackendWrap from './BackendWrap';
import FrontendWrap from './FrontendWrap';
import * as RouterActions from '../../../actions/RouterActions';

interface AppWrapProps {
    classes: any;
    user?: any;
    children?: any;
}

const styles = (theme: Theme) => ({
    contentWrap: {
        marginTop: '64px',
        width: '100%',
        background: 'rgb(249,249,249)',
    }

});

class AppWrap_ extends React.Component<AppWrapProps & WithStyles<keyof typeof styles>, never>{

    constructor(props: AppWrapProps) {
        super(props);
    }

    render() {
        const userLoggedIn = this.props.user.user;
        console.log(this.props.user);
        // const { classes } = this.props;
        if (userLoggedIn) {
            return (
                <Column
                    className="backend-app-wrap"
                >
                    <Row>
                        <BackendWrap {...this.props} />
                    </Row>
                </Column>
            );

        } else {
            return (
                <Column
                    className="frontend-app-wrap"
                >
                    <FrontendWrap {...this.props} />
                    {/*React.cloneElement(this.props.children, this.props)*/}
                </Column>
            );
        }
    }
}
const mapStateToProps = (state: any) => ({
    user: state.User,
});

const mapDispatchToProps = (dispatch: any) => ({
    changeLocation: Redux.bindActionCreators(RouterActions.push, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => {
    return { ...ownProps, ...stateProps, ...dispatchProps };
};
export const AppWrap = ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(withStyles(styles)(AppWrap_));

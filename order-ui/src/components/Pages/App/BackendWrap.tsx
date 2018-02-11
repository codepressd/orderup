import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import { withStyles, WithStyles, Theme } from 'material-ui/styles';

import * as RouterActions from "../../../actions/RouterActions";
import { Column } from "../../Layout/Column";
import { Row } from "../../Layout/Row";
import TopBar from '../Backend/TopBar';
import SideBar from '../Backend/Sidebar';


interface BackendWrapProps {
    classes: any;
    children?: JSX.Element | JSX.Element[];
}

const styles = (theme: Theme) => ({
    appWrap: {
        width: "100%",
    },
    contentWrap: {
        width: "100%",
        background: "rgb(243,243,243)",
    }

});

export class _BackendWrap extends React.Component<BackendWrapProps & WithStyles<keyof typeof styles>, never>{
    constructor(props: BackendWrapProps) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.appWrap}>
                <TopBar classes={{}} />
                <Row>
                    <SideBar classes={{}} />
                    <Column className={classes.contentWrap}>
                        {this.props.children}
                    </Column>
                </Row>
            </div>
        )
    }
}
const BackendWrap = withStyles(styles)(_BackendWrap);
const mapStateToProps = (state: any) => ({
    state: state.Activeuser,
});

const mapDispatchToProps = (dispatch: any) => ({
    changeLocation: Redux.bindActionCreators(RouterActions.push, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => {
    return { ...ownProps, ...stateProps, ...dispatchProps };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(BackendWrap);
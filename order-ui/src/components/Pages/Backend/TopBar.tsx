import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import { withStyles, WithStyles } from 'material-ui/styles';

import * as RouterActions from '../../../actions/RouterActions';
import { Row } from '../../Layout/Row';

interface TopBarProps {
    children?: any;
    classes: any;
}

const styles = (theme: any) => ({
    topBar: {
        height: '72px',
        background: '#fff',
        boxShadow: '0 0 5px 0 rgba(0,0,0, .32)',
        width: '100%',
        top: 0,
    }

});

export class TopBars extends React.Component<TopBarProps & WithStyles<'topBar'>, never>{
    constructor(props: TopBarProps) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Row
                className={classes.topBar}
                style={{
                    position: 'fixed', // This has to be here due to a types issue
                }}
            >
            </Row>
        )
    }
}

const TopBar = withStyles(styles)(TopBars);

const mapStateToProps = (state: any) => ({
    state: state.Activeuser,
});

const mapDispatchToProps = (dispatch: any) => ({
    changeLocation: Redux.bindActionCreators(RouterActions.push, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => {
    return { ...ownProps, ...stateProps, ...dispatchProps };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(TopBar);
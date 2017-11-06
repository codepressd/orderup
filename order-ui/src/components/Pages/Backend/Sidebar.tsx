
import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import { withStyles, WithStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Shop from 'material-ui-icons/ShoppingBasket';
import Orders from 'material-ui-icons/AccountBalance';
import Overview from 'material-ui-icons/BubbleChart';
import Tooltip from 'material-ui/Tooltip';


import { Column } from '../../Layout/Column';
import * as RouterActions from "../../../actions/RouterActions";


interface SideBarProps {
    children?: any;
    classes: any;
}

const styles = (theme: any) => ({
    sidebar: {
        width: "64px",
        background: '#fff',
        boxShadow: '0 0 5px 0 rgba(0,0,0, .32)',
        height: '100vh',

    },
    sidebarWrap: {
        top: '72px',
        width: '64px',

    },
    iconWrap: {
        width: '100%',

    },
    iconWrapActive: {
        width: '100%',
        borderRight: '2px solid #ea7b38',
        '& svg': {
            fill: '#ea7b38',
        }
    }
});

export class SideBars extends React.Component<SideBarProps & WithStyles<'sidebar'>, never>{
    constructor(props: SideBarProps) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Column
                className={classes.sidebar}
                style={{
                    alignItems: 'center', // to make types happy.
                    order: -1,
                }}
            >
                <Column
                    className={classes.sidebarWrap}
                    style={{
                        alignItems: 'center',
                        position: 'absolute',
                    }}
                >
                    <div className={classes.iconWrap}>
                        <Tooltip id='tooltip-overview' title='Overview' placement='right'>
                            <IconButton>
                                <Overview />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.iconWrapActive}>
                        <Tooltip id='tooltip-shop' title='Shop' placement='right'>
                            <IconButton>
                                <Shop />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.iconWrap}>
                        <Tooltip id='tooltip-orders' title='Orders' placement='right'>
                            <IconButton>
                                <Orders />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Column>
            </Column>
        )
    }
}

const SideBar = withStyles(styles)(SideBars);

const mapStateToProps = (state: any) => ({
    state: state.Activeuser,
});

const mapDispatchToProps = (dispatch: any) => ({
    changeLocation: Redux.bindActionCreators(RouterActions.push, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => {
    return { ...ownProps, ...stateProps, ...dispatchProps };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(SideBar);
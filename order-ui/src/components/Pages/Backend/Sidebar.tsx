
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Shop from 'material-ui-icons/ShoppingBasket';
import Orders from 'material-ui-icons/AccountBalance';
import Overview from 'material-ui-icons/ViewQuilt';


import { Column } from '../../Layout/Column';
import * as RouterActions from "../../../actions/RouterActions";


interface SideBarProps {
    children?: any;
    classes: any;
    changeLocation?: (location: string) => void;
    route?: any;
}

const styles = (theme: Theme) => ({
    sidebar: {
        width: "88px",
        background: '#fff',
        boxShadow: '0 0 5px 0 rgba(0,0,0, .32)',
        height: '100vh',
        zIndex: 10,

    },
    sidebarWrap: {
        top: '72px',
        width: '88px',
        fontSize: '11px',
        lineHeight: 0,

    },
    iconWrap: {
        width: '100%',
        marginTop: '4px',
        '& p': {
            marginTop: 0,
            color: '#a5a5a5',
            fontFamily: theme.typography.fontFamily,
        },
        '& svg': {
            fill: '#a5a5a5'
        }

    },
    iconWrapActive: {
        extend: "iconWrap",
        '& p': {
            color: '#ea7b38',
        },
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
                    <Column className={this.props.route.pathname === "/dashboard" ? classes.iconWrapActive : classes.iconWrap}>
                        <ButtonBase
                            centerRipple
                            onClick={this.pushLocation("dashboard")}
                            style={{
                                flexDirection: "column"
                            }}
                        >
                            <Overview />
                            <p>Dashboard</p>
                        </ButtonBase>
                    </Column>
                    <Column className={this.props.route.pathname === "/shop" ? classes.iconWrapActive : classes.iconWrap}>
                        <ButtonBase
                            centerRipple
                            onClick={this.pushLocation("shop")}
                            style={{
                                flexDirection: "column"
                            }}
                        >
                            <Shop />
                            <p>Shop</p>
                        </ButtonBase>
                    </Column>
                    <Column className={this.props.route.pathname === "/orders" ? classes.iconWrapActive : classes.iconWrap}>
                        <ButtonBase
                            centerRipple
                            onClick={this.pushLocation("orders")}
                            style={{
                                flexDirection: "column"
                            }}
                        >
                            <Orders />
                            <p>Orders</p>
                        </ButtonBase>
                    </Column>
                </Column>
            </Column >
        )
    }
    pushLocation = (location: string) => (event: any) => {
        this.props.changeLocation && this.props.changeLocation(location)
    }
}

const SideBar = withStyles(styles)(SideBars);

const mapStateToProps = (store: any) => ({
    route: store.RouterReducer,
});

const mapDispatchToProps = (dispatch: any) => ({
    changeLocation: Redux.bindActionCreators(RouterActions.push, dispatch),
});

const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => {
    return { ...ownProps, ...stateProps, ...dispatchProps };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(SideBar);
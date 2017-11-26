import { } from "material-ui";
import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import { withStyles, WithStyles, Theme } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Avatar from 'material-ui/Avatar';
import ButtonBase from 'material-ui/ButtonBase';
import Bubbles from 'material-ui-icons/BubbleChart';
import Person from 'material-ui-icons/Person';
import Search from 'material-ui-icons/Search';
import Favorite from 'material-ui-icons/FavoriteBorder';

import * as RouterActions from "../../../actions/RouterActions";
import { Row } from '../../Layout/Row';
import { Column } from '../../Layout/Column';

interface TopBarProps {
    classes: any;
    changeLocation?: (location: string) => void;
}

const styles = (theme: Theme) => ({
    topBar: {
        height: '64px',
        background: '#fff',
        boxShadow: '0 0 5px 0 rgba(0,0,0, .32)',
        width: '100%',
        top: 0,
        position: 'fixed',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: theme.typography.fontFamily,
    },
    logoWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 10px',
    },
    bubbleColor: {
        fill: "#ea7b38",
        width: '32px',
        height: '32px',
    },
    rightWrap: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fromControl: {
        "& > div": {
            marginTop: "0px",
        }
    },
    searchWrap: {
        width: '40%',
        marginLeft: 184,
    },
    searchBarInput: {
        borderRadius: '4%',
        color: "#a5a5a5",
        paddingRight: '5px',
        paddingLeft: '5px',
        width: '100%',
        fontFamily: theme.typography.fontFamily,
        "&:before": {
            backgroundColor: '#ea7b38 !important',
        },
        "&:after": {
            backgroundColor: 'rgb(104, 47, 112)',
        }
    },
    userWrap: {
        alignItems: 'center',
        width: '40%',
        justifyContent: 'flex-end',
    },
    user: {
        fontSize: '12px',
        paddingRight: "16px",
    },
    avatarWrap: {
        paddingLeft: '16px',
        position: 'relative',
        borderLeft: '1px solid #a5a5a5',
    },
    favWrap: {
        marginTop: '8px',
        padding: '0 10px',
        '& p': {
            marginTop: 0,
            color: '#a5a5a5',
            fontFamily: theme.typography.fontFamily,
        },
        '& svg': {
            fill: '#a5a5a5',
        }

    },
    indicator: {
        background: 'rgb(104, 47, 112)',
        width: '15px',
        height: '15px',
        fontSize: '10px',
        position: 'absolute',
        top: '25px',
        right: 0,

    },
    biggerIcon: {
        width: '34px',
        height: '34px',
        fill: '#a5a5a5'
    },
    midIcon: {
        extend: "biggerIcon",
        width: '30px',
        height: '30px',
    }

}) as React.CSSProperties;

export class TopBars extends React.Component<TopBarProps & WithStyles<keyof typeof styles>, never>{
    constructor(props: TopBarProps) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Column>
                <Row
                    className={classes.topBar}
                >
                    <Column
                        className={classes.logoWrap}
                    >
                        <Bubbles className={classes.bubbleColor} />
                        orderUp
                    </Column>
                    <Row className={classes.rightWrap}>
                        <Column
                            className={classes.searchWrap}
                        >
                            <FormControl
                                className={classes.formControl}
                            >
                                <Input
                                    placeholder="Search"
                                    className={classes.searchBarInput}
                                    endAdornment={<InputAdornment position="end"><Search /></InputAdornment>}
                                >
                                </Input>
                            </FormControl>
                        </Column>
                        <Row className={classes.userWrap}>

                            <Column
                                className={classes.user}
                            >
                                Hello, Chris
                                </Column>
                            <Column
                                className={classes.avatarWrap}
                            >
                                <ButtonBase
                                    centerRipple
                                    onClick={this.pushLocation("/Profile")}
                                >
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                    <Avatar
                                        className={classes.indicator}
                                    >
                                        1
                                    </Avatar>
                                </ButtonBase>
                            </Column>
                            <Column className={classes.favWrap}>
                                <ButtonBase
                                    centerRipple
                                    style={{
                                        flexDirection: "column"
                                    }}
                                >
                                    <Favorite className={classes.biggerIcon} />
                                    <p>Favorites</p>
                                </ButtonBase>
                            </Column>

                        </Row>
                    </Row>
                </Row>
            </Column>
        )
    }
    pushLocation = (location: string) => (event: any) => {
        this.props.changeLocation && this.props.changeLocation(location)
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
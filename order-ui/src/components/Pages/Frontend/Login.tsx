import * as React from 'react';
// import * as ReactRedux from 'react-redux';
// import * as Redux from 'redux';
import Axios from 'axios';
import Bubbles from 'material-ui-icons/BubbleChart';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';

import { Column } from '../../Layout/Column';
import { Row } from '../../Layout/Row';
//import * as RouterActions from '../../../actions/RouterActions';

interface LoginProps {
    classes: any;
    children?: any;
}

const styles = (theme: Theme) => ({
    loginWrap: {
        height: '100vh',
        width: '80%',
        margin: '0 auto',
    },
    centerWrap: {
        height: '80%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logoWrap: {
        width: '80px',
        alignItems: 'center',
        color: 'rgb(104, 47, 112)',
        fontSize: '20px'
    },
    columnWraps: {
        width: '40%',
        padding: '5px',
        height: '236px',
        color: 'rgb(104, 47, 112)'
    },
    columnWrapLeft: {
        extend: 'columnWraps',
        fontSize: "50px",
        "& input": {
            display: 'block',
            margin: '20px auto',
            width: '90%',
            height: '30px',
            fontSize: '20px',
            border: {
                radius: '4px',
                width: '1px',
                style: 'solid',
                color: 'rgb(240,240,240)'
            },
            "&:focus": {
                outline: 'none'
            }

        },
        "& button": {
            float: 'right',
            background: 'rgb(104, 47, 112)',
            fontSize: '20px',
            padding: '8px',
            width: '100px',
            marginRight: '4%',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 800ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            "&:hover": {
                background: 'rgba(231,111,49, 0.9)',
            }
        }
    },
    columnWrapRight: {
        extend: 'columnWraps',
        background: 'rgb(249,249,249)',
        textAlign: 'left',
        padding: '30px',
        justifyContent: 'space-between',
        "& span": {
            fontSize: '35px',
        },
        "& p": {
            fontSize: '18px',
        },
        "& button": {
            background: 'transparent',
            border: '1px solid rgb(104, 47, 112)',
            fontSize: '20px',
            padding: '8px',
            width: '150px',
            marginRight: '4%',
            borderRadius: '4px',
            color: 'rgb(104, 47, 112)',
            cursor: 'pointer',
            transition: 'all 800ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            "&:hover": {
                background: 'rgb(104, 47, 112)',
                color: '#fff',
            }
        }

    },
    bubbleColor: {
        fill: '#ea7b38',
        width: '50px',
        height: '50px',
    },

} as React.CSSProperties);

class Login_ extends React.Component<LoginProps & WithStyles<keyof typeof styles>, never>{
    constructor(props: LoginProps) {
        super(props);
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            "email": e.currentTarget["email"].value,
            "password": e.currentTarget["password"].value
        }
        Axios.post("api/user/login", data)
            .then((res: any) => {
                console.log("this worked", JSON.parse(res.data.body));
            })
            .catch((error: any) => {
                console.log("this errored", error);
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <Column className={classes.loginWrap}>
                <Column className={classes.logoWrap}>
                    <Bubbles className={classes.bubbleColor} />
                    <div>OrderUp</div>
                </Column>
                <Row className={classes.centerWrap}>
                    <Column className={classes.columnWrapLeft}>
                        <span>Login</span>
                        <form onSubmit={this.handleSubmit}>
                            <input placeholder="Email" name="email" required />
                            <input placeholder="Password" name="password" type="password" required />
                            <button type="submit">Login</button>
                        </form>
                    </Column>
                    <Column className={classes.columnWrapRight}>
                        <span>Need more info?</span>
                        <p>This is where I will says some cool shit to get people to sign up for our product</p>
                        <p>Now get signed up!</p>
                        <Row>
                            <button type="submit">Learn More</button>
                            <button type="submit">Sign Up</button>
                        </Row>
                    </Column>
                </Row>
            </Column>
        )
    }
}

export const Login = withStyles(styles)(Login_);

// const mapStateToProps = (state: any) => ({
//     state: state.Activeuser,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     changeLocation: Redux.bindActionCreators(RouterActions.push, dispatch),
// });

// const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => {
//     return { ...ownProps, ...stateProps, ...dispatchProps };
// };

// export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login);
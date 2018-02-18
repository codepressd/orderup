import * as React from 'react';
// import * as ReactRedux from 'react-redux';
// import * as Redux from 'redux';
import Axios from 'axios';
import Bubbles from 'material-ui-icons/BubbleChart';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';

import { Column } from '../../Layout/Column';
import { Row } from '../../Layout/Row';
//import * as RouterActions from '../../../actions/RouterActions';

interface SignupProps {
    classes: any;
    children?: any;
}

const styles = (theme: Theme) => ({
    signupWrap: {
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
        width: "80px",
        alignItems: "center",
        color: "rgb(104, 47, 112)",
        fontSize: "20px"
    },
    columnWraps: {
        width: '40%',
        padding: '5px',
        height: '236px',
        color: "rgb(104, 47, 112)"
    },
    columnWrapLeft: {
        extend: 'columnWraps',
        fontSize: "45px",
        height: '350px',
        "& input": {
            display: "block",
            margin: "20px auto",
            width: "90%",
            height: "30px",
            color: '#858585',
            paddingLeft: "8px",
            fontSize: "20px",
            fontFamily: "Montserrat",
            border: {
                radius: "4px",
                width: "1px",
                style: "solid",
                color: "rgb(240,240,240)"
            },
            "&:focus": {
                outline: 'none'
            },
            "&:placeholder": {
                color: '#858585',
            }

        },
        "& select": {
            display: 'block',
            margin: '20px auto',
            width: '92%',
            height: '35px',
            color: '#858585',
            fontSize: '20px',
            background: "transparent",
            fontFamily: "Montserrat",
            border: {
                radius: '4px',
                width: '1px',
                style: 'solid',
                color: 'rgb(240,240,240)'
            },
            "&:focus": {
                outline: 'none'
            },
            "&:placeholder": {
                color: '#858585',
            }
        },
        "& button": {
            float: "right",
            background: "rgb(104, 47, 112)",
            fontSize: "20px",
            padding: "8px",
            width: "100px",
            marginRight: "4%",
            borderRadius: "4px",
            color: "#fff",
            cursor: "pointer",
            transition: "all 800ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
            outline: "none",
            "&:hover": {
                background: "rgba(231,111,49, 0.9)",
            }
        }
    },
    columnWrapRight: {
        extend: 'columnWraps',
        background: "rgb(249,249,249)",
        textAlign: "left",
        padding: "30px",
        justifyContent: "space-between",
        height: '230px',
        "& span": {
            fontSize: '35px',
        },
        "& p": {
            fontSize: '18px',
        },
        "& button": {
            background: "transparent",
            border: "1px solid rgb(104, 47, 112)",
            fontSize: "20px",
            padding: "8px",
            width: "150px",
            marginRight: "4%",
            borderRadius: "4px",
            color: "rgb(104, 47, 112)",
            cursor: "pointer",
            transition: "all 800ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
            outline: "none",
            "&:hover": {
                background: "rgb(104, 47, 112)",
                color: "#fff",
            }
        }

    },
    bubbleColor: {
        fill: '#ea7b38',
        width: '50px',
        height: '50px',
    },

} as React.CSSProperties);

class Signup_ extends React.Component<SignupProps & WithStyles<keyof typeof styles>, never>{
    constructor(props: SignupProps) {
        super(props);
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = {
            "email": e.currentTarget["email"].value,
            "password": e.currentTarget["password"].value,
            "confirmPassword": e.currentTarget["confirmPassword"].value,
            "role": e.currentTarget["role"].value
        }
        const newData = JSON.stringify(data);
        console.log(newData, data);
        Axios.post("api/user/signup", data)
            .then((res: any) => {
                console.log("this worked", res.data);
            })
            .catch((error: any) => {
                console.log("this errored", error.response.data.msg);
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <Column className={classes.signupWrap}>
                <Column className={classes.logoWrap}>
                    <Bubbles className={classes.bubbleColor} />
                    <div>OrderUp</div>
                </Column>
                <Row className={classes.centerWrap}>
                    <Column className={classes.columnWrapLeft}>
                        <span>Sign up</span>
                        <form onSubmit={this.handleSubmit}>
                            <input placeholder="Email" name="email" required />
                            <input placeholder="Password" name="password" type="password" required />
                            <input placeholder="Confirm Password" name="confirmPassword" type="password" required />
                            <select name="role">
                                <option value="restaurant">Restaurant</option>
                                <option value="supplier">Supplier</option>
                                <option value="supplier-restaurant">Supplier and Restaurant</option>
                            </select>
                            <button type="submit">Sign up</button>
                        </form>
                    </Column>
                    <Column className={classes.columnWrapRight}>
                        <span>Order Effortlessly!</span>
                        <p>Easily order from all your different suppliers, all at once, so you can get back to doing what you love.</p>

                        <Row style={{
                            justifyContent: 'flex-end'
                        }}>
                            <button type="submit">Learn More</button>
                        </Row>
                    </Column>
                </Row>
            </Column>
        )
    }
}

export const Signup = withStyles(styles)(Signup_);

// const mapStateToProps = (state: any) => ({
//     state: state.Activeuser,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     changeLocation: Redux.bindActionCreators(RouterActions.push, dispatch),
// });

// const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => {
//     return { ...ownProps, ...stateProps, ...dispatchProps };
// };

// export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Signup);
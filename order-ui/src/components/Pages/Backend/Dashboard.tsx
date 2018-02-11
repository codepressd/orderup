import * as React from 'react';
import Axios from 'axios';
import Paper from 'material-ui/Paper';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';


import { Row } from '../../Layout/Row';
import { Column } from '../../Layout/Column';

interface DashBoardProps {
    classes: any;
    activeUser?: string;
}

const styles = (theme: Theme) => ({
    dashWrap: {
        padding: '5px',
    },
    columnWraps: {
        width: '100%',
        padding: '5px'
    }

});

class DashBoard_ extends React.Component<DashBoardProps & WithStyles<keyof typeof styles>, never>{

    constructor(props: DashBoardProps) {
        super(props)
    }

    componentDidMount() {
        Axios.get("/api")
            .then((res: any) => {
                console.log("this worked", res.data);
            })
            .catch((error: any) => {
                console.log("this errored", error);
            });

    }

    render() {
        const { classes } = this.props;
        return (
            <Row
                className={classes.dashWrap}
            >
                <Column
                    className={classes.columnWraps}
                >
                    <Paper>
                        <h2>Main DashBoard</h2>
                    </Paper>
                </Column>
                <Column
                    className={classes.columnWraps}
                >
                    <Paper>
                        <h2>Main 2 DashBoard</h2>
                    </Paper>
                </Column>
            </Row>
        )
    }
}

export const DashBoard = withStyles(styles)(DashBoard_);
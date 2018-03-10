import * as React from 'react';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';

import { Column } from '../../Layout/Column';
import { Row } from '../../Layout/Row';
import { RaisedSection } from '../../Layout/RaisedSection';
import { recentActivity } from '../../../FakeData';

interface OrdersProps {
    classes: any;
    activeUser?: string;
}

const styles: React.CSSProperties = (theme: Theme) => ({
    backgroundWrap: {
        height: `calc(100vh - 64px)`,
        background: "#fff"
    },
    leftColumnWrap: {
        width: "70%",
        borderRight: "1px solid #e6e6e6"

    },
    rightColumnWrap: {
        width: "30%"
    }
});

class Orders_ extends React.Component<OrdersProps & WithStyles<keyof typeof styles>, never>{
    constructor(props: OrdersProps) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        return (
            <Row className={classes.backgroundWrap}>
                <Column className={classes.leftColumnWrap}>
                </Column>
                <Column className={classes.rightColumnWrap}>
                    <RaisedSection
                        classes={{}}
                        width="100%"
                        data={recentActivity}
                        title="Recent Orders"
                    //selects={["Week", "Month"]}
                    />
                    <RaisedSection
                        classes={{}}
                        width="100%"
                        data={recentActivity}
                        title="Largest Orders"
                    //selects={["Week", "Month"]}
                    />
                </Column>
            </Row>
        )
    }
}

export const Orders = withStyles(styles)(Orders_);
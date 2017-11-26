
import * as React from "react";
import Paper from 'material-ui/Paper';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';
import Person from 'material-ui-icons/Person';

import { recentMessages, recentActivity } from '../../../FakeData';
import { Row } from '../../Layout/Row';
import { Column } from '../../Layout/Column';
import { RaisedSection } from "../../Layout/RaisedSection"

interface ProfileProps {
    classes: any;
}

const styles = (theme: Theme) => ({
    outerWrap: {
        margin: "16px",
        fontFamily: theme.typography.fontFamily,
        textAlign: "left",
    },
    wrap: {
        width: "100%",
        justifyContent: "space-between",

    },
    mainTitle: {
        textAlign: "left",
        fontSize: "16px",
        padding: "0px 0px 16px 0px",
        color: "rgb(104, 47, 112)",
        fontFamily: theme.typography.fontFamily,

    },
    avatarWrap: {
        width: 150,
        height: 150,
        margin: 10,
        border: "1px solid #a5a5a5",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        color: "#a5a5a5"
    },
    bottomWrap: {
        marginTop: "10px",
        justifyContent: "space-between"
    },

} as React.CSSProperties);

class _Profile extends React.Component<ProfileProps & WithStyles<keyof typeof styles>, never>{
    render() {
        const { classes } = this.props;
        return (
            <Column
                className={classes.outerWrap}
            >
                <div
                    className={classes.mainTitle}
                >
                    User Profile
                </div>
                <Paper>
                    <Row
                        className={classes.wrap}
                    >
                        <Row>
                            <Column
                                className={classes.avatarWrap}
                            >
                                <Person
                                    className={classes.avatar}
                                />
                            </Column>
                            <Column>
                                Persons name
                            </Column>
                        </Row>
                        <Column>
                            Quick facts
                    </Column>

                    </Row>
                </Paper>
                <Row
                    className={classes.bottomWrap}
                >
                    <RaisedSection
                        classes={{}}
                        width="48%"
                        data={recentActivity}
                        title="Recent Activity"
                        selects={["Week", "Month"]}
                    />
                    <RaisedSection
                        classes={{}}
                        width="48%"
                        data={recentMessages}
                        title="Messages"
                        selects={["Week", "Month"]}
                    />
                </Row>
            </Column>
        )
    }
}

export const Profile = withStyles(styles)(_Profile);
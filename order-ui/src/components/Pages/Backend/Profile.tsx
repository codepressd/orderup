
import * as React from "react";
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';
import Person from 'material-ui-icons/Person';

import { recentMessages, recentActivity } from '../../../FakeData';
import { Row } from '../../Layout/Row';
import { Column } from '../../Layout/Column';
import { RaisedSection } from "../../Layout/RaisedSection"

interface ProfileProps {
    classes: any;
};

interface ProfileState {
    userEdit: boolean;
    businessEdit: boolean;
};

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
        border: "1px dashed #a5a5a5",
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
    profileArea: {
        position: "relative",
        width: "48%",
        padding: 8,
        textAlign: "left"
    },
    editButtonWrap: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    editButton: {
        fontSize: "14px",
        textTransform: "capitalize"
    },
    userWrap: {
        margin: "10px 5px",

    },
    userName: {
        fontWeight: 600,
        fontSize: "18px"
    },
    businessWrap: {
        margin: "10px 5px",

    },

} as React.CSSProperties);

class _Profile extends React.Component<ProfileProps & WithStyles<keyof typeof styles>, ProfileState>{

    constructor(props: ProfileProps) {
        super(props)
        this.state = {
            userEdit: true,
            businessEdit: true,
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Column
                className={classes.outerWrap}
            >
                <Paper>
                    <Row
                        className={classes.wrap}
                    >
                        <Row
                            className={classes.profileArea}
                        >
                            <Column
                                className={classes.avatarWrap}
                            >
                                <Person
                                    className={classes.avatar}
                                />
                            </Column>
                            <Column
                                className={classes.userWrap}
                            >
                                <div
                                    className={classes.userName}
                                >
                                    Chris Reeder
                                </div>
                                <FormControl>
                                    <Input placeholder="General Manager" disableUnderline={this.state.userEdit} disabled={this.state.userEdit} />
                                    <Input placeholder="chrsi@gmail.com" disableUnderline={this.state.userEdit} disabled={this.state.userEdit} />
                                    <Input placeholder="530-444-8888" disableUnderline={this.state.userEdit} disabled={this.state.userEdit} />
                                </FormControl>

                                <div
                                    className={classes.editButtonWrap}
                                >
                                    <Button
                                        onClick={this.onEditClick("user")}
                                        className={classes.editButton}
                                    >
                                        {this.state.userEdit ? "Edit" : "Save"}
                                    </Button>
                                </div>
                            </Column>
                        </Row>
                        <Column
                            className={`${classes.profileArea} ${classes.businessWrap}`}
                        >
                            Business Info
                            <FormControl>
                                <Input placeholder="Cool Biz Name" disableUnderline={this.state.businessEdit} disabled={this.state.businessEdit} />
                                <Input placeholder="123 Somestreet" disableUnderline={this.state.businessEdit} disabled={this.state.businessEdit} />
                                <Input placeholder="Portland, Oregon" disableUnderline={this.state.businessEdit} disabled={this.state.businessEdit} />

                            </FormControl>
                            <div
                                className={classes.editButtonWrap}
                            >
                                <Button
                                    onClick={this.onEditClick("business")}
                                    className={classes.editButton}
                                >
                                    Edit
                            </Button>
                            </div>
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

    };
    onEditClick = (edit: string) => (event: any) => {
        if (edit === "user") {
            this.setState({
                userEdit: !this.state.userEdit
            });
        } else {
            this.setState({
                businessEdit: !this.state.businessEdit
            })
        }
    }
}

export const Profile = withStyles(styles)(_Profile);
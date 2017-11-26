import * as React from "react";
import Paper from 'material-ui/Paper';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import MailOutline from 'material-ui-icons/MailOutline';
import Avatar from 'material-ui/Avatar';

import { Row } from './Row';
import { Column } from './Column';

interface RaisedSectionProps {
    classes: any;
    width: string;
    data: any[];
    title?: string;
    selects?: string[];
}

interface RaisedSectionState {
    isActive: string;
}

const styles = (theme: Theme) => ({
    bottomProfile: {
        padding: "5px",
        height: "400px",
        fontFamily: theme.typography.fontFamily

    },
    sectionTitle: {
        color: "#727272",
        fontWeight: 600,
        padding: 5,
        justifyContent: "space-between",
    },
    half: {
        width: "50%"
    },
    spaceRight: {
        marginRight: 15,
    },
    select: {
        cursor: "pointer",
        "&:hover": {
            color: "rgb(104, 47, 112)",
            borderBottom: "2px solid rgb(104, 47, 112)"
        }
    },
    selectActive: {
        extend: "select",
        color: "rgb(104, 47, 112)",
        borderBottom: "2px solid rgb(104, 47, 112)"
    },
    listWrap: {
        overflowY: "auto",
        height: "90%"
    }
} as React.CSSProperties);

class _RaisedSection extends React.Component<RaisedSectionProps & WithStyles<keyof typeof styles>, RaisedSectionState>{

    constructor(props: RaisedSectionProps) {
        super(props);
        this.state = {
            isActive: this.props.selects ? this.props.selects[0] : "",
        };
    }

    handleSelectClick = (active: string) => (event: any) => {
        this.setState({
            isActive: active
        });
    }

    render() {
        const { classes } = this.props
        return (
            <Paper
                className={classes.bottomProfile}
                style={{
                    width: this.props.width,
                    overflow: "hidden",
                }}
            >
                <Row
                    className={classes.sectionTitle}
                >
                    <Column
                        className={classes.half}
                    >
                        {this.props.title && this.props.title}
                    </Column>
                    {this.props.selects &&
                        <Row
                            className={classes.half}
                            style={{
                                justifyContent: "flex-end"
                            }}
                        >
                            <Column
                                className={`${classes.spaceRight} ${this.state.isActive === this.props.selects[0] ? classes.selectActive : classes.select}`}
                                onClick={this.handleSelectClick(this.props.selects[0])}
                            >
                                {this.props.selects[0]}
                            </Column>
                            <Column
                                className={this.state.isActive === this.props.selects[1] ? classes.selectActive : classes.select}
                                onClick={this.handleSelectClick(this.props.selects[1])}
                            >
                                {this.props.selects[1]}
                            </Column>
                        </Row>
                    }
                </Row>
                <Column
                    className={classes.listWrap}
                >
                    <List>
                        {this.props.data.map((oneData) => {

                            return <ListItem button>
                                <Avatar>
                                    <MailOutline />
                                </Avatar>
                                <ListItemText primary={oneData.primary} secondary={oneData.secondary} />
                            </ListItem>

                        })}

                    </List>
                </Column>
            </Paper>
        )
    }
}
export const RaisedSection = withStyles(styles)(_RaisedSection);
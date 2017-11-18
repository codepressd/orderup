import * as React from 'react';
import { withStyles, WithStyles, Theme } from 'material-ui/styles';
import { Column } from '../../Layout/Column';
import { Row } from '../../Layout/Row';
import BackendWrap from './BackendWrap';

interface AppWrapProps {
    classes: any;
    activeUser?: string;
    children?: any;
}

const styles = (theme: Theme) => ({
    contentWrap: {
        marginTop: "72px",
    }

});

class _AppWrap extends React.Component<AppWrapProps & WithStyles<keyof typeof styles>, never>{

    constructor(props: AppWrapProps) {
        super(props);
    }

    render() {
        const userLoggedIn = true;
        const { classes } = this.props;
        if (userLoggedIn) {
            return (
                <Column
                    className="backend-app-wrap"
                >
                    <Row>
                        <BackendWrap {...this.props} />
                        <div className={classes.contentWrap}>
                            {this.props.children}
                        </div>
                    </Row>
                </Column>
            )

        } else {
            return (
                <Column
                    className="frontend-app-wrap"
                >
                    Frontend
                    {/*React.cloneElement(this.props.children, this.props)*/}
                </Column>
            )
        }
    }
}
export const AppWrap = withStyles(styles)(_AppWrap);
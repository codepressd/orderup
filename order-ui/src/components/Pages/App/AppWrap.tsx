import * as React from 'react';
import { Column } from '../../Layout/Column';

interface AppWrapProps {
    activeUser?: string;
    children?: any;
}

export class AppWrap extends React.Component<AppWrapProps, never>{

    constructor(props: AppWrapProps) {
        super(props);
    }

    render() {
        const userLoggedIn = true;
        if (userLoggedIn) {
            return (
                <Column
                    className="backend-app-wrap"
                >
                    <Column>
                        Backend
                        {/*React.cloneElement(this.props.children, this.props)*/}
                    </Column>
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
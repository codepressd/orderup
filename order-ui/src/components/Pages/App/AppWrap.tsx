import * as React from 'react';
import { Column } from '../../Layout/Column';
import BackendWrap from './BackendWrap';

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
                        <BackendWrap {...this.props} />
                        <div className='contentWrap'>
                        </div>
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
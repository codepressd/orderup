import * as React from 'react';

interface DashBoardProps {
    activeUser?: string;
}

export class DashBoard extends React.Component<DashBoardProps, never>{
    constructor(props: DashBoardProps) {
        super(props)
    }

    render() {
        return (
            <div>Dashboard Area</div>
        )
    }
}
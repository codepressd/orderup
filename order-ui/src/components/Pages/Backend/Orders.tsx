import * as React from 'react';

interface OrdersProps {
    activeUser?: string;
}

export class Orders extends React.Component<OrdersProps, never>{
    constructor(props: OrdersProps) {
        super(props)
    }

    render() {
        return (
            <div>Orders Area</div>
        )
    }
}
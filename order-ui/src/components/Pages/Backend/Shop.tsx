import * as React from 'react';

interface ShopProps {
    activeUser?: string;
}

export class Shop extends React.Component<ShopProps, never>{
    constructor(props: ShopProps) {
        super(props)
    }

    render() {
        return (
            <div>Shop Area</div>
        )
    }
}
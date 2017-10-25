import * as React from "react";

interface ColumnProps {
    children?: React.ReactNode;
    flex?: string; // added for convenience
    id?: string;
    onClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    style?: React.CSSProperties;
    className?: string;
}
export function Column(props: ColumnProps) {

    let style: React.CSSProperties = props.style || {};
    style.display = "flex";
    style.flexDirection = "column";

    if (props.flex) {
        style.flex = props.flex;
    }

    return (
        <div
            id={props.id}
            className={props.className}
            style={style}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    );
}
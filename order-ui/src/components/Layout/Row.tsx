import * as React from "react";

interface RowProps {
    children?: React.ReactNode;
    className?: string;
    flex?: string; // convenience
    style?: React.CSSProperties;
    id?: string;
    onClick?: () => void;
}
export function Row(props: RowProps) {

    let style: React.CSSProperties = props.style || {};
    style.display = "flex";
    style.flexDirection = "row";

    if (props.flex) {
        style.flex = props.flex;
    }

    return (
        <div className={props.className} id={props.id} style={style} onClick={props.onClick}>
            {props.children}
        </div>
    );
}
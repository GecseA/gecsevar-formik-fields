import React from 'react';
import {GVTextField} from "./GVTextField";

type ButtonProps = {
    children : JSX.Element
}
export function MyButton(props: ButtonProps) {
    const {
        children,
        ...elementProps
    } = props;
    return <button type="button" {...elementProps}>{children}</button>
}


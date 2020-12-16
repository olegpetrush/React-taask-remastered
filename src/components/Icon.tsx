import React from "react";

interface props{
    icon: string;
    className?:string
}

const Icon = (props) => {
    return(<><div className={`glyph d-inline ${props.icon} ${props.className}`} /></>);
}

export default Icon;
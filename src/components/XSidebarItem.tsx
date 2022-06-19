import React from 'react';
import "../styles/components/_xsidebaritem.scss";

interface XSidebarItemProps {
    label: string;
    onClick: any;
    active: boolean;
};

const XSidebarItem = (props: XSidebarItemProps) => {
    return (
        <div className={`sidebar-item ${props.active && "active"}`} onClick={props.onClick}>
            <p>{props.label}</p>
        </div>
    );
};

export default XSidebarItem;
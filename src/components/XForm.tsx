import React from 'react';

interface XFormProps {
    children: React.ReactNode;
    style?: any;
};

const XForm = (props: XFormProps) => {
    return (
        <form style={props.style}>
            {props.children}
        </form>
    );
};

export default XForm;
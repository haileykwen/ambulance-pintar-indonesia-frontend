import XWrapper from "./XWrapper";
import React from "react";
import "../styles/components/_xselect.scss";

interface XSelectProps {
    value?: string;
    onChange?: any;
    maxWidth?: number;
    options: any;
    [x: string]: any;
};

const XSelect = (props: XSelectProps) => {
    const { maxWidth, ...spread } = props;

    return (
        <XWrapper>
            <select
                {...spread}
                className="xselect"
                style={{ ...props.style }}
                onChange={props.onChange}
                value={props.value}
            >
                <option>-- Pilih</option>
                {props.options.map((option: any, index: any) => {
                    return (
                        <option key={index} value={option.id}>{option.name}</option>
                    );
                })}
            </select>
        </XWrapper>
    );
};

export default XSelect;
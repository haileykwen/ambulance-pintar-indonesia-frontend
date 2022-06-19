import React from 'react';
import { IC_DANGER } from '../assets/icons';
import XGap from './XGap';
import XImage from './XImage';
import XWrapper from './XWrapper';
import "../styles/components/_xalert.scss";

interface XAlertProps {
    type: "danger" | "success";
    message: string;
    maxWidth?: number;
    [x: string]: any;
};

interface StyleSheet {
    [key: string]: React.CSSProperties;
};

const XAlert = (props: XAlertProps) => {
    const styles: StyleSheet = {
        alert: {
            display: "flex",
            alignItems: "center",
            width: `min(100%, ${props.maxWidth ? props.maxWidth+"px" : "100%"})`
        }
    };

    const { maxWidth, ...spread } = props;

    return (
        <XWrapper 
            {...spread}
            type={props.type}
            className="xalert"
            style={styles.alert}
        >
            {props.type === "danger" && <XImage src={IC_DANGER} height={20} width={20} />}
            <XGap width={5} />
            {props.message}
        </XWrapper>
    );
};

export default XAlert;
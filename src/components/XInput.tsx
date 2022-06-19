import { IMG_EYE_SLASH_SOLID, IMG_EYE_SOLID } from "../assets/images";
import XWrapper from "./XWrapper";
import React from "react";
import XImage from "./XImage";
import "../styles/components/_xinput.scss";

interface XInputProps {
    placeholder?: string;
    type?: string | "text";
    notAutoComplete?: boolean;
    credential?: true | false;
    value?: string;
    onChange?: any;
    maxWidth?: number;
    [x: string]: any;
};

interface StyleSheet {
    [key: string]: React.CSSProperties;
};

const XInput = (props: XInputProps) => {
    const styles: StyleSheet = {
        input: {
            width: `min(100%, ${props.maxWidth ? props.maxWidth+"px" : "100%"})`,
            paddingRight: props.credential ? "60px" : ""     
        }
    };

    const { credential, maxWidth, ...spread } = props;

    const [show, setShow] = React.useState<boolean>(props.type === "password" ? false : true);

    return (
        <XWrapper maxWidth={props.maxWidth && props.maxWidth}>
            <input
                {...spread}
                className="input"
                style={{ ...styles.input, ...props.style }} 
                placeholder={props.placeholder} 
                onChange={props.onChange}
                type={show === true ? "text" : "password"}
                value={props.value}
            />
            {props.type === "password" && 
                <XImage    
                    className="icon" 
                    src={show ? IMG_EYE_SLASH_SOLID : IMG_EYE_SOLID} 
                    alt="show" 
                    onClick={() => setShow(!show)}
                />
            }
        </XWrapper>
    );
};

export default XInput;
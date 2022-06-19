import { ReactNode } from "react";
import "../styles/components/_xwrapper.scss";

interface XWrapperProps {
    column?: boolean;
    children: ReactNode;
    maxWidth?: number;
    [x: string]: any;
};

interface StyleSheet {
    [key: string]: React.CSSProperties;
};

const XWrapper = (props: XWrapperProps) => {
    const styles: StyleSheet = {
        wrapper: {
            flexDirection: props.column ? "column" : "row",
            justifyContent: props.spaceBetween ? "space-between" : "unset",
            alignItems: props.alignCenter ? "center" : "unset",
            width: `min(100%, ${props.maxWidth ? props.maxWidth+"px" : "100%"})`,
        }
    };

    const { maxWidth, spaceBetween, alignCenter, ...spread } = props;

    return (
        <div 
            className="wrapper"
            {...spread}
            style={{...styles.wrapper, ...props.style}} 
        >
            {props.children}
        </div>
    );
};

export default XWrapper;
import { LOT_LOADING_DOTS } from "../assets/lottie";
import XImage from "./XImage";
import "../styles/components/_xbutton.scss";

interface XButtonProps {
    label: string;
    [x: string]: any;
};

interface StyleSheet {
    [key: string]: React.CSSProperties;
};

const XButton = (props: XButtonProps) => {
    const styles: StyleSheet = {
        xbutton: {
            cursor: `${props.disabled ? "not-allowed" : "pointer"}`   
        }
    };

    const { loading, ...spread } = props;

    return (
        <button 
            {...spread}
            className="button"
            style={{...styles.xbutton, ...props.style}} 
        >
            {!props.loading && props.label}
            {props.loading && <XImage src={LOT_LOADING_DOTS} className="loading" />}
        </button>
    );
};

export default XButton;
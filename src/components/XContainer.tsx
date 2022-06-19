import "../styles/components/_xcontainer.scss";

interface XContainerProps {
    children: any;
    center?: boolean;
    [x: string]: any;
};

interface StyleSheet {
    [key: string]: React.CSSProperties;
};

const XContainer = (props: XContainerProps) => {
    const styles: StyleSheet = {
        container: {
            justifyContent: props.center ? "center" : "unset",
            alignItems: props.center ? "center" : "unset"
        }
    };

    const { center, ...spread } = props;

    return (
        <div 
            {...spread}
            className="container"
            style={{...styles.container, ...props.style}}
        >
            {props.children}
        </div>
    );
};

export default XContainer;
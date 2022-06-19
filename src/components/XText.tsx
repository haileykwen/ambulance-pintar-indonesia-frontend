interface XTextProps {
    text: string;
    size?: number;
    weight?: number;
    color?: string;
    align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
    [x: string]: any;
};

interface StyleSheet {
    [key: string]: React.CSSProperties;
};

const XText = (props: XTextProps) => {
    const styles: StyleSheet = {
        text: {
            color: `${props.color ? props.color : "#000000"}`,
            fontSize: `${props.size ? props.size+"px" : "14px"}`,
            fontWeight: `${props.weight ? props.weight : 400}`,
            textAlign: `${props.align ? props.align : "left"}`
        }
    };

    return (
        <p 
            style={{...styles.text, ...props.style}}
            {...props} 
        >
            {props.text}
        </p>
    );
};

export default XText;
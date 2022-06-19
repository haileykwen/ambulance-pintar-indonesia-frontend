interface XGapProps {
    height?: number;
    width?: number;
    [x: string]: any;
};

interface StyleSheet {
    [key: string]: React.CSSProperties;
};

const XGap = (props: XGapProps) => {
    const styles: StyleSheet = {
        gap: {
            height: `${props.height+"px"}`,
            width: `${props.width+"px"}`,
        }
    };

    return (
        <div 
            {...props} 
            style={{...styles.gap, ...props.style}}
        />
    );
};

export default XGap;
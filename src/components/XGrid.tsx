import React from "react";
import "../styles/components/_xgrid.scss";

interface XGridProps {
    children: React.ReactNode;
    maxWidth?: number;
    gap?: number;
};

interface StyleSheet {
    [key: string]: React.CSSProperties;
};

const XGrid = (props: XGridProps) => {
    const styles: StyleSheet = {
        grid: {
            gridGap: `${props.gap ? props.gap+"px" : "0px"}`,
            width: `min(100%, ${props.maxWidth ? props.maxWidth+"px" : "max-content"})`,
        }
    };

    return (
        <div className="grid" style={styles.grid}>
            {props.children}
        </div>
    );
};

export default XGrid;
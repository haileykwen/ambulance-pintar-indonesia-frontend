interface XImageProps {
    [x: string]: any;
};

const XImage = (props: XImageProps) => {
    return (
        <img 
            {...props} 
            alt={props.alt} 
            style={{...props.style}}
        />
    );
};

export default XImage;
import XWrapper from './XWrapper';
import "../styles/components/_xcheckbox.scss";

interface XCheckboxProps {
    label: string;
};

const XCheckbox = (props: XCheckboxProps) => {
    return (
        <XWrapper alignCenter>
            <input id={(props.label.replace(/\s/g, '').toLocaleLowerCase())} type="checkbox" />
            <label className='label' htmlFor={(props.label.replace(/\s/g, '').toLocaleLowerCase())}>{props.label}</label>
        </XWrapper>
    );
};

export default XCheckbox;
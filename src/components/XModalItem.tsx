import React from 'react';
import { API_ADD_ITEM, API_GET_ITEMS, API_RESTOCKS } from '../apis/item/Item';
import { LOT_LOADING_DOTS } from '../assets/lottie';
import "../styles/components/_xmodal.scss";
import XAlert from './XAlert';
import XButton from './XButton';
import XGap from './XGap';
import XImage from './XImage';
import XInput from './XInput';
import XText from './XText';

interface XModalItemProps {
    onClose: any;
    onSuccessSubmit: any;
};

const XModalItem = (props: XModalItemProps) => {
    const [items, setItems] = React.useState([]);
    const [name, setName] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [alert, setAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState<any>("");
    const [alertMessage, setAlertMessage] = React.useState("");

    const onSubmit = () => {
        setIsSubmitting(true);
    };

    React.useEffect(() => {
        if (isSubmitting === true) {
            API_ADD_ITEM(
                { name: name },
                (result: any) => {
                    console.log(result);
                    // setIsSubmitting(false);
                    setAlertType("success");
                    setAlert(true);
                    setAlertMessage(result.message);
                    setTimeout(() => {
                        props.onSuccessSubmit();
                    }, 1500);
                },
                (error: any) => {
                    console.log(error);
                    setAlertType("danger");
                    setAlert(true);
                    setAlertMessage(error.message);
                    setIsSubmitting(false);
                }
            );
        };
    }, [isSubmitting]);

    React.useEffect(() => {
        if (isSubmitting === true) {
            setAlert(false);
            setAlertMessage("");
        }
    }, [isSubmitting]);

    return (
        <div className='modal-container'>
            <div className='modal'>
                <XText text='Nama Barang' color='black' />
                <XGap height={5} />
                <XInput 
                    value={name} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    style={{ backgroundColor: "#FFF", border: "1px solid #DFE0EB", color: "black" }}
                />

                <div className='alert-wrapper'>
                    {alert && <XAlert message={alertMessage} type={alertType} />}
                </div>

                <div className="button-wrapper">
                <XButton 
                        label='Tambah' 
                        onClick={onSubmit}  
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        style={{ backgroundColor: "#428BCA" }}
                    />
                    <XGap width={10} />
                    <XButton 
                        label='Batal' 
                        onClick={props.onClose}
                        disabled={isSubmitting} 
                        style={{ backgroundColor: "#373A47" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default XModalItem;
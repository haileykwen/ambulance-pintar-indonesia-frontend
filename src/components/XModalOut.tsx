import React from 'react';
import { API_GET_ITEMS, API_SPEND } from '../apis/item/Item';
import { LOT_LOADING_DOTS } from '../assets/lottie';
import "../styles/components/_xmodal.scss";
import XAlert from './XAlert';
import XButton from './XButton';
import XGap from './XGap';
import XImage from './XImage';
import XInput from './XInput';
import XSelect from './XSelect';
import XText from './XText';

interface XModalOutProps {
    onClose: any;
    onSuccessSubmit: any;
};

const XModalOut = (props: XModalOutProps) => {
    const [items, setItems] = React.useState([]);
    const [itemId, setItemId] = React.useState("");
    const [qty, setQty] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [alert, setAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState<any>("");
    const [alertMessage, setAlertMessage] = React.useState("");

    const getItems = () => {
        API_GET_ITEMS(
            null,
            (result: any) => {
                setItems(result.data);
            },
            (error: any) => {
                console.log(error);
            }
        );
    };

    const onSubmit = () => {
        setIsSubmitting(true);
    };

    React.useEffect(() => {
        if (isSubmitting === true) {
            API_SPEND(
                { item_id: itemId, qty: qty, timestamp: `${Date.now()}` },
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

    React.useEffect(() => {
        getItems();
    }, []);

    return (
        <div className='modal-container'>
            {items.length !== 0 && <div className='modal'>
                <XText text='Barang' color='black' />
                <XGap height={5} />
                <XSelect options={items}
                    value={itemId} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemId(e.target.value)}
                    style={{ backgroundColor: "#FFF", border: "1px solid #DFE0EB", color: "black" }}
                />

                <XGap height={10} />

                <XText text='Qty' color='black' />
                <XGap height={5} />
                <XInput 
                    value={qty} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQty(e.target.value)}
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
            </div>}

            {items.length === 0 && <XImage src={LOT_LOADING_DOTS} className="loading" />}
        </div>
    );
};

export default XModalOut;
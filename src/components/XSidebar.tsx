import React from 'react';
import { useSelector } from 'react-redux';
import { cookiesClient } from '../apis/ApiCore';
import { IC_ADMIN, IC_LOGOUT } from '../assets/icons';
import { LOGO } from '../assets/images';
import { ROUTE } from '../config/Url';
import { withRouter } from '../router/Navigation';
import "../styles/components/_xsidebar.scss";
import XButton from './XButton';
import XGap from './XGap';
import XImage from './XImage';
import XSidebarItem from './XSidebarItem';

interface XSidebarProps {
    items: any;
    active: any;
    navigate?: any;
};

const XSidebar = (props: XSidebarProps) => {
    const selector = useSelector((state: any) => state);

    const onSignout = () => {
        cookiesClient().set('token', null, {
            path: '/',
            sameSite: 'lax'
        });
        props.navigate(ROUTE.SIGNIN, {replace: true});
    };

    return (
        <div className="sidebar">
            <div style={{ backgroundColor: "white", marginBottom: "10px", borderRadius: "5px" }}>
                <XImage src={LOGO} width={60} style={{ margin: "0px auto", marginBottom: "15px" }} />
            </div>
            <hr />
            <div className='user-info'>
                <XImage src={IC_ADMIN} width={30} style={{ marginRight: "5px" }} />
                <p style={{ fontSize: "12px", color: "white" }}>{selector ? selector.user.data.username : ""}</p>
                <XImage src={IC_LOGOUT} width={30} className="button-logout" onClick={onSignout} />
            </div>
            <hr />
            <XGap height={5} />
            {props.items.map((item: any, index: number) => {
                return (
                    <XSidebarItem label={item.label} onClick={item.onClick} key={index} active={props.active === item.name ? true : false} />
                );
            })}
        </div>
    );
};

export default withRouter(XSidebar);
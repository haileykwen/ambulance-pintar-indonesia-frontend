import React from 'react';
import { connect } from 'react-redux';
import { cookiesClient } from '../apis/ApiCore';
import XSidebar from '../components/XSidebar';
import { ROUTE } from '../config/Url';
import { withRouter } from '../router/Navigation';
import DashboardItem from './DashboardItem';
import DashboardItemIn from './DashboardItemIn';
import DashboardItemLog from './DashboardItemLog';
import DashboardItemOut from './DashboardItemOut';
import "../styles/pages/_dashboard.scss";

interface DashboardProps {
    navigate?: any;
    user: any;
};

interface DashboardState {
    component: any;
};

interface StyleSheet {
    [key: string]: React.CSSProperties;
};

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps){
        super(props);
        this.state = {
            component: "item"
        };
        this.onSignout = this.onSignout.bind(this);
        this.onChangeMenu = this.onChangeMenu.bind(this);
    };

    onSignout() {
        cookiesClient().set('token', null, {
            path: '/',
            sameSite: 'lax'
        });
        this.props.navigate(ROUTE.SIGNIN, {replace: true});
    };

    onChangeMenu(menu: string) {
        this.setState({ component: menu });
    };

    componentDidMount() {
        document.title = "PT. Ambulance Pintar Indonesia | Dashboard"
    };

    render() {
        const styles: StyleSheet = {
            container: {
                display: "flex",
                flexDirection: "row",
                padding: "0px",
                backgroundColor: "#F7F8FC",
                boxSizing: "border-box"
            }
        };

        const sidebarItemsAktor = [
            { label: "Barang", onClick: () => this.onChangeMenu("item"), name: "item" },
            { label: "Log Barang", onClick: () => this.onChangeMenu("item-log"), name: "item-log" },
        ]

        const sidebarItemsKepalaGudang = [
            { label: "Barang", onClick: () => this.onChangeMenu("item"), name: "item" },
            { label: "Barang Masuk", onClick: () => this.onChangeMenu("item-in"), name: "item-in" },
            { label: "Barang Keluar", onClick: () => this.onChangeMenu("item-out"), name: "item-out" },
        ]

        return (
            <div style={styles.container}>
                <XSidebar items={this.props.user.data.role === 1 ? sidebarItemsAktor : sidebarItemsKepalaGudang} active={this.state.component} />

                <div className='dashboard-content'>
                    {this.state.component === "item" && <DashboardItem />}
                    {this.state.component === "item-in" && <DashboardItemIn />}
                    {this.state.component === "item-out" && <DashboardItemOut />}
                    {this.state.component === "item-log" && <DashboardItemLog />}
                </div>
            </div>
        );
    };
};

function mapStateToProps(state: any) {
    const user = state.user;
    return {
        user
    };
};

export default connect(mapStateToProps) (withRouter(Dashboard));
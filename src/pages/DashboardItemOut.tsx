import React from 'react';
import { API_GET_SPENDS } from '../apis/item/Item';
import { LOT_LOADING_DOTS } from '../assets/lottie';
import XButton from '../components/XButton';
import XContainer from '../components/XContainer';
import XGap from '../components/XGap';
import XImage from '../components/XImage';
import XModalOut from '../components/XModalOut';
import XTable from '../components/XTable';
import XText from '../components/XText';
import { withRouter } from '../router/Navigation';
import "../styles/pages/_dashboard.scss";

interface DashboardItemOutProps {};
interface DashboardItemOutState {
    items: any;
    modal: boolean;
    loading: boolean;
};

class DashboardItemOut extends React.Component<DashboardItemOutProps, DashboardItemOutState> {
    constructor(props: DashboardItemOutProps) {
        super(props);
        this.state = {
            items: [],
            modal: false,
            loading: true
        };
        this.getItems = this.getItems.bind(this);
        this.onSuccessSubmit = this.onSuccessSubmit.bind(this);
    }

    getItems() {
        this.setState({items: [], loading: true}, () => {
            API_GET_SPENDS(
                null,
                (result: any) => {
                    this.setState({items: result.data, loading: false});
                },
                (error: any) => {
                    console.log(error);
                }
            );
        });
    };

    onSuccessSubmit() {
        this.setState({modal: false}, () => {
            this.getItems();
        });
    };

    componentDidMount() {
        this.getItems();
    };

    render() {
        const tableConfig = [
            {
                header: "Nama Barang",
                data: "item_name"
            },
            {
                header: "Kuantitas",
                data: "qty"
            },
            {
                header: "Tanggal Keluar",
                data: "timestamp"
            },
        ];

        return (
            <div style={{ backgroundColor: "white", margin: "20px", padding: "20px", borderRadius: "5px", border: "1px solid #DFE0EB" }} >
                <XText text="Barang Keluar" className="heading" />
                <XGap height={10} />
                
                {!this.state.loading && <div>
                    <button className='dashboard-button' onClick={() => this.setState({modal: true})}>Tambah Barang Keluar</button>
                    <XGap height={20} />
                    <XTable tableConfig={tableConfig} tableData={this.state.items} />

                    {this.state.modal && <XModalOut onClose={() => this.setState({modal: false})} onSuccessSubmit={this.onSuccessSubmit} />}
                </div>}

                {this.state.loading && <XImage src={LOT_LOADING_DOTS} className="loading" />}
            </div>
        );
    };
};

export default withRouter(DashboardItemOut);
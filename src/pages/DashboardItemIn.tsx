import React from 'react';
import { BooleanLiteral } from 'typescript';
import { API_GET_RESTOCKS } from '../apis/item/Item';
import { LOT_LOADING_DOTS } from '../assets/lottie';
import XButton from '../components/XButton';
import XContainer from '../components/XContainer';
import XGap from '../components/XGap';
import XImage from '../components/XImage';
import XModal from '../components/XModal';
import XTable from '../components/XTable';
import XText from '../components/XText';
import { withRouter } from '../router/Navigation';
import "../styles/pages/_dashboard.scss";

interface DashboardItemInProps {};
interface DashboardItemInState {
    items: any;
    modal: boolean;
    loading: boolean;
};

class DashboardItemIn extends React.Component<DashboardItemInProps, DashboardItemInState> {
    constructor(props: DashboardItemInProps) {
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
            API_GET_RESTOCKS(
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

    componentDidMount() {
        this.getItems();
    };

    onSuccessSubmit() {
        this.setState({modal: false}, () => {
            this.getItems();
        });
    };

    render() {
        const tableConfig = [
            {
                header: "Nama Barang",
                data: "name"
            },
            {
                header: "Kuantitas",
                data: "qty"
            },
            {
                header: "Tanggal Masuk",
                data: "timestamp"
            },
        ];

        return (
            <div style={{ backgroundColor: "white", margin: "20px", padding: "20px", borderRadius: "5px", border: "1px solid #DFE0EB" }} >
                <XText text="Barang Masuk" className="heading" />
                <XGap height={10} />

                {!this.state.loading && <div>
                    <button className='dashboard-button' onClick={() => this.setState({modal: true})}>Tambah Barang Masuk</button>
                    <XGap height={20} />
                    <XTable tableConfig={tableConfig} tableData={this.state.items} />

                    {this.state.modal && <XModal onClose={() => this.setState({modal: false})} onSuccessSubmit={this.onSuccessSubmit} />}
                </div>}

                {this.state.loading && <XImage src={LOT_LOADING_DOTS} className="loading" />}
            </div>
        );
    };
};

export default withRouter(DashboardItemIn);
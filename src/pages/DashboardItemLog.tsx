import React from 'react';
import { API_GET_LOGS } from '../apis/item/Item';
import { LOT_LOADING_DOTS } from '../assets/lottie';
import XContainer from '../components/XContainer';
import XGap from '../components/XGap';
import XImage from '../components/XImage';
import XTable from '../components/XTable';
import XText from '../components/XText';
import { withRouter } from '../router/Navigation';
import "../styles/pages/_dashboard.scss";

interface DashboardItemLogProps {};
interface DashboardItemLogState {
    items: any;
    loading: boolean;
};

class DashboardItemLog extends React.Component<DashboardItemLogProps, DashboardItemLogState> {
    constructor(props: DashboardItemLogProps) {
        super(props);
        this.state = {
            items: [],
            loading: true
        };
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        this.setState({loading: true}, () => {
            API_GET_LOGS(
                null,
                (result: any) => {
                    this.setState({items: result.data, loading: false});
                },
                (error: any) => {
                    console.log(error);
                }
            );
        })
    };

    componentDidMount() {
        this.getItems();
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
                header: "Tipe Log",
                data: "log_type"
            },
            {
                header: "Tanggal",
                data: "timestamp"
            },
        ];

        return (
            <div style={{ backgroundColor: "white", margin: "20px", padding: "20px", borderRadius: "5px", border: "1px solid #DFE0EB" }} >
                <XText text="Log Barang" className="heading" />
                <XGap height={20} />

                {!this.state.loading && <XTable tableConfig={tableConfig} tableData={this.state.items} />}

                {this.state.loading && <XImage src={LOT_LOADING_DOTS} className="loading" />}
            </div>
        );
    };
};

export default withRouter(DashboardItemLog);
import React from 'react';
import { API_DELETE_ITEMS, API_GET_ITEMS } from '../apis/item/Item';
import { LOT_LOADING_DOTS } from '../assets/lottie';
import XGap from '../components/XGap';
import XImage from '../components/XImage';
import XModalItem from '../components/XModalItem';
import XTable from '../components/XTable';
import XText from '../components/XText';
import { withRouter } from '../router/Navigation';
import "../styles/pages/_dashboard.scss";

interface DashboardItemProps {};
interface DashboardItemState {
    items: any;
    loading: boolean;
    modal: boolean;

};

class DashboardItem extends React.Component<DashboardItemProps, DashboardItemState> {
    constructor(props: DashboardItemProps) {
        super(props);
        this.state = {
            items: [],
            modal: false,
            loading: true
        };
        this.getItems = this.getItems.bind(this);
        this.onSuccessSubmit = this.onSuccessSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    getItems() {
        this.setState({loading: true}, () => {
            API_GET_ITEMS(
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

    onDelete(id: any) {
        console.log(`Delete ${id}`);
        API_DELETE_ITEMS(
            id,
            () => {
                this.getItems();
            },
            (error: any) => {
                console.log(error);
            }
        );
    };
    
    componentDidMount() {
        this.getItems();
    };

    render() {
        const tableConfig = [
            {
                header: "Nama Barang",
                data: "name",
            },
            {
                header: "Aksi",
                data: "id"
            }
        ];

        return (
            <div style={{ backgroundColor: "white", margin: "20px", padding: "20px", borderRadius: "5px", border: "1px solid #DFE0EB" }} >
                <XText text="Barang" className="heading" />
                <XGap height={20} />
                
                {!this.state.loading && <div>
                    <button className='dashboard-button' onClick={() => this.setState({modal: true})}>Tambah Barang</button>
                    <XGap height={20} />
                    <XTable tableConfig={tableConfig} tableData={this.state.items} onDelete={this.onDelete} />

                    {this.state.modal && <XModalItem onClose={() => this.setState({modal: false})} onSuccessSubmit={this.onSuccessSubmit} />}
                </div>}

                {this.state.loading && <XImage src={LOT_LOADING_DOTS} className="loading" />}
            </div>
        );
    };
};

export default withRouter(DashboardItem);
import moment from 'moment';
import React from 'react';
import { API_GET_LOGS } from '../apis/item/Item';
import { LOT_LOADING_DOTS } from '../assets/lottie';
import XGap from '../components/XGap';
import XImage from '../components/XImage';
import XTable from '../components/XTable';
import XText from '../components/XText';
import { withRouter } from '../router/Navigation';
import "../styles/pages/_dashboard.scss";
import { utils, writeFile } from "xlsx";
import 'moment/locale/id'; 
import { IC_XLSX } from '../assets/icons';
moment.locale("id");

interface DashboardItemLogProps {};
interface DashboardItemLogState {
    masterItems: any;
    masterMonths: any;
    months: any;
    years: any;
    items: any;
    loading: boolean;
    selectedMonth: any;
    selectedYear: any;
};

class DashboardItemLog extends React.Component<DashboardItemLogProps, DashboardItemLogState> {
    constructor(props: DashboardItemLogProps) {
        super(props);
        this.state = {
            masterMonths: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
            masterItems: [],
            months: [],
            years: [],
            items: [],
            loading: true,
            selectedMonth: null,
            selectedYear: null
        };
        this.getItems = this.getItems.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onExport = this.onExport.bind(this);
    }

    getItems() {
        this.setState({loading: true}, () => {
            API_GET_LOGS(
                null,
                (result: any) => {
                    const dataLogBarang = result.data;
                    let adjustLogBarang: any = [];
                    let arrayMonth: any = [];
                    let arrayYear: any = [];
                    dataLogBarang.forEach((logBarang: any) => {
                        let month: any;
                        let year: any;

                        month = moment(parseInt(logBarang.timestamp)).month();
                        year = moment(parseInt(logBarang.timestamp)).year();

                        if (!arrayMonth.includes(month)) {
                            arrayMonth.push(month);
                        };
                        if (!arrayYear.includes(year)) {
                            arrayYear.push(year);
                        };

                        logBarang.month = month;
                        logBarang.year = year;
                        adjustLogBarang.push(logBarang);
                    });

                    console.log({adjustLogBarang, arrayMonth, arrayYear});
                    this.setState({
                        masterItems: adjustLogBarang, 
                        months: arrayMonth,
                        years: arrayYear,
                        items: adjustLogBarang, 
                        loading: false
                    });
                },
                (error: any) => {
                    console.log(error);
                }
            );
        })
    };

    onFilter() {
        let selectedMonth = this.state.selectedMonth;
        let selectedYear = this.state.selectedYear;
        let masterItems = this.state.masterItems;

        if (selectedMonth !== null && selectedYear !== null) {
            var filteredItems = this.state.masterItems.filter(function (item: any) {
                return item.month === parseInt(selectedMonth) && item.year === parseInt(selectedYear);
            });
            this.setState({items: filteredItems});
        };
    };

    onExport() {
        const items = this.state.items;
        
        if (items.length !== 0) {
            console.log({items});
            let data: any = [];
            let fileName: any = `Log Barang ${moment().format("LLL")}.xlsx`;
            items.map((item: any, index: any) => {
                let patternData = {
                    "No": index+1,
                    "Nama Barang": item.item_name,
                    "Kuantitas": item.qty,
                    "Tipe Log": item.log_type === 1 ? "Masuk" : "Keluar",
                    "Tanggal": moment(parseInt(item.timestamp)).format("LLL")
                };
                data.push(patternData);
            });

            var wb = utils.book_new();
            var ws = utils.json_to_sheet(data);
            utils.book_append_sheet(wb, ws, "Sheet1");
            writeFile(wb, fileName);
        };
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
                <XText text="Log Barang" className="heading print-hide" />
                <XGap height={20} />

                <div className='print-hide' style={{ display: "flex", fontSize: "12px", justifyContent: "space-between" }}>
                    <div style={{ display: "flex" }}>
                        <select onChange={(e: any) => this.setState({selectedMonth: e.target.value})} className="select-dropdown">
                            <option value="">-- Pilih Bulan</option>
                            {this.state.masterMonths.length !== 0 && this.state.masterMonths.map((month: any, index: any) => {
                                return (
                                    <option key={index} value={index}>{month}</option>
                                );
                            })};
                        </select>
                        <XGap width={2} />
                        <select onChange={(e: any) => this.setState({selectedYear: e.target.value})} className="select-dropdown">
                            <option value="">-- Pilih Tahun</option>
                            {this.state.years.length !== 0 && this.state.years.map((year: any, index: any) => {
                                return (
                                    <option key={index} value={year}>{year}</option>
                                );
                            })};
                        </select>
                        <XGap width={10} />
                        <button onClick={this.onFilter} className="button-dropdown">
                            Pilih
                        </button>
                    </div>

                    <button className="button-dropdown" style={{ display: "flex", alignItems: "center" }} onClick={this.onExport}>
                        <XImage src={IC_XLSX} style={{ height: "20px", width: "20px" }} />
                        <p>Export</p>
                    </button>
                </div>
                <XGap height={10} />

                {!this.state.loading && <XTable id='print-area' tableConfig={tableConfig} tableData={this.state.items} />}

                {this.state.loading && <XImage src={LOT_LOADING_DOTS} className="loading" />}
            </div>
        );
    };
};

export default withRouter(DashboardItemLog);
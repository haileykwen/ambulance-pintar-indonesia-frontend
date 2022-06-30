import moment from 'moment';
import "../styles/components/_xtable.scss";
import 'moment/locale/id'; 
import XImage from './XImage';
import { IC_TRASH } from '../assets/icons';
moment.locale("id");

interface XTableProps {
    tableConfig: any;
    tableData: any;
    onDelete?: any;
    id?: any;
};

const XTable = (props: XTableProps) => {
    return (
        <table id={props.id}>
            <thead>
                <tr>
                    <td style={{ width: "40px" }}>
                        No
                    </td>
                    {props.tableConfig.map((config: any, index: any) => {
                        return (
                            <td key={index}>{config.header === "Aksi" ? "" : config.header}</td>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {props.tableData.length !== 0 && props.tableData.map((data: any, index: any) => {
                    return (
                        <tr key={index}>
                            <td className='number'>{index+1}.</td>
                            {props.tableConfig.map((config: any, index: any) => {
                                return (
                                    <td key={index}>
                                        {config.data === "timestamp" && moment(parseInt(data[config.data])).format("LLL")}
                                        {config.data === "log_type" && data[config.data] === 1 && "Masuk"}
                                        {config.data === "log_type" && data[config.data] === 2 && "Keluar"}

                                        {config.data !== "timestamp" && config.data !== "log_type" && config.header !== "Aksi" && data[config.data]}

                                        {config.header === "Aksi" 
                                            ?   <button 
                                                    style={{ outline: "none", border: "none" }}
                                                    onClick={() => {
                                                        const id = data[config.data];
                                                        props.onDelete(id);
                                                    }}
                                                >
                                                    <XImage src={IC_TRASH} style={{ height: "30px", width: "30px", cursor: "pointer" }} />
                                                </button> 
                                            :   null
                                        }
                                    </td> 
                                );
                            })}
                        </tr>
                    );
                })}

                {props.tableData.length === 0 && <tr>
                    <td colSpan={props.tableConfig.length + 1}>Tidak ada data</td>
                </tr>}
            </tbody>
        </table>
    );
};

export default XTable;
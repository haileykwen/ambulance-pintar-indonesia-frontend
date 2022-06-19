import moment from 'moment';
import React from 'react';
import "../styles/components/_xtable.scss";
import 'moment/locale/id'; 
moment.locale("id");

interface XTableProps {
    tableConfig: any;
    tableData: any;
};

const XTable = (props: XTableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <td style={{ width: "40px" }}>
                        No
                    </td>
                    {props.tableConfig.map((config: any, index: any) => {
                        return (
                            <td key={index}>{config.header}</td>
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

                                        {config.data !== "timestamp" && config.data !== "log_type" && data[config.data]}
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
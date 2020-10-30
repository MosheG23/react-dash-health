import React from "react";
import { Chart } from "react-google-charts";
import { CircularProgress } from "@material-ui/core";
import { fetchGlobalTimeline } from "../../../api"

import styles from "./Info.module.css";

const GlobalTimeline = ({data, type}) => {
    var chartData = [{ type: 'date', id: 'תאריך' }, { type: 'number', id: type }];
    const createData = () => {
        var cases = data[type];
        for (const [key, value] of Object.entries(cases)) {
            chartData.push([new Date(key), value]);
        }
    }
    if (data.cases) {
        createData();
        return (
        <div className={styles.timeline}>
            <Chart
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={
                    chartData
                }
                options={{
                    minColor: '#f00',
                    midColor: '#ddd',
                    maxColor: '#0d0',
                    headerHeight: 15,
                    fontColor: 'black',
                    showScale: true,
                    generateTooltip: (row, size, value) => {
                    return (
                        '<div style="background:#fd9; padding:10px; border-style:solid"> ' +
                        value +
                        '</div>'
                    )
                    },
                }}
                rootProps={{ 'data-testid': '3' }}
                />
        </div>
    )
    } else {
        return (
            <CircularProgress />
        )
    }
    
}

export default GlobalTimeline;
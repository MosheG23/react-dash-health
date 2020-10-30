import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress
} from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import { Chart } from "react-google-charts";

import styles from "./IsraelCities.module.css";

function IsraelAges({ data }) {
    if (!data) {
        return (
            <CircularProgress />
        )
    }
    const newData = [["טווח גילאים", "גברים", "נשים"]];
    data.map((item) => {
        newData.push([item.section, item.male, item.female])
    })
    return (
        <>
            <h4>על פי גילאים</h4>
            <Chart
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={
                    newData
                }
                options={{
                    title: 'תחלואה על פי גילאים',
                    chartArea: { width: '50%' },
                    isStacked: true,
                    hAxis: {
                    title: 'סה"כ חולים',
                    minValue: 0,
                    },
                    vAxis: {
                    title: 'גיל',
                    },
                }}
                // For tests
                rootProps={{ 'data-testid': '3' }}
            />
        </> 
    )   
}

export default IsraelAges;
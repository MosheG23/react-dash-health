import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Hidden
} from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import { Chart } from "react-google-charts";

import styles from "./IsraelCities.module.css";

function IsraelCities({ data, type }) {
    if (!data) {
        return (
            <CircularProgress />
        )
    }
    const newData = data.map((city) => ({
        name: city.city,
        actualSick: city.actualSick,
        sickCount: city.sickCount,
        testLast7Days: city.testLast7Days,
        verifiedLast7Days: +city.verifiedLast7Days,
        positivePercent: +((+city.verifiedLast7Days / city.testLast7Days) * 100).toFixed(2)
    }));

    const sortedData = newData.sort(function (a, b) {
        return parseFloat(b[type]) - parseFloat(a[type]);
    });
    return (
        <>
            <Grid container spacing={1} justify="center">
                {sortedData.slice(0,6).map((item) => {
                    const testData = item.testLast7Days;
                    const verifiedData = +item.verifiedLast7Days;
                    return(
                    <Grid item component = { Card } s = { 12 } md = { 3 }
                    className = {
                        cx(styles.card, styles.infected)
                    } >
                        <CardContent>
                            <Typography variant="h4">
                                {item.name}
                            </Typography>
                            <Typography variant="h7">  מספר חולים פעילים - 
                                <CountUp start={0} end={item.actualSick} duration={1.5} separator="," />
                            </Typography>
                            <br />
                            <Typography variant="h7">  מספר חולים סה"כ - 
                                <CountUp start={0} end={item.sickCount} duration={1.5} separator="," />
                            </Typography>
                            <br />
                            <Typography variant="h7">  כמות חולים בשבוע האחרון - 
                                <CountUp start={0} end={item.verifiedLast7Days} duration={1.5} separator="," />
                            </Typography>
                            <br />
                            <Hidden sDown>
                                <Chart
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['תוצאה', 'כמות'],
                                        ["שלילי", testData - verifiedData],
                                        ["חיובי", verifiedData]
                                    ]}
                                    options={{
                                        title: 'תוצאות בדיקות קורונה',
                                        // Just add this option
                                        is3D: true,
                                    }}
                                    rootProps={{ 'data-testid': '2' }}
                                />
                            </Hidden>
                            <Hidden mdUp>
                            <Typography variant="h6">
                                סה"כ בדיקות
                            </Typography>
                            <Typography variant="h7">  שלילי - 
                                <CountUp start={0} end={testData - verifiedData} duration={1} separator="," />
                            </Typography>
                            <br />
                            <Typography variant="h7">  חיובי - 
                                <CountUp start={0} end={verifiedData} duration={1} separator="," />
                            </Typography>
                            <br />
                            <Typography variant="h7">  סה"כ - 
                                <CountUp start={0} end={testData} duration={1} separator="," />
                            </Typography>
                            </Hidden>
                        </CardContent>
                    </Grid>)
                })}
            </Grid>
        </> 
    )   
}

export default IsraelCities;
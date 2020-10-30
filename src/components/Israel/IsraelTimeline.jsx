import React from "react";
import { Chart } from "react-google-charts";
import _ from "lodash";
import { Skeleton } from '@material-ui/lab';
import Hidden from '@material-ui/core/Hidden';

import styles from "./IsraelTimeline.module.css"

function IsraelTimeline({data}) {
    if(_.isEmpty(data)){
        return (
            <>
                <Skeleton />
            </>
        )
    }

    var values = [['תאריך', 'בדיקות חיוביות']];
    data.timeline.map((item) =>{
        values.push([new Date(item.date), item['newPositiveTests']])
    })
    

    return (
        <>
            <h4>לוח זמנים</h4>
            <div className={styles.chart}>
                <Hidden mdDown>
                    <Chart
                        chartType="Calendar"
                        loader={<div>Loading Chart</div>}
                        data={
                            values
                        }
                        options={{
                            title: 'חולים חדשים',
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </Hidden>
                <Hidden mdUp>
                    <Chart
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={
                            values
                        }
                        options={{
                            hAxis: {
                            title: 'זמן',
                            },
                            vAxis: {
                            title: 'כמות',
                            },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </Hidden>
                </div>
        </>
    )
}

export default IsraelTimeline;
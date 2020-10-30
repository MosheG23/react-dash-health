import React from "react";
import { Chart } from "react-google-charts";
import _ from "lodash";
import { CircularProgress } from "@material-ui/core"

import Keys from "../../config/dev";

function IsraelMap({ data }) {
    if(!data.cityData){
        return (
            <CircularProgress />
        )
    }
    let values = [{id: '0', label: 'עיר', type: 'string'},
        {id: '1', label: 'חולים פעילים', type: 'number'}];    
    data.cityData.map((item) => {
        values.push([item.city, item.actualSick])
    })

    return (
        <Chart
            chartType="GeoChart"
            data={
                values
            }
            options={{
                region: 'IL',
                displayMode: 'markers',
                colorAxis: { colors: [ 'blue', 'red'] },
            }}
            mapsApiKey={Keys.googleMapAPIKey}
            rootProps={{ 'data-testid': '2' }}
            />
    )
}

export default IsraelMap;
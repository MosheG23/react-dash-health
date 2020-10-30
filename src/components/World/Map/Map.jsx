import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { fetchByCountryData } from "../../../api";

import styles from "./Map.module.css";

import Keys from "../../../config/dev";

const Map = (props) => {
    const [dailyCountryData, setDailyCountryData] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedMapData = (await fetchByCountryData());
            var values = [['Country', props.type]];
            fetchedMapData.map((item) => {
                values.push([item.name, item[props.type]])
            })
            setDailyCountryData(values);
        }
        fetchAPI();
    },[props.type]);

    return (
        <>
            <div className={styles.map}>
                <Chart
                    chartType = "GeoChart"
                    data = {
                            dailyCountryData
                    }
                    mapsApiKey = { Keys.googleMapAPIKey }
                    rootProps = {
                        {
                            'data-testid': '4'
                        }
                    }
                    options = {
                        {
                            colorAxis: {
                                colors: ['#ffffff', 'BC544B', '#60100B']
                            },
                            backgroundColor: '#f0f0f0f0'
                        }
                    }
                />
            </div>
        </>
    )
}

export default Map;
import React from "react";
import { fetchByCountryData, fetchGlobalTimeline } from "../../api/";
import styles from "./World.module.css";
import SecondMapSelector, { MapSelectors } from "./Map/MapSelectors";

import SecondMap from "./Map/SecondMap"

class World extends React.Component {
    state = {
        mapType: "deathsPerOneMillion",
        mapData: {}, 
    }

    handleMapTypeChange = async (type) => {
        // fetch the data
        this.setState({
            mapType: type
        });
    };


    async componentDidMount() {
        const fetchedByCountryData = await fetchByCountryData();
        const fetchedGlobalTimeline = await fetchGlobalTimeline();
        this.setState({
            mapData: fetchedByCountryData,
            globalTimeline: fetchedGlobalTimeline
        });
    }

    render() {
        const { mapType, mapData } = this.state;
        return (
            <div className={styles.map}>
              <h2>תצוגה עולמית</h2>
              {/* <MapType handleMapTypeChange={this.handleMapTypeChange} /> */}
              {/* <Grid container alignItems = "flex-start" >
                    <Grid item xs={4} alignItems="flex-start">
                        <Grid container alignContent="center" alignItems="flex-start">
                            <Grid item xs={12} md={6} >
                                <Info data={mapData} type="deaths" title="מספר מתים" />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Info data={mapData} type="totalActiveCases" title="מקרים פעילים" />
                            </Grid>
                            {/* <Hidden mdDown>
                                <Grid item xs={12}>
                                    <GlobalTimeline data={globalTimeline} type="cases" />
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Map data={mapData} type={mapType} />
                    </Grid>
                    <Grid item xs={12}>
                        <GlobalTimeline data={globalTimeline} type="deaths" />
                    </Grid> 
              </Grid> */}
              <MapSelectors handleMapTypeChange={this.handleMapTypeChange} />
              <SecondMap data={mapData} type={mapType} />
            </div>
        )
    }
}

export default World;
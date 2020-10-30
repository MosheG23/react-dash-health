import React from "react";
import IsraelCities from "./IsraelCities";

import { CircularProgress, Grid } from "@material-ui/core";

import {fetchIsraelGovData} from "../../api";
import IsraelMap from "./IsraelMap";
import IsraelTimeline from "./IsraelTimeline";
import IsraelAges from "./IsraelAges";
import IsraelCityOrder from "./IsraelCityOrder";

class Israel extends React.Component {
    state = {
        israelData: {},
        israelCityType: {}
    }

    handleCityOrder = async (type) => {
        this.setState({
            israelCityType: type
        });
    };

    async componentDidMount() {
        const fecthedIsraelData = await fetchIsraelGovData();
        this.setState({
            israelData: fecthedIsraelData
        })
    }

    render() {

        const { israelData, israelCityType } = this.state;
        console.log(israelCityType);
        return (
            <>
                <h2>ישראל</h2>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={8}>
                        <IsraelTimeline data={israelData} />
                    </Grid>
                    <Grid item xs={12}>
                        <h4>ערים ישראליות</h4>
                        <IsraelCityOrder handleCityOrder={this.handleCityOrder} / >
                        <IsraelCities data={israelData.cityData} type={ israelCityType } />
                    </Grid>
                    <Grid item xs={12}>
                        <IsraelAges data={israelData.sickByAge} />
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default Israel;
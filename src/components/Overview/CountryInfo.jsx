import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid, CircularProgress
} from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./CountryInfo.module.css";

function CountryInfo(props) {
    if (!props.data.population) {
        return <CircularProgress />;
    }

    return (
        <div className={styles.container}>
            <span>עודכן לאחרונה: </span> {new Date(props.data.update).toUTCString()}
            <Grid container spacing={1} justify="center">
                {/* Active  */}
                <Grid item component = { Card } xs = { 12 } md = { 3 }
                className = {
                    cx(styles.card, styles.infected)
                } >
                    <CardContent>
                        <Typography variant="h4">
                            <CountUp start={0} end={props.data.active} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="primary" gutterBottom>חולים פעילים</Typography>
                        <Typography variant="h7">
                            <CountUp start={0} end={props.data.activePerOneMillion} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant = "caption"> (לפי מיליון תושבים)</Typography>
                        <br />
                        <Typography variant="h7">
                            <CountUp start={0} end={props.data.cases} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant = "caption"> (היום)</Typography>
                    </CardContent>
                </Grid>
                {/* Recovered */}
                <Grid item component = { Card } xs = { 12 } md = { 3 }
                className = {
                    cx(styles.card, styles.recovered)
                } >
                    <CardContent>
                        <Typography variant="h4">
                            <CountUp start={0} end={props.data.recovered} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="primary" gutterBottom>מחלימים</Typography>
                        <Typography variant="h7">
                            <CountUp start={0} end={props.data.recoveredPerOneMillion} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant = "caption"> (לפי מיליון תושבים)</Typography>
                        <Typography variant="h7">
                        <br />
                            <CountUp start={0} end={props.data.todayRecovered} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant = "caption"> (היום)</Typography>
                    </CardContent>
                </Grid>
                {/* Deaths */}
                <Grid item component = { Card } xs = { 12 } md = { 3 }
                className = {
                    cx(styles.card, styles.deaths)
                } >
                    <CardContent>
                        <Typography variant="h4">
                            <CountUp start={0} end={props.data.deaths} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="primary" gutterBottom>מתים</Typography>
                        <Typography variant="h7">
                            <CountUp start={0} end={props.data.deathsPerOneMillion} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant = "caption"> (לפי מיליון תושבים)</Typography>
                        <br />
                        <Typography variant="h7">
                            <CountUp start={0} end={props.data.todayDeaths} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant = "caption"> (היום)</Typography>
                    </CardContent>
                </Grid>
                {/* Tests  */}
                <Grid item component = { Card } xs = { 12 } md = { 3 }
                className = {
                    cx(styles.card, styles.infected)
                } >
                    <CardContent>
                        <Typography variant="h4">
                            <CountUp start={0} end={props.data.tests} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="primary" gutterBottom>בדיקות</Typography>
                    </CardContent>
                </Grid>
                {/* Population */}
                <Grid item component = { Card } xs = { 12 } md = { 3 }
                className = {
                    cx(styles.card, styles.recovered)
                } >
                    <CardContent>
                        <Typography variant="h4">
                            <CountUp start={0} end={props.data.population} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="primary" gutterBottom>תושבים</Typography>
                    </CardContent>
                </Grid>
                {/* Critical */}
                <Grid item component = { Card } xs = { 12 } md = { 3 }
                className = {
                    cx(styles.card, styles.deaths)
                } >
                    <CardContent>
                        <Typography variant="h4">
                            <CountUp start={0} end={props.data.critical} duration={1.5} separator="," />
                        </Typography>
                        <Typography color="primary" gutterBottom>במצב קשה</Typography>
                        <Typography variant="h7">
                            <CountUp start={0} end={props.data.criticalPerOneMillion} duration={1.5} separator="," />
                        </Typography>
                        <Typography variant = "caption" > (לפי מיליון תושבים) </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default CountryInfo;
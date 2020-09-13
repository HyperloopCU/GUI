import React from 'react';
import { Grid } from '@material-ui/core';
import ESTOP from '../ESTOP';
import Next from '../Next';
import Centerpiece from '../Centerpiece';
import AutoDisplay from '../AutoDisplay';


const Splash = () => (
    <div>
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <h1 styles={{ textAlign: "center", fontFamily: 'Roboto, sans-serif' }}>Hyperloop GUI</h1>
        </div>
        <Grid container direction="row" justify="center" alignItems="flex-start">
            <Grid container item xs={1} spacing={3} direction="column">
                <Grid item xs={6}> <Next /></Grid>
                <Grid item xs={6}> <ESTOP /></Grid>
            </Grid>
            <Grid container item xs={11} justify="center" alignItems="center">
                <Grid item xs={4}></Grid>
                <Grid item xs={4}><div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><Centerpiece /></div></Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </Grid>
        <AutoDisplay />

    </div>


)


export default Splash;


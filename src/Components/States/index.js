import React from 'react';
import StateCard from './StateCard';
import { Grid } from '@material-ui/core';

// I decided for now to make the container stateless, as the current selected state of the pod is completely determined by a seperate component.
// in order to change the current selected state, the props must be modified by the parent component, which will cause it to rerender.

const States = props => (
    <Grid container spacing={3} style={{ // sorry for the ugliness here, material ui has a weird bug that causes
        margin: 0,                       // it to overflow the page and this was the best fix i could think of
        width: '100%',
    }} >
        <Grid item xs={3}>
            <StateCard title="Arm" selected={props.selected == 'arm'}></StateCard>
        </Grid>
        <Grid item xs={3}>
            <StateCard title="Crawl" selected={props.selected == 'crawl'}></StateCard>
        </Grid>
        <Grid item xs={3}>
            <StateCard title="Standby" selected={props.selected == 'standby'}></StateCard>
        </Grid>
        <Grid item xs={3}>
            <StateCard title="Coast" selected={props.selected == 'coast'}></StateCard>
        </Grid>

    </Grid >)

export default States; 
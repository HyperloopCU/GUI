import React from 'react';
import StateCard from './StateCard';
import { Grid } from '@material-ui/core';
import myStates from './states';

// I decided for now to make the container stateless, as the current selected state of the pod is completely determined by a seperate component.
// in order to change the current selected state, the props must be modified by the parent component, which will cause it to rerender.
// console.log(myStates);
const States = ({ selected }) => {
    return (
        <Grid container spacing={3} style={{ // sorry for the ugliness here, material ui has a weird bug that causes
            margin: 0,                       // it to overflow the page and this was the best fix i could think of
            width: '100%',
        }} >
            {myStates.map((state, i) => {
                return (<Grid item xs={4} key={state.name}>
                    <StateCard title={state.name} selected={selected[0] === i ? selected[1] : false} subs={state.subs} />
                </Grid>);
            })}
        </Grid >)
};

export default States; 
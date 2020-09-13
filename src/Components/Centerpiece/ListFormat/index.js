import React from 'react';
import ListComponent from './ListComponent.js';
import './ListFormat.css';
import { currentSpeedUpdater, currentPositionUpdater, currentFidsUpdater, encoderUpdater, pnumaticUpdater,convertKeyToName } from "../../../HelperFunctions/helperFunctions.js";

const ListFormat = props => {

    // create all states 
    const [speed, setSpeed] = React.useState(null);
    const [pos, setPos] = React.useState(null);
    const [fids, setFids] = React.useState({});
    const [encoder, setEncoder] = React.useState(null);
    const [pnumatic, setPnumatic] = React.useState({});

    React.useEffect(() => {
        // Setup the state updaters 
        currentSpeedUpdater(setSpeed);
        currentPositionUpdater(setPos);
        currentFidsUpdater(setFids);
        encoderUpdater(setEncoder);
        pnumaticUpdater(setPnumatic);


    }, []);

    return (
        <ul className="TopList">
            <ListComponent name="Speed" value={speed}></ListComponent>
            <ListComponent name="Distance" value={pos}></ListComponent>
            {Object.entries(fids).map(x => <ListComponent name={`${convertKeyToName(x[0])} Fidutial Sensor`} value={x[1]}></ListComponent>)}
            {Object.entries(pnumatic).map(x => <ListComponent name={`${convertKeyToName(x[0])} Pnumatic Sensor`} value={x[1]}></ListComponent>)}
            <ListComponent name="Encoder" value={encoder}></ListComponent>
        </ul>
    )
};
export default ListFormat; 
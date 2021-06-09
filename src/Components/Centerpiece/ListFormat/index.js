import React from 'react';
import ListComponent from './ListComponent.js';
import './ListFormat.css';
import { currentSpeedUpdater, currentPositionUpdater, currentFid1Updater,currentFid2Updater, loadCellUpdater, pnumaticUpdater,convertKeyToName } from "../../../HelperFunctions/helperFunctions.js";

const ListFormat = () => {

    // create all states 
    const [speed, setSpeed] = React.useState(null);
    const [pos, setPos] = React.useState(null);
    const [fid1, setFid1] = React.useState(null);
    const [fid2, setFid2] = React.useState(null);
    const [loadCell, setLoadCell] = React.useState(null);
    const [pnumatic, setPnumatic] = React.useState(null);

    React.useEffect(() => {
        // Setup the state updaters 
        currentSpeedUpdater(setSpeed);
        currentPositionUpdater(setPos);
        currentFid1Updater(setFid1);
        currentFid2Updater(setFid2);
        loadCellUpdater(setLoadCell);
        pnumaticUpdater(setPnumatic);


    }, []);

    return (
        <ul className="TopList">
            <ListComponent name="Speed" value={speed}></ListComponent>
            <ListComponent name="Position" value={pos}></ListComponent>
            <ListComponent name="Fidutial Sensor 1" value={fid1}></ListComponent>
            <ListComponent name="Fidutial Sensor 2" value={fid2}></ListComponent>
            <ListComponent name="Pnumatic Sensor" value={pnumatic}></ListComponent>
            <ListComponent name="Load Cell" value={loadCell}></ListComponent>
        </ul>
    )
};
export default ListFormat; 
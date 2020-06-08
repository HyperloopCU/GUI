import React from 'react';
import DisplayText from './DisplayText';
import {autoStateUpdater} from '../../HelperFunctions/helperFunctions.js';
import './autoDisplay.css'

const AutoDisplay = () => {
    const [currentState, changeState] = React.useState(null);

    React.useEffect(() => {
        autoStateUpdater(changeState);
        // document.addEventListener('click',e=>{
        //    autoStateUpdater(changeState);
        // });
    }, [])

    return (
        <div className='container'>
            <DisplayText state={currentState} />
        </div>
    )
}

export default AutoDisplay;

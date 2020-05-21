import React from 'react';
import {emergencyStop} from "../../HelperFunctions/helperFunctions.js";

const ESTOP = props=>(<button onClick={()=>emergencyStop()}>Trigger ESTOP</button>);

export default ESTOP; 

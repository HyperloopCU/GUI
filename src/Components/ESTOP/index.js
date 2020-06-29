import React from 'react';
import {emergencyStop} from "../../HelperFunctions/helperFunctions.js";
import Button from "../Button"

const ESTOP = () => (<Button onClick={()=>emergencyStop()} content = "ESTOP" color = "red"/>)

export default ESTOP;

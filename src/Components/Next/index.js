import React from 'react';
import {nextState} from "../../HelperFunctions/helperFunctions.js";
import Button from "../Button"

const Next = () => (<Button onClick={()=>nextState()} content = "Next" color = "blue"/>)

export default Next;

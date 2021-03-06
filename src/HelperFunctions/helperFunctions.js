// import socket from "./localTesting.js"; // temp from testing 
import io from 'socket.io-client';
const socket = io(); 

// general updates state
const genericStateUpdater = (socketName, stateSetter) => socket.on(socketName, stateSetter);

//update states for specific use cases
const currentSpeedUpdater = speedSetter => genericStateUpdater("getSpeed", speedSetter);
const currentPositionUpdater = postionSetter => genericStateUpdater("getPosition", postionSetter);
const currentFidsUpdater = fidSetter => genericStateUpdater("getFids", fidSetter)
const encoderUpdater = encoderSetter => genericStateUpdater("getEncoder", encoderSetter);
const pnumaticUpdater = pnumaticSetter => genericStateUpdater("getPnumatic", pnumaticSetter);
const autoStateUpdater = autoStateSetter => genericStateUpdater("getAutoState", autoStateSetter);
// converts key names of type fooBarFooBar to Foo Bar Foo Bar
const convertKeyToName = str => str.split("").map((x, i) => x === x.toUpperCase() ? ` ${x}` : i === 0 ? x.toUpperCase() : x).join("");



const emergencyStop = () => {
    console.log("Pod is stopping");
    socket.emit("setEstop",true); 
    return true;
}

const nextState = () => {
    console.log("Next state");
    socket.emit("setNext",true); 
    return true;
}



export  {
    currentSpeedUpdater,
    currentPositionUpdater,
    currentFidsUpdater,
    encoderUpdater,
    pnumaticUpdater,
    convertKeyToName,
    emergencyStop,
    nextState,
    autoStateUpdater
}

// socket (for now temp will be replaced witha real sockets on function for now just retuns a random number)
let stateCounter = 0;

const socket = {
    on: (socketName, stateSetter) => {
        if(socketName === "getFids" || socketName === "getPnumatic") {
            stateSetter({topLeft: Math.floor(Math.random() * 20), topRight: Math.floor(Math.random() * 20), botLeft: Math.floor(Math.random() * 20), botRight: Math.floor(Math.random() * 20)});
        }
        else if(socketName === "getAutoState") {
            const possibleStates = ["Soft Start","Sensor Check","Hard Stop"];
            stateCounter++;
            if (stateCounter === 2) {
                stateCounter = 0;
            }
            stateSetter(possibleStates[stateCounter]);
        }
        else {
            stateSetter(Math.floor(Math.random() * 20))
        }
    }
}

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
    return true;
}

const nextState = () => {
    console.log("Next state");
    return true;
}



module.exports = {
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

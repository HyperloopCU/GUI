// socket (for now temp will be replaced witha real sockets on function for now just retuns a random number)
const socket = {
    on: (socketName, stateSetter) => socketName === "getFids" || socketName === "getPnumatic" ? stateSetter({ topLeft: Math.floor(Math.random() * 20), topRight: Math.floor(Math.random() * 20), botLeft: Math.floor(Math.random() * 20), botRight: Math.floor(Math.random() * 20) }) : stateSetter(Math.floor(Math.random() * 20))
};


// general updates state 
const GenericStateUpdater = (socketName, stateSetter) => socket.on(socketName, stateSetter);

//upadte states for specific use cases 
const currentSpeedUpdater = speedSetter => GenericStateUpdater("getSpeed", speedSetter);
const currentPositionUpdater = postionSetter => GenericStateUpdater("getPosition", postionSetter);
const currentFidsUpdater = fidSetter => GenericStateUpdater("getFids", fidSetter)
const encoderUpdater = encoderSetter => GenericStateUpdater("getEncoder", encoderSetter);
const pnumaticUpdater = pnumaticSetter => GenericStateUpdater("getPnumatic", pnumaticSetter);

// converts key names of type fooBarFooBar to Foo Bar Foo Bar
const convertKeyToName = str => str.split("").map((x, i) => x === x.toUpperCase() ? ` ${x}` : i === 0 ? x.toUpperCase() : x).join("");



const emergencyStop = () => {
    console.log("Pod is stopping");
    return true;
}


module.exports = {
    currentSpeedUpdater,
    currentPositionUpdater,
    currentFidsUpdater,
    encoderUpdater,
    pnumaticUpdater,
    convertKeyToName,
    emergencyStop

}
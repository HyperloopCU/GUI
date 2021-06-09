// import socket from "./localTesting.js"; // temp from testing 
import io from 'socket.io-client';
import react from 'react'; 
import axios from "axios";
const socket = io(); 

// general updates state
const genericStateUpdater = (socketName, stateSetter) => socket.on(socketName, stateSetter);

//update states for specific use cases
const currentSpeedUpdater = speedSetter => genericStateUpdater("getSpeed", speedSetter);
const currentPositionUpdater = postionSetter => genericStateUpdater("getPosition", postionSetter);
const currentFid1Updater = fidSetter => genericStateUpdater("getFid1", fidSetter);
const currentFid2Updater = fidSetter => genericStateUpdater("getFid2", fidSetter);
const encoderUpdater = encoderSetter => genericStateUpdater("getEncoder", encoderSetter);
const loadCellUpdater = loadCellSetter => genericStateUpdater("getLoadCell", loadCellSetter);
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


const nameHook = () => {
    const [names, setNames] = react.useState([]);
    const [loading, setLoading] = react.useState(true);

    react.useEffect(() => {
        const getNames = async () => {
            try {
                let {data} = await axios.get("http://localhost:8080/getNames");
                setNames(data.sort());
                setLoading(false);
            } catch { setLoading("Invalid"); }
        }
        getNames();
    }, []);

    return [names, loading];


}



export  {
    currentSpeedUpdater,
    currentPositionUpdater,
    currentFid1Updater,
    currentFid2Updater,
    encoderUpdater,
    pnumaticUpdater,
    loadCellUpdater,
    convertKeyToName,
    emergencyStop,
    nextState,
    autoStateUpdater,
    nameHook,
}

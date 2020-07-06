// template for outputting states. (these will be removed and put on the backend side of the code howewver for testing purposes it is included here )
const possibleStates = [ 
    {
        name: 'Startup',
        automatic: true,
        selected: false,
        subs: [
            { selected: false, name: 'Arm', automatic: true },
            { selected: false, name: 'Standby', automatic: false }
        ]
    },
    {
        name: 'Crawl',
        automatic: true,
        selected: false,
        subs: [
            {
                selected: false,
                name: 'Standby',
                automatic: false
            }
        ]

    },
    {
        name: 'Accelerate',
        automatic: true,
        selected: false,
        subs: [{ selected: false, name: 'Coast', automatic: true }, { selected: false, name: 'Soft Stop', automatic: true }, { selected: false,name: 'Wait', automatic: true }]

    }
]


const incrementState = ()=>{
    for(let i = 0; i<possibleStates.length; i++){
        if(possibleStates[i].selected){
            possibleStates[i].selected = false;
            possibleStates[i].subs[0].selected = true; 
            return [i,0]; 
        } else {
            for(let j = 0; j<possibleStates[i].subs.length; j++){
                if(possibleStates[i].subs[j].selected){
                    possibleStates[i].subs[j].selected = false; 
                    if(possibleStates[i].subs[j+1]){
                        possibleStates[i].subs[j+1].selected = true; 
                        return [i,j+1]; 
                    } else if(possibleStates[i+1]){
                        possibleStates[i+1].selected = true; 
                        return [i+1,null]; 
                    }
                }
            }
        }
    }
    possibleStates[0].selected = true; 
    return [0,null]; 
    

}

// socket (for now temp will be replaced witha real sockets on function for now just retuns a random number)
const socket = {
    on: (socketName, stateSetter) => {
        if(socketName === "getFids" || socketName === "getPnumatic") {
            stateSetter({topLeft: Math.floor(Math.random() * 20), topRight: Math.floor(Math.random() * 20), botLeft: Math.floor(Math.random() * 20), botRight: Math.floor(Math.random() * 20)});
        }
        else if(socketName === "getAutoState") {
            const nextState = incrementState(); 
            stateSetter(nextState);
        }
        else {
            stateSetter(Math.floor(Math.random() * 20))
        }
    }
}

export default socket; 
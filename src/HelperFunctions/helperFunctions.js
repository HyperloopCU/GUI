const curentSpeed = () => 20;
const currentPosition = () => 5;
const emergencyStop = ()=>{
    console.log("Pod is stopping");
    return true; 
}



module.exports = {
    curentSpeed, 
    currentPosition,
    emergencyStop

}
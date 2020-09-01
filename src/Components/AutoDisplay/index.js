import React from "react";
import DisplayText from "./DisplayText";
import States from "../States"
import states from "../States/states"; 
import { autoStateUpdater } from "../../HelperFunctions/helperFunctions.js";
import "./autoDisplay.css";

const AutoDisplay = ({ manual }) => {
  const [currentState, changeState] = React.useState([0,null]);

  React.useEffect(() => {
    autoStateUpdater(changeState);
    // document.addEventListener('click',e=>{
    //    autoStateUpdater(changeState);
    // });
  }, []);



//   return (
//       <div className="container">
//         <DisplayText state={currentState} />
//       </div>
//   );

  return (
      <div>
          {(()=>{
            if(manual){
                return (<div className="container">
                    <DisplayText state={currentState[1] == null ? states[currentState[0]].name : states[currentState[0]].subs[currentState[1]].name} />
                </div>)
            } else {
                return (
                    <States selected={currentState}/>
                )
            }
          })()}
      </div>
  )
};

export default AutoDisplay;

import React from 'react';
import ESTOP from './Components/ESTOP';
import Next from './Components/Next';
import Centerpiece from './Components/Centerpiece';
import AutoDisplay from './Components/AutoDisplay';

const App = () => (<div><ESTOP /> <Next /> <Centerpiece /> <AutoDisplay manual={false}/></div>);

export default App;

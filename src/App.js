import React from 'react';
import Splash from './Components/Splash';
import SearchLogs from './Components/SearchLogs'; 
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Splash />
            </Route>
            <Route path="/searchLogs">
                <SearchLogs />
            </Route>
        </Switch>
    </Router>
    
);

export default App;

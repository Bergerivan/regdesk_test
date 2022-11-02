import 'bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import './App.scss'
import React from "react";
import Toolbar from "./Toolbar";
import Widgets from "./Widgets";

const App = () => {
    return (
        <div className="p-3 d-flex flex-column" id={'app'}>
            <Toolbar />
            <Widgets />
        </div>
    );
}

export default App;

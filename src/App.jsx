import React , { Component } from "react";
// import PhaseOne from "./Components/PhaseOne.jsx";
// import PhaseTwo from "./Components/PhaseTwo.jsx";
import PhaseThree from "./Components/PhaseThree.jsx";

import "isomorphic-fetch";
import "es6-promise";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <React.Fragment>
                <PhaseThree />
            </React.Fragment>
        )
    }
}




import React, { Component } from 'react';
import MainContent from './comps/MainContent.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class DoD extends Component {
    constructor(){
        super();
        
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    WELCOME TO DOORS OF DOOM
                </div>
                <MainContent/>
            </div>
        );
    }
}

export default DoD;

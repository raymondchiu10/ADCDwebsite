import React, { Component } from 'react';
import HeaderNavBar from './HeaderNavBar.js';
import AboutUs from './AboutUs.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <div>
                <HeaderNavBar/>
            
                <div class="mainContentContainer">
    
                        <div id="playerSelect">
                            <AboutUs/>
                        </div>
            
                </div>
            </div>
        );
    }
}

export default App;

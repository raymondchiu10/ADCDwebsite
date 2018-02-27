import React, { Component } from 'react';
import AboutUs from './AboutUs.js';
import Chat from './Chat.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import mySocket from 'socket.io-client';

class Landing extends Component {
    render() {
        return (
            <div>
                <div className="mainContentContainer">
    
                        <div id="playerSelect">
                            <AboutUs />
                        </div>
            
                </div>
            
                <div>
                    <Chat/>
                </div>
            </div>
        );
    }
}

export default Landing;

import React, { Component } from 'react';
import HeaderNavBar from './HeaderNavBar.js';
import AboutUs from './AboutUs.js';
import Chat from './Chat.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import mySocket from 'socket.io-client';

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
            
                <div>
                    <Chat/>
                </div>
            </div>
        );
    }
}

export default App;

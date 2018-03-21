import React, { Component } from 'react';
import HeaderNavBar from './HeaderNavBar.js';
import AboutUs from './AboutUs.js';
import Chat from './Chat.js';
import Landing from './Landing.js';
import StickerBook from './StickerBook.js';
import DoorsOfDoom from './DoorsOfDoom.js';
import DiceHell from './DiceHell.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import mySocket from 'socket.io-client';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: "landing"
        }
        
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    
    handlePageChange(data) {
        let updateThis;
        
        switch(data){
            case "goingHome":
                updateThis = "landing";
                break;
            case "goingStickers":
                updateThis = "stickerBook";
                break;
            case "goingDoorsOfDoom":
                updateThis = "doorsOfDoom";
                break;
            case "goingDiceHell":
                updateThis = "diceHell";
                break;  
            default:
                updateThis = "landing";
                break;
        }
        
        this.setState({
            currentPage: updateThis
        });
        
    }
    
    render() {
        
        let comp;
        
        switch(this.state.currentPage){
            case "landing":
                comp = <Landing/>;
                break;
            case "stickerBook":
                comp = <StickerBook/>;
                break;
            case "doorsOfDoom":
                comp = <DoorsOfDoom/>;
                break;
            case "diceHell":
                comp = <DiceHell/>;
                break;
            default:
                comp = <Landing/>;
                break;
        }
        
        return (
            
            <div>
                <HeaderNavBar
                    handlePageChange = {this.handlePageChange}
                />
            
                {comp}
            </div>
        );
    }
}

export default App;

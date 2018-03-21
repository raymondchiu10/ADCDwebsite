import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class DiceRoomButtons extends Component {
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(data) {
        this.props.handleNameChange(data);
    }
    
    joinRoom(data){
        this.props.joinRoom(data);
    }

    render() {
        return (
            <div>
                <h1>Dice Hell</h1>
                <h2>Pick a name, then choose a room</h2>
                <input onChange={this.handleNameChange} type="text" placeholder="player name" />
                <div id="buttonContainer">
                    <button
                        id="roomButton1"
                        className="btn btn-success roomButton"
                        onClick={()=>this.joinRoom("room1")}
                    >
                        join room 1
                    </button>
                    <button
                        id="roomButton2"
                        className="btn btn-success roomButton"
                        onClick={()=>this.joinRoom("room2")}
                    >
                        join room 2
                    </button>
                </div>
            </div>
        );
    }
}

export default DiceRoomButtons;

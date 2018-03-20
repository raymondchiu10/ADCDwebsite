import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class EnterRoomButtons extends Component {
    constructor(){
        super();

        this.handleRoomSelection = this.handleRoomSelection.bind(this);
    }

    handleRoomSelection(data) {
        this.props.handleRoomSelection(data);
    }

    render() {
        return (
            <div>
                <div id="buttonContainer">
                    <button
                        id="roomButton1"
                        className="btn btn-success roomButton"
                        onClick={()=>this.handleRoomSelection("room1")}
                    >
                        join room 1
                    </button>
                    <button
                        id="roomButton2"
                        className="btn btn-success roomButton"
                        onClick={()=>this.handleRoomSelection("room2")}
                    >
                        join room 2
                    </button>
                </div>
            </div>
        );
    }
}

export default EnterRoomButtons;

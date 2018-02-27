import React, { Component } from 'react';

class Rooms extends Component {
    constructor(props){
        super(props);

        }

    render() {
        
        return (
            <div id="stickerRoomButtonsContainer">
                <button className="btn btn-success stickerRoomBtn" onClick={this.props.handleDisplay.bind(this, "room1")}>Room1</button>
                <button className="btn btn-success stickerRoomBtn" onClick={this.props.handleDisplay.bind(this, "room2")}>Room2</button>
                <button className="btn btn-success stickerRoomBtn" onClick={this.props.handleDisplay.bind(this, "room3")}>Room3</button>
                <button className="btn btn-success stickerRoomBtn" onClick={this.props.handleDisplay.bind(this, "room4")}>Room4</button>
                <button className="btn btn-success stickerRoomBtn" onClick={this.props.handleDisplay.bind(this, "room5")}>Room5</button>
            </div>
        );
    }
}

export default Rooms;

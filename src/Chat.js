import React, { Component } from 'react';
import HeaderNavBar from './HeaderNavBar.js';
import './coolproject.css';
import './chat.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import mySocket from 'socket.io-client';

class Chat extends Component {
    
    constructor(props){
        super(props);
        
        this.state ={
            chatBoxVisible: false,
            pressedJoin: false,
            enteredName: false,
            username: "",
            nameSubmitted: false,
            allnames: [],
            allmsgs: [],
            mymsg:""
        }
        
        this.handleChatBox = this.handleChatBox.bind(this);
        this.handleJoinButton = this.handleJoinButton.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameSubmission = this.handleNameSubmission.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
    }
    
    handleChatBox(){
        if(!this.state.chatBoxVisible){
            this.setState({
                chatBoxVisible: true
            });
        } else {
            this.setState({
                chatBoxVisible: false
            });
        }
    }
    
    handleJoinButton(){
        this.setState({
            pressedJoin: true
        });
    }
    
    handleNameChange(evt){
        this.setState({
            username: evt.target.value
        });
        console.log(this.state.username);
    }
    
    handleNameSubmission(){
        if(this.state.username == ""){
            alert("You must have a name!");
        } else {
            this.setState({
                nameSubmitted: true
            });
            
            this.sockets = mySocket("https://adcd-socket.herokuapp.com/");
            this.sockets.emit("uname", this.state.username);
            this.sockets.on("names", (data)=>{
                this.setState({
                    allnames:data
                });
            });
            this.sockets.on("msgs", (data)=>{
                this.setState({
                    allmsgs: data
                });
            });
        }
    }
    
    handleMyMsg(evt){
        this.setState({
            mymsg: evt.target.value
        });
    }
    
    sendMsg(){
        if(this.state.mymsg != ""){
            var msg = this.state.username + ": " + this.state.mymsg;
            
            this.sockets.emit("sendmsg", msg);
        }
    }
    
    render() {
        var chatArrow;
        var joinChatButton;
        var chatContainerDivId;
        
        if(!this.state.chatBoxVisible){
            chatArrow = <img id="chatArrow" className="float-right" src={require("./assets/images/triangleU.png")} onClick={this.handleChatBox}/>;
            
            chatContainerDivId = "chatContainerDivIdHidden";
            
        } else {
            chatArrow = <img id="chatArrow" className="float-right" src={require("./assets/images/triangleD.png")} onClick={this.handleChatBox}/>;
            
            chatContainerDivId = "chatContainerDivIdVisible";
        }
        
        var chatDisplay;
        var controlsDisplay;
        
        if(!this.state.pressedJoin && !this.state.enteredName){
            chatDisplay = <button id="joinChatButton" className="btn btn-success" onClick={this.handleJoinButton}>Join Chat</button>;
        } else if(this.state.pressedJoin && !this.state.enteredName){
            chatDisplay =
                <div id="nameAndConfirmButton">
                    <div className="confirmNameRow">
                        <input type="text" placeholder="Enter your name" onChange={this.handleNameChange} className="col-lg-12 col-md-12 col-sm-12"/>
                    </div>
                    <div className="confirmNameRow">
                        <button onClick={this.handleNameSubmission} id="confirmNameButton" className="col-lg-4 col-md-4 col-sm-4 btn btn-success">Confirm</button>
                    </div>
                </div>
        }
       
        if(this.state.nameSubmitted){
            
            var allmsgs = this.state.allmsgs.map((obj, i)=>{
                return (
                    <div key={i}>
                        {obj}
                    </div>
                )
            })
            
            chatDisplay = (
                <div id="chatBox">
                    <div id="chatDisplay">{allmsgs}</div>
                    
                </div>
            );
            
            controlsDisplay = (
                <div id="controls">
                    <input type="text" placeholder="type your message here" onChange={this.handleMyMsg} className="col-lg-9 col-md-9 col-sm-9 col-xs-9" id="msgInput"/>
                    <button onClick={this.sendMsg} className="col-lg-3 col-md-3 col-sm-3 col-xs-3 btn btn-primary" id="sendMsgButt">SEND</button>
                </div>
            );
        }

        return (
            <div id={chatContainerDivId} className="col-lg-4 col-md-5 col-sm-12 float-right chatContainerDiv">
                <div className="row" id="chatTitle">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        Chat Box
                        {chatArrow}
                    </div>
                </div>
                <div className="chatBoxAnimation" id="chatContent">
                    {chatDisplay}
                </div>
                {controlsDisplay}
            </div>
        );
    }
}

export default Chat;

import React, { Component } from 'react';
import './App.css';
import mySocket from 'socket.io-client';

class App extends Component {
// npm install socket.io-client --save
    
    constructor(props){
        super(props);
        
        this.state = {
            myname: "",
            mode:0,
            allnames: [],
            allmsgs: [],
            mymsg:""
        }
        
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
    }
    
    componentDidMount(){
//        this.sockets = mySocket("http://localhost:10001");
    }
    
    joinChat(){
        if(this.state.myname != ""){
            this.setState({
                mode: 1
            });
            
            this.sockets = mySocket("https://adcd-socket.herokuapp.com");
            this.sockets.emit("uname", this.state.myname);
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
    
    handleNameChange(evt){
        this.setState({
            myname: evt.target.value
        });
    }
    
    handleMyMsg(evt){
        this.setState({
            mymsg: evt.target.value
        });
    }
    
    sendMsg(){
        if(this.state.mymsg != ""){
            var msg = this.state.myname + ": " + this.state.mymsg;
            
            this.sockets.emit("sendmsg", msg);
        }
    }
    
    render() {
        var comp = null;
        
        var allmsgs = this.state.allmsgs.map((obj, i)=>{
            return (
                <div key={i}>
                    {obj}
                </div>
            )
        })
            
        comp = (
            <div id="chatBox">
                <div id="chatDisplay">{allmsgs}</div>
                <div id="controls">
                    <input type="text" placeholder="type your message here" onChange={this.handleMyMsg}/>
                    <button onClick={this.sendMsg}>SEND</button>
                </div>
            </div>
        );
    }
        
        return (
            <div className="App">
                {comp}
            </div>
        );
    }
}

export default App;

import React, { Component } from 'react';
import mySocket from "socket.io-client"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DiceRoomButtons from "./comps/DiceRoomButtons";


class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            mode: -1,
            name: "",
            users: [],
            isFirst: false,
            firstroll: null,
            firstRollNum: null,
        }
        this.joinRoom = this.joinRoom.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.setPriority = this.setPriority.bind(this);
        this.rollNumber = this.rollNumber.bind(this);
    }
    
    componentDidMount(){
        this.socket = mySocket("https://dicesocket.herokuapp.com/");

        this.socket.on("Diceuserjoined", (data)=>{
            console.log("made it to userjoined");

            this.setState({
                users: data
            }, ()=>{
                if(this.state.users.length >= 2){
                    this.setState({
                        mode: 1
                    });
                };
            });
        });
        
        this.socket.on("DiceGoFirst", ()=>{
            this.setState({
                mode: 2
            });
        });
        this.socket.on("DiceDcd", (data)=>{
            this.setState({
                users: data
            }, ()=>{
                if(this.state.users.length <= 1){
                    this.setState({
                        mode: 0
                    });
                };
            });
        });
        this.socket.on("DiceRolled", (data)=>{
            this.setState({
                firstRollNum: data
            })
        });
    }
    
    joinRoom(roomDest){
        
        if(this.state.name !== "") {
            this.setState({
                mode: 0
            });
            
            let obj = {
                room: roomDest,
                name: this.state.name
            }
            console.log(obj);
            this.socket.emit("Dicejoinroom", obj);
        }
    }  

    handleNameChange(evt){
        this.setState({
            name:evt.target.value
        })
    }
    
    setPriority(){
        this.setState({
            isFirst: true
        }, ()=>{
            this.socket.emit("DiceFirst");
            this.setState({
                mode: 2
            });
        });
    }
    
    rollNumber(){
        let num = Math.floor((Math.random() * 6) + 1);
        
        this.setState({
            firstroll: num
        });
        
        this.socket.emit("rolled", num);
    }
    
    render() {
        
        let users = this.state.users.map((obj, i)=>{
            return(
                <div key={i}>
                    {obj}
                </div>
            )
        });
        
        let comp;
        
        switch(this.state.mode){
            case -1:
                comp = (
                    <div>
                        <DiceRoomButtons
                            joinRoom = {this.joinRoom}
                            handleNameChange = {this.handleNameChange}
                        />
                    </div>
                );
                break;
            case 0:    
                comp = (
                    <div className="">
                    <h1>Dice Hell</h1>
                    <h2>Waiting on another player</h2>

                        <div>
                            Users in this room:
                        </div>
                        <div>
                            {users}
                        </div>        
                    </div>
                );
                break;
            case 1:
                comp = (
                    <div className="">
                    <h1>Dice Hell</h1>
                    <h2>Choose to go first</h2>
                        <button onClick={this.setPriority} className="btn btn-success">Go First</button>
                        <div>
                            Users in this room:
                        </div>
                        <div>
                            {users}
                        </div>        
                    </div>          
                );
            default:
        };
    
    if(this.state.mode === 2 && this.state.isFirst){
        
        let confirmButton;
        
        if(this.state.firstroll !== null){

            confirmButton = (
                <button onClick={this.confirmRoll}>
                    CONFIRM
                </button>
            );
        }
        
        comp = (
            <div>
            <h1>Dice Hell</h1>
            <h2>Roll a Number</h2>
                <button onClick={this.rollNumber} className="btn btn-success">Roll a number</button>
                <div>
                    Users in this room:
                </div>
                <div>
                    {users} {this.state.firstRollNum}
                </div>
            </div>          
        );
    } else if(this.state.mode === 2 && !this.state.isFirst) {
        comp = (
            <div className="">
            <h1>Dice Hell</h1>
            <h2>Wrecked, wait your turn</h2>
                <div>
                    Users in this room:
                </div>
                <div>
                    {users}
                </div>        
            </div>          
        );        
    }

    return (
        <div className="container App">
            {comp}
        </div>
    );
  }
}

export default App;

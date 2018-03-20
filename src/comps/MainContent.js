import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import EnterRoomButtons from "./EnterRoomButtons";

class MainContent extends Component {
    constructor(){
        super();
        this.state = {
            mode: -1,
            name: "",
            users: [],
            isHost: false,
            hostDoor: null,
            hostDoorConfirmed: false,
            correctDoor: null,
            tempGuessDoor: null,
            correctStreak: 0,
            correctGuess: null,
            hasGuessed: false,
            round: 1,
            receivedGuesses: 0,
            LostPlayers: 0,
            everyoneOut: false,
            currentPlayerOut: false
        }
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRoomSelection = this.handleRoomSelection.bind(this);
        this.setHost = this.setHost.bind(this);
        this.handleHostDoorSelection = this.handleHostDoorSelection.bind(this);
        this.confirmHostDoor = this.confirmHostDoor.bind(this);
        this.handleDoorGuess = this.handleDoorGuess.bind(this);
        this.confirmGuessedDoor = this.confirmGuessedDoor.bind(this);
        this.handleCorrectGuess = this.handleCorrectGuess.bind(this);
        this.handleWrongGuess = this.handleWrongGuess.bind(this);
        this.checkIfNextRound = this.checkIfNextRound.bind(this);
        this.checkIfGameOver = this.checkIfGameOver.bind(this);
        this.returnToLobby = this.returnToLobby.bind(this);
    }
    
    componentDidMount() {
        this.socket = mySocket("https://dodsocket.herokuapp.com/");
        
        this.socket.on("DoDuserjoined", (data)=>{
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
        
        this.socket.on("DoDconfirmHost", ()=>{
            this.setState({
                mode: 2
            });
        });
        
        this.socket.on("DoDreceivedHostDoor", (data)=>{
            this.setState({
                correctDoor: data,
                hasGuessed: false,
                tempGuessDoor: null
            }, ()=>{
                console.log("we passed the hosts door to all the other players, it is:", data);
            });
        });
        
        this.socket.on("DoDreceiveGuess", ()=>{
            console.log("made it to receiveGuess");
            let tempGuesses = this.state.receivedGuesses;
            tempGuesses++;
            
            this.setState({
                receivedGuesses: tempGuesses
            }, ()=>{
                this.checkIfNextRound();
            });
        });
        
        this.socket.on("DoDlostPlayer", ()=>{
            let tempLostPlayers = this.state.LostPlayers;
            tempLostPlayers++;
            
            this.setState({
                LostPlayers: tempLostPlayers
            }, ()=>{
                this.checkIfGameOver();
            });
        });
        
        this.socket.on("DoDresetAllStateVariables", ()=>{
            this.setState({
                mode: -1,
                name: "",
                users: [],
                isHost: false,
                hostDoor: null,
                hostDoorConfirmed: false,
                correctDoor: null,
                tempGuessDoor: null,
                correctStreak: 0,
                correctGuess: null,
                hasGuessed: false,
                round: 1,
                receivedGuesses: 0,
                LostPlayers: 0,
                everyoneOut: false,
                currentPlayerOut: false
            });
        });
        
        this.socket.on("DoDsomeoneDcd", (data)=>{
            this.setState({
                users: data
            }, ()=>{
                if(this.state.users.length <= 1){
                    this.setState({
                        mode: 0
                    });
                };
            });
        })
    }
    
    handleNameChange(evt) {
        this.setState({
            name: evt.target.value
        });
    }
    
    handleRoomSelection(roomDest) {
        if(this.state.name !== "") {
            this.setState({
                mode: 0
            });
            
            let obj = {
                room: roomDest,
                name: this.state.name
            }
            
            this.socket.emit("DoDjoinroom", obj);
        }
    }
    
    setHost() {
        this.setState({
            isHost: true
        }, ()=>{
            this.socket.emit("DoDchoseHost");
            this.setState({
                mode: 2
            });
        });
    }
    
    handleHostDoorSelection(selectedDoor) {
        this.setState({
            hostDoor: selectedDoor
        });
    }
    
    confirmHostDoor() {
        console.log("we have confirmed the door as:", this.state.hostDoor);
        
        this.setState({
            hostDoorConfirmed: true,
            receivedGuesses: 0
        }, ()=>{
            this.socket.emit("DoDconfirmHostDoor", this.state.hostDoor);
        });
    }
    
    handleDoorGuess(guess) {
        console.log("handle door guess", guess);
        this.setState({
            tempGuessDoor: guess
        });
    }
    
    confirmGuessedDoor(){
        if(this.state.correctDoor === this.state.tempGuessDoor){
            console.log("correct guess");
            this.handleCorrectGuess();
        } else {
            console.log("incorrect guess");
            this.handleWrongGuess();
        };
        
        this.socket.emit("DoDsubmitGuess");
    }
    
    handleCorrectGuess() {
        let tempCount = this.state.correctStreak;
        tempCount++;
        this.setState({
            correctStreak: tempCount,
            correctGuess: true,
            hasGuessed: true
        });
    }
    
    handleWrongGuess() {
        this.setState({
            correctGuess: false,
            hasGuessed: true,
            currentPlayerOut: true
        }, ()=>{
            this.socket.emit("DoDwrongGuess");
        });
    }
    
    checkIfNextRound() {
        console.log("made it to check next round");
        console.log("user length:", this.state.users.length);
        console.log("received guesses:", this.state.receivedGuesses);
        if((this.state.users.length - 1) === (this.state.receivedGuesses + this.state.LostPlayers)){
            console.log("1");
            let tempRound = this.state.round;
            tempRound++;
            
            this.setState({
                round: tempRound,
                hostDoor: null,
                hostDoorConfirmed: false
            });
        }
    }
    
    checkIfGameOver() {
        console.log("made it to check if gameover");
        if((this.state.users.length - 1) === this.state.LostPlayers){
            console.log("everyone is out");
            this.setState({
                everyoneOut: true
            });
        }
    }
    
    returnToLobby() {
        this.socket.emit("DoDresetGame");
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
                        <input type="text" placeholder="your name" onChange={this.handleNameChange}/>
                        <EnterRoomButtons
                            handleRoomSelection = {this.handleRoomSelection}
                        />
                    </div>
                );
                break;
            case 0:
                comp = (
                    <div>
                        <div>
                            This is the waiting room. Once there are at least two of you, and one of you chooses to be the host, the game will begin.
                        </div>
                        <br/>
                        <div>
                            <div>
                                Users in this room:
                            </div>
                            <div>
                                {users}
                            </div>
                        </div>
                    </div>
                );
                break;
            case 1:
                comp = (
                    <div>
                        <div>
                            This is the waiting room. Once there are at least two of you, and one of you chooses to be the host, the game will begin.
                        </div>
                        <br/>
                        <div>
                            <button onClick={this.setHost}>
                                I want to be host!
                            </button>
                        </div>
                        <br/>
                        <div>
                            <div>
                                Users in this room:
                            </div>
                            <div>
                                {users}
                            </div>
                        </div>
                    </div>
                );
                break;
        };
        
        if(this.state.mode === 2 && this.state.isHost){
            
            let confirmMsg;
            let confirmButton;
            
            if(this.state.hostDoor !== null){
                
                if(this.state.hostDoor === "left"){
                    confirmMsg = (
                        <div>
                            you have chosen the LEFT door
                        </div>
                    );
                } else if(this.state.hostDoor === "right"){
                    confirmMsg = (
                        <div>
                            you have chosen the RIGHT door
                        </div>
                    );
                }
                
                confirmButton = (
                    <button onClick={this.confirmHostDoor}>
                        CONFIRM
                    </button>
                );
            }
            
            let round = this.state.round;
            
            comp = (
                <div>
                    <div>
                        Please select which door will be the safe one this round. This is round {round}.
                    </div>
                    <div>
                        <button onClick={()=>this.handleHostDoorSelection("left")}>
                            LEFT
                        </button>
                        <button onClick={()=>this.handleHostDoorSelection("right")}>
                            RIGHT
                        </button>
                    </div>
                    <div>
                        {confirmMsg}
                        {confirmButton}
                    </div>
                </div>
            );
        
        //once the door is confirmed but waiting for everyone to make answers
        
            let confirmedAndSentDoor = this.state.hostDoor;
        
            if(this.state.hostDoorConfirmed){
                comp = (
                    <div>
                        <div>
                            As the host, you chose {confirmedAndSentDoor} as the safe door.
                        </div>
                        <div>
                            Please wait while all the other players take their guesses.
                        </div>
                    </div>
                );
            }
        
        //handling everyone being out
        
            if(this.state.everyoneOut){
                comp = (
                    <div>
                        <div>
                            Everyone has lost.
                        </div>
                        <div>
                            As the host, you lasted {round} round(s).
                        </div>
                        <button onClick={this.returnToLobby}>
                            Reset Game
                        </button>
                    </div>
                );
            }
        
        } else if(this.state.mode === 2 && !this.state.isHost){
            
                let streak;
                streak = this.state.correctStreak;
                let round = this.state.round;
            
                comp = (
                    <div>
                        Please wait while the host makes a decision...
                    </div>
                );
            
                if(this.state.correctDoor !== null){

                    let confirmGuessMsg;
                    let confirmGuessBtn;

                    if(this.state.tempGuessDoor !== null){
                        if(this.state.tempGuessDoor === "left"){
                            confirmGuessMsg = (
                                <div>
                                    You are about to guess the LEFT door
                                </div>
                            );
                        } else if(this.state.tempGuessDoor === "right"){
                            confirmGuessMsg = (
                                <div>
                                    You are about to guess the RIGHT door
                                </div>
                            );
                        }

                        confirmGuessBtn = (
                            <button onClick={this.confirmGuessedDoor}>
                                CONFIRM
                            </button>
                        )
                    }

                    comp = (
                        <div>
                            <div>
                                Alright! time to guess! which is the safe door?
                            </div>
                            <div>
                                <button onClick={()=>this.handleDoorGuess("left")}>
                                    LEFT
                                </button>
                                <button onClick={()=>this.handleDoorGuess("right")}>
                                    RIGHT
                                </button>
                            </div>
                            <div>
                                {confirmGuessMsg}
                                {confirmGuessBtn}
                            </div>
                        </div>
                    );

                   
                    
            
                    if(this.state.hasGuessed){
                        if(this.state.correctGuess){
                            comp = (
                                <div>
                                    <div>
                                        Congratulations!! You have survived this round of Doors of Doom.
                                    </div>
                                    <div>
                                        Your streak is: {streak}, keep it up!!
                                    </div>
                                    <div>
                                        Please wait for all other players to make their selections, and then for the host to make the next rounds decision
                                    </div>
                                </div>
                            );
                        } else {
                            comp = (
                                <div>
                                    <div>
                                        So close, but you lose.
                                    </div>
                                    <div>
                                        Your streak was: {streak}. You can either leave or wait for the game to restart
                                    </div>
                                    <div>
                                        Please wait for all other players to make their selections, and then for the host to make the next rounds decision
                                    </div>
                                </div>
                            );
                        }
                    }
                }
    
                if(this.state.currentPlayerOut){
                    comp = (
                        <div>
                            <div>
                                So close, but you lose.
                            </div>
                            <div>
                                Your streak was: {streak}. You can either leave or wait for the game to restart
                            </div>
                            <div>
                                Please wait for all other players to make their selections, and then for the host to make the next rounds decision
                            </div>
                        </div>
                    );
                }
    
                if(this.state.everyoneOut){
                    comp = (
                        <div>
                            <div>
                                Everyone has lost.
                            </div>
                            <div>
                                As a player, you lasted {streak} round(s).
                            </div>
                            <div>
                                Please wait for the host to reset the game. Then maybe you can be the host!
                            </div>
                        </div>
                    );
                }
            }

        return (
            <div>
                {comp}
            </div>
        );
    }
}


export default MainContent;
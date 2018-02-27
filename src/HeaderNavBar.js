import React, { Component } from 'react';
import './coolproject.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//<div id="headerBG">
//</div>

class HeaderNavBar extends Component {
    constructor(props){
        super(props);
        
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    
    handlePageChange(data){
        this.props.handlePageChange(data);
    }
    
    render() {
        return (
            <div id="headerContainer">
            
                
                
                <div id="navBar" className="col-lg-10 col-md-10 col-sm-12 offset-lg-1 offset-md-1 offset-sm-0">
                    <div onClick={()=>this.handlePageChange("goingHome")} className="navBarItem">
                        Home
                    </div>
                    <div onClick={()=>this.handlePageChange("goingStickers")} className="navBarItem">
                        Sticker Book
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderNavBar;

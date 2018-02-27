import React, { Component } from 'react';
import './coolproject.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class AboutUs extends Component {
    render() {
        return (
            <div>
            <div className="whiteText pictureBlockParent">
                <div className="pictureBlock genericMiddleContent">
            
                    <h1 className="PageTitle">
                        Who are we?
                    </h1>
            
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 pageDescription text-center">
                            Web and Mobile developers with influences from classic video games and gaming culture.
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h2 className="playerName">Raymond</h2>
                            <div id="raymond" className="dummyImg"></div>
                            <div className="playerBlurb">
                                This is Raymond Chiu, A Developer of this team. currently, he is in school for Digital Design and Development. He likes long walks on the beach with his parents...? He also likes arts and crafts and cats and things.
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <h2 className="playerName">Spencer</h2>
                            <div id="spencer" className="dummyImg"></div>
                            <div className="playerBlurb">
                                This is Spencer Gray, A developer of this team. Currently, he is in the process of getting a Bachelors of Business Administration. His plans involve cargo throwing kids so hard, they start internships at Amazon.
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>
            
            <div className="whiteText detailsBlockParent">
                <div className="detailsBlock genericMiddleContent">
                    
                    <div className="text-center">
                        <div id="whatWeDoH1" >What is this?</div>
                        <div id="whatWeDoDesc">
                            We wish we knew.
                        </div>
                        <a href="https://www.youtube.com/watch?v=j_6hL_FxW-s" target="_blank">
                            <button id="blankButton" className="btn">This button does nothing.</button>
                        </a>
                    </div>
            
                </div>
            </div>
            
            <div className="whiteText block3BlockParent">
                <div className="block3Block genericMiddleContent">
                    
                    <div id="goodbyeDiv" className="text-center">
                        <div id="goodbyeH1">
                            Well, thanks for visiting.
                        </div>
                        <div id="goodbyeDesc">
                            But you should probably leave now.
                        </div>
                        <div id="goodbyeDescSmall">
                            (or else).
                        </div>
                        <img id="pixelAppliances" src={require("./assets/images/appliances_pixels.png")}/>
                    </div>
                
                </div>
            </div>
            
            </div>
        );
    }
}

export default AboutUs;

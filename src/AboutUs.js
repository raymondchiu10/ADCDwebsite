import React, { Component } from 'react';
import './coolproject.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class AboutUs extends Component {
    render() {
        return (
            <div>
            <div class="whiteText pictureBlockParent">
                <div class="pictureBlock genericMiddleContent">
            
                    <h1 class="PageTitle">
                        Who are we?
                    </h1>
            
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 pageDescription text-center">
                            Web and Mobile developers with influences from classic video games and gaming culture.
                        </div>
                    </div>
                
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <h2 class="playerName">Raymond</h2>
                            <div id="raymond" class="dummyImg"></div>
                            <div class="playerBlurb">
                                This is Raymond Chiu, A Developer of this team. currently, he is in school for Digital Design and Development. He likes long walks on the beach with his parents...? He also likes arts and crafts and cats and things.
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <h2 class="playerName">Spencer</h2>
                            <div id="spencer" class="dummyImg"></div>
                            <div class="playerBlurb">
                                This is Spencer Gray, A developer of this team. Currently, he is in the process of getting a Bachelors of Business Administration. His plans involve cargo throwing kids so hard, they start internships at Amazon.
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>
            
            <div class="whiteText detailsBlockParent">
                <div class="detailsBlock genericMiddleContent">
                    
                    <div class="text-center">
                        <div id="whatWeDoH1" >What is this?</div>
                        <div id="whatWeDoDesc">
                            We wish we knew.
                        </div>
                        <a href="https://www.youtube.com/watch?v=j_6hL_FxW-s" target="_blank">
                            <button id="blankButton" class="btn">This button does nothing.</button>
                        </a>
                    </div>
            
                </div>
            </div>
            
            <div class="whiteText block3BlockParent">
                <div class="block3Block genericMiddleContent">
                    
                    <div id="goodbyeDiv" class="text-center">
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

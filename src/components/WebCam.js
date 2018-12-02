import React, { Component } from 'react';
import Webcam from 'react-webcam';

class UserCam extends Component{

    constructor(props){
        super(props);
        this.state = { screenshot: null }
        this.screenshot = this.screenshot.bind(this);
    }
   

    // this is the area I'm having issues with. Thanks!
    screenshot() {
        var screenshot = this.refs.webcam.getScreenshot();
        this.setState({screenshot: screenshot});
      }

    render(){

        return (
            <div>   
             {<Webcam audio ={false} width={80} height={60} ref='webcam'/> }
             <button onClick={this.screenshot}>Capture</button>
             { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
            </div>
            )
    }
}

export default UserCam;

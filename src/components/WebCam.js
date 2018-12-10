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
            <div className='col-lg-10 col-lg-offset-1'> 
                <div className='streaming-block row'> 
                    <div className='video-pn col-xs-4 col-md-4'>{<Webcam audio ={false} width={120} height={80} ref='webcam'/> }</div>
                    <div className='col-xs-4 col-md-4'><button onClick={this.screenshot}className='capture-btn-pn'>Crea tu avatar</button></div>
                    <div className='capture-pn col-xs-4 col-md-4'>{ this.state.screenshot ? <img src={this.state.screenshot} /> : null }</div>
                </div>
            </div>
        )
    }
}

export default UserCam;

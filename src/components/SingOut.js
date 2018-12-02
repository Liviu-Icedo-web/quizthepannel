import React from 'react';

class SingOut extends React.Component { 
    /* ------ ----- ------*/ 
    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        this.props.onSignIn(username)
      }
   /* ------ ----- ------*/ 
    render() {
        console.log('welcome State',this.state)
        console.log('welcome Props',this.props);
        
        return (     
                                <div className='singOut singOut-btn'>
                                        <a href="javascript:;" onClick={this.props.onSignOut}>Muchas Gracias!!!</a>
                                </div>
                       
        );
    }
}

export default SingOut
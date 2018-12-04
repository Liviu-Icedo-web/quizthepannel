import React from 'react';

class Welcome extends React.Component { 
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
                                <div className='welcome'>
                                    <p>Bienvenido <span className='userName'>{this.props.user.username}</span> !</p>
                                        <p><a href="javascript:;" onClick={this.props.onSignOut}>Salir</a></p>
                                </div>
                       
        );
    }
}

export default Welcome
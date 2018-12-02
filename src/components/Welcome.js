import React from 'react';

class Welcome extends React.Component { 
    /* ------ ----- ------*/ 
    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        this.props.onSignIn(username)
      }
   /* ------ ----- ------*/ 
    render() {
        console.log('welcome State',this.state)
        console.log('welcome Props',this.props);
        
        return (     
                                <div>
                                    Welcome <strong>{this.props.user.username}</strong>!
                                        <a href="javascript:;" onClick={this.props.onSignOut}>Salir</a>
                                </div>
                       
        );
    }
}

export default Welcome
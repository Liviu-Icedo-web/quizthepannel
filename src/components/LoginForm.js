import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: 'Please sign in',
            user: {
                username:'',
                password:''
              }
        };
        
        this.handleSignIn = this.handleSignIn.bind(this)
    }
    

    /* ------ ----- ------*/ 
    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        let password = this.refs.password.value
        this.props.onSignIn(username, password)
      }
   /* ------ ----- ------*/ 
    render() {
       
        let { title, text, buttonText } = this.state;
        
        let { style } = this.props;
        
        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="popup">
                            <h1>{title}</h1>
                            <form onSubmit={this.handleSignIn}>
                                <h3>Sign in</h3>
                                <input type="text" ref="username" placeholder="enter you username" />
                                <input type="password" ref="password" placeholder="enter password" />
                                <input type="submit" value="Login" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm
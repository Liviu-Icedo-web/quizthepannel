import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: 'Crea tu usuario',
            user: {
                username:''
              }
        };
        
        this.handleSignIn = this.handleSignIn.bind(this)
    }
    

    /* ------ ----- ------*/ 
    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        this.props.onSignIn(username)
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
                                <input type="text" ref="username" placeholder="nombre" />
                                <input type="submit" value="Entrar" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm
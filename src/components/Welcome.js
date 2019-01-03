import React from 'react';

class Welcome extends React.Component { 
    constructor(props){
        super(props);

        this.nrScore=this.nrScore.bind(this);
    }
    /* ------ ----- ------*/ 
    handleSignIn(e) {
        e.preventDefault()
        let username = this.refs.username.value
        this.props.onSignIn(username)
      }
   /* ------ ----- ------*/ 

   nrScore(){
       if(this.props.score >0){
          return (<p>Respuestas Correctas: {this.props.score}</p>);
       }
   }
    render() { 
        return (     
                                <div className='row welcome-block'>
                                    <div className='col-xs-7 col-md-8 welcome'>Bienvenido <span className='userName'>{this.props.user.username}</span> ! {this.nrScore()}</div>
                                        <div className='col-md-2 out'><a href='https://www.thepannel.tv/live/'> Concursantes | </a><a href="javascript:;" onClick={this.props.onSignOut}>Salir</a></div>
                                </div>
                       
        );
    }
}

export default Welcome
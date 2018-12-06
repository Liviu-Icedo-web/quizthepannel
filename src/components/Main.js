import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown-now';
import axios from 'axios';
import data from '../data/data';
import Answers from './Answers';
import Popup from './Popup';
import Footer from './Footer';
import LoginForm from './LoginForm';
import Welcome from './Welcome';
import SingOut from './SingOut';
import UserCam from './WebCam';
import QuestionsPannel from './QuestionsPannel';
import PreparText from './PreparText';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nr: 0,
            total: data.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            user:null,
            wrongAnswer: false,
            userThePannel: false,  
            idQ:1,
            questions:[],
            countDownQ: false
           

        }
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.signIn= this.signIn.bind(this);
        this.signOut=this.signOut.bind(this);
        this.quitUser=this.quitUser.bind(this);
        this.checkWrongAnswer=this.checkWrongAnswer.bind(this);
        this.checkAdmin =this.checkAdmin.bind(this);
        this.pannelFunc=this.pannelFunc.bind(this);
        this.renderer = this.renderer.bind(this);
       
    }

    pushData(nr) {
        this.setState({
            question: data[nr].question,
            answers: [data[nr].answers[0], data[nr].answers[1], data[nr].answers[2], data[nr].answers[3] ],
            correct: data[nr].correct,
            nr: this.state.nr + 1
        });
    }

    componentWillMount() {
        let { nr } = this.state;
        this.pushData(nr);
        this.getQuestions();
        //setInterval(()=>{this.getLaunchIdQ()},1000)
        
    }

    componentDidUpdate(oldProps,oldState){
        const newState = this.state  
        if(oldState.user !== newState.user) {
            this.checkAdmin();
            this.setState({
                countDownQ:false
            })
        }
        if(oldState.idQ !== newState.idQ) {
            console.log('ENTRAAAA')
        this.setState({
           idQ:newState.idQ,
           question: data[newState.idQ].question,
           answers: [data[newState.idQ].answers[0], data[newState.idQ].answers[1], data[newState.idQ].answers[2] ],
           correct: data[newState.idQ].correct,
           questionAnswered:false,
           countDownQ:true
          })
          
        }
    }

    getQuestions(){
        axios.get('/Questions.json')
            .then(response => {
                this.setState({
                    questions:response.data
            })
        })
        .catch(error => {
        })
    }

    getLaunchIdQ(){
        axios.get('http://localhost:4000/LaunchQuestions.json').then(response =>{
            this.setState({
                idQ:response.data.idQ
            })
        })
    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            nr: 1
        });
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
    }

    // App "actions" (functions that modify state)
    signIn(username) {
    // This is where you would call Firebase, an API etc...
    // calling setState will re-render the entire app (efficiently!)
    this.setState({
        user: {
            username
            }
        })
    }
  
    signOut() {
        // clear out user from state
        this.setState({user: null})
        window.location.reload();
    }

    quitUser(){
        this.setState({
            user:null
        })        
    }

    checkWrongAnswer(){
        this.setState({
            wrongAnswer:true
        })
    }

    checkAdmin(){
        const userThePannel = this.state.user ? this.state.user.username: null
        console.log(userThePannel)
        if(userThePannel === 'userThePannel'){
           this.setState({
                userThePannel:true
            })
        }
        
    }

    pannelFunc(){
        return(
            <div>
            <QuestionsPannel/>
            </div>
        );
    }
    
    completQuestion (){
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score,wrongAnswer,userThePannel,pannelFunc,countDownQ} = this.state;
        return(
            <Answers answers={answers} correct={correct} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}  quitUser={this.quitUser} checkWrongAnswer ={this.checkWrongAnswer}/>
        );
    } 

// Renderer callback with condition
  renderer = ({ seconds, completed}) => {
  if (completed) {
    // Render a complete state
    return this.completQuestion();
  } else {
    // Render a countdown
    return <span>Preparate, la pregunta aparecera en : {seconds}</span>;
  }
};


    render() {
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score,wrongAnswer,userThePannel,pannelFunc,countDownQ} = this.state;
        console.log('Main',this.state)
        console.log('MainProps',this.props)
        console.log('Rendered',this.renderer)
        console.log('---- CAMBIA COUNT -----',this.state.countDownQ)
        return (
            <div className="container">
            
                {(this.state.user) ? 
                                    <React.Fragment>
                                        <Welcome user={this.state.user} onSignOut={this.signOut.bind(this)}/>
                                        {userThePannel  ?   <div>{this.pannelFunc()}</div>
                                                        :
                                                           
                                                           <div className="row">
                                                           {!countDownQ ?
                                                                        <div>
                                                                        <UserCam/>
                                                                        <PreparText />
                                                                        <Countdown date={Date.now() + 5000} renderer={this.renderer} />
                                                                        <div className="col-lg-10 col-lg-offset-1">
                                                                            <div id="submit">
                                                                                {wrongAnswer    ?   <SingOut onSignOut={this.signOut.bind(this)}/>
                                                                                                :
                                                                                                showButton  ?   <button className="fancy-btn" onClick={this.nextQuestion} >{nr===total ? 'Finish quiz' : 'Next question'}</button> 
                                                                                : null}
                                                                            </div>
                                                                        </div></div>
                                                                        
                                                                        :null}
                                                            
                                                            </div>
                                        }                
                                    </React.Fragment>
                    :<LoginForm onSignIn={this.signIn.bind(this)}/>}     
                <Footer />
            </div>
        );
    }
};

export default Main
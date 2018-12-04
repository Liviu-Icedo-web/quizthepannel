import React from 'react';
import data from '../data/data';
import Answers from './Answers';
import Popup from './Popup';
import Footer from './Footer';
import LoginForm from './LoginForm';
import Welcome from './Welcome';
import SingOut from './SingOut';
import UserCam from './WebCam';
import QuestionsPannel from './Questions';

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
            userThePannel: false

        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.signIn= this.signIn.bind(this);
        this.signOut=this.signOut.bind(this);
        this.quitUser=this.quitUser.bind(this);
        this.checkWrongAnswer=this.checkWrongAnswer.bind(this);
        this.checkUserthePannel =this.checkUserthePannel.bind(this);
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
    }

    componentDidUpdate(oldProps,oldState){
        const newState = this.state  
        if(oldState.user !== newState.user) {
            this.checkUserthePannel();
        }
    }

    nextQuestion() {
        let { nr, total, score } = this.state;

        if(nr === total){
            this.setState({
                displayPopup: 'flex'
            });
        } else {
            this.pushData(nr);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
        }

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

    checkUserthePannel(){
        const userThePannel = this.state.user ? this.state.user.username: null
        console.log(userThePannel)
        if(userThePannel === 'userThePannel'){
           this.setState({
                userThePannel:true
            })
        }
        
    }
    render() {
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score,wrongAnswer,userThePannel} = this.state;
        console.log('Main',this.state)
        console.log('MainProps',this.props)
        return (
            <div className="container">
                 {(this.state.user) ? 
                 <React.Fragment>
                     <Welcome user={this.state.user} onSignOut={this.signOut.bind(this)}/>
                     <QuestionsPannel />
                     <UserCam/>
                        
                        {userThePannel ? <div>Bravo ma</div>:<div>NUUUUUU</div>}
                        <div className="row">
                            <div className="col-lg-10 col-lg-offset-1">
                                <div id="question">
                                    <h4>Pregunta {nr}/{total}</h4>
                                    <p>{question}</p>
                                </div>
                                <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}  quitUser={this.quitUser} checkWrongAnswer ={this.checkWrongAnswer}/>
                                <div id="submit">
                                    {wrongAnswer ? <SingOut onSignOut={this.signOut.bind(this)}/>:
                                    
                                        showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >{nr===total ? 'Finish quiz' : 'Next question'}</button> : null}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    :<LoginForm onSignIn={this.signIn.bind(this)}/>}     
                <Footer />
            </div>
        );
    }
};

export default Main
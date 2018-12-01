import React from 'react';
import data from '../data/data';
import Answers from './Answers';
import Popup from './Popup';
import Footer from './Footer';
import LoginForm from './LoginForm';
import Welcome from './Welcome';

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
            user:null

        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.signIn= this.signIn.bind(this);
        this.signOut=this.signOut.bind(this);
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
    signIn(username, password) {
    // This is where you would call Firebase, an API etc...
    // calling setState will re-render the entire app (efficiently!)
    this.setState({
        user: {
            username,
            password,
            }
        })
    }
  
    signOut() {
        // clear out user from state
        this.setState({user: null})
    }

    render() {
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score} = this.state;
        console.log('Main',this.state)
        
        return (
            <div className="container">

                <Popup style={{display: displayPopup}} score={score} total={total} startQuiz={this.handleStartQuiz}/>
                 {(this.state.user) ? <Welcome user={this.state.user} onSignOut={this.signOut.bind(this)}/>:<LoginForm onSignIn={this.signIn.bind(this)}/>}
                                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div id="question">
                            <h4>Question {nr}/{total}</h4>
                            <p>{question}</p>
                        </div>
                        <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}/>
                        <div id="submit">
                            {showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >{nr===total ? 'Finish quiz' : 'Next question'}</button> : null}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};

export default Main
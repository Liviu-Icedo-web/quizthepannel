import React from 'react';
import axios from 'axios';
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
            userThePannel: false,
            countDown:10000,
            idQ:10,

        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.signIn= this.signIn.bind(this);
        this.signOut=this.signOut.bind(this);
        this.quitUser=this.quitUser.bind(this);
        this.checkWrongAnswer=this.checkWrongAnswer.bind(this);
        this.checkAdmin =this.checkAdmin.bind(this);
        this.showQuestion=this.showQuestion.bind(this);
        this.countBlock =this.countBlock.bind(this);
        this.welcomeThePannel=this.welcomeThePannel.bind(this);
       
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
        setInterval(()=>{this.getLaunchIdQ()},1000)
        
    }

    componentDidUpdate(oldProps,oldState){
        const newState = this.state  
        if(oldState.user !== newState.user) {
            this.checkAdmin();
            this.setState({
                countDown:10000 //Tengo un bug con el Mount por esto lo rescribo aqui
            })
        }
        if(oldState.idQ !== newState.idQ) {
            this.setState({
                idQ:newState.idQ,
                question: data[newState.idQ].question,
                answers: [data[newState.idQ].answers[0], data[newState.idQ].answers[1], data[newState.idQ].answers[2] ],
                correct: data[newState.idQ].correct,
                questionAnswered:false,
                countDown:10
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
                idQ:response.data.idQ,
                countDown:this.state.countDown -1
            })
        })
    }

    nextQuestion() {
        let { nr, total, score } = this.state;
        console.log('next Question',nr);

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

    showQuestion(){
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score,wrongAnswer,userThePannel,countDown} = this.state;
       return(
        <Answers answers={answers} question={question} score={score} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}  quitUser={this.quitUser} checkWrongAnswer ={this.checkWrongAnswer}/>
       ) ;
    }
    countBlock(){
        return(
            <div id="question">
                <h4>Preparate, la pregunta se lanzara en:</h4>
                <p>{this.state.countDown}</p>
            </div>
        );
    }

    welcomeThePannel(){
        return(
            <div id="question">
                <h4>Bienvenido a ThePannel!!!
                </h4>
                <p>En breve empezamos</p>
            </div>
        )
    }
    render() {
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score,wrongAnswer,userThePannel,countDown} = this.state;
        console.log('Main',this.state)
        console.log('MainProps',this.props)
        return (
            <div className="container">
                {(this.state.user) ? 
                                    <React.Fragment>
                                        <Welcome user={this.state.user} score={score} onSignOut={this.signOut.bind(this)}/>
                                        {userThePannel  ?   <QuestionsPannel />
                                                        :
                                                            <div className="row">
                                                                <UserCam/>
                                                                <div className="col-lg-10 col-lg-offset-1">
                                                                    
                                                                    {countDown>10 ? this.welcomeThePannel()
                                                                                : countDown <0 ? this.showQuestion():this.countBlock()}
                                                            
                                                                    <div id="submit">
                                                                        {wrongAnswer    ?   <SingOut onSignOut={this.signOut.bind(this)}/>: null}
                                                                    </div>
                                                                </div>
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
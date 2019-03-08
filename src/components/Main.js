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
import apiThePannel from '../api/apiThePannel';




class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nr: 0,
            questions:[],
            questionAnswered: false,
            score: 0,
            user:null,
            wrongAnswer: false,
            userThePannel: false,
            countDown:10000,
            idQ:0,

        }
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
        let {questions} = this.state;
        this.setState({
            question: questions[nr].question,
            answers: [questions[nr].answers[0], questions[nr].answers[1], questions[nr].answers[2], questions[nr].answers[3] ],
            correct: questions[nr].correct,
            nr: this.state.nr
        });
    }

    componentWillMount() {
        let { nr } = this.state;
        this.userId();
        this.getQuestions();
        //this.pushData(nr);
        setInterval(()=>{this.getLaunchIdQ()},1000)
        
    }

    componentDidUpdate(oldProps,oldState){
        let {questions} = this.state;
        const newState = this.state  
        if(oldState.user !== newState.user) {
            this.checkAdmin();
           /* this.setState({
                countDown:10000 //Tengo un bug con el Mount por esto lo rescribo aqui
            })*/
        }
        if(oldState.idQ !== newState.idQ) {
            console.log('Siuuuuuuu');
            if(newState.idQ==null){

            }else{
                console.log('Questions',questions.preguntas)
                console.log('Question Lenght',questions.preguntas.length)
                let {idQ} = this.state;
               if(idQ <= questions.preguntas.length-1){
                   console.log('Entraaaaaaa')
                this.setState({
                    question: questions.preguntas[idQ].question,
                        answers: [questions.preguntas[idQ].answers[0], questions.preguntas[idQ].answers[1], questions.preguntas[idQ].answers[2],questions.preguntas[idQ].answers[3]],
                        correct: questions.preguntas[idQ].correct,
                        questionAnswered:false,
                    
                  })
               }
               
            }
            
            
              
            }
    }

    getQuestions(){
        apiThePannel.get('json/preguntas.json')
            .then(response => {
                this.setState({
                    questions:response.data
            })
        })
        .catch(error => {
            console.log('getQuestions',error.message)
        })
    }
    
    getLaunchIdQ(){

        let {countDown, questions,idQ} = this.state;
        apiThePannel.get('json/concurso.json').then(response =>{   
           
        
            if(response.data[0]==null){

            }else{
                if(countDown % 5 === 0 ){
                    console.log('idQ ----->',idQ);
                    this.setState({
                        idQ:idQ+1,
                        question: questions.preguntas[idQ].question,
                        answers: [questions.preguntas[idQ].answers[0], questions.preguntas[idQ].answers[1], questions.preguntas[idQ].answers[2],questions.preguntas[idQ].answers[3]],
                        correct: questions.preguntas[idQ].correct,
                        questionAnswered:false,
                      })
                }
                this.setState({
                    
                        //idQ:response.data[0].idQ,
                        countDown:this.state.countDown -1
                    })
                  
            }
            console.log('Responseeeee',this.state.idQ)
        
        })
        .catch(error => {
            console.log('getQuestions',error.message)
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
        countDown:6,
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

    userId(){
        var first = Math.floor(Math.random() * 1000);
        var second = Math.floor(Math.random() * 10);
        var third = Math.floor(Math.random() * 10000);

        return(
            this.setState({
                userIdPn: first+second+third
            })
        )

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
        let { nr, idQ, question, questions, answers, correct, showButton, questionAnswered, displayPopup, score,wrongAnswer,userThePannel,countDown,user,userIdPn} = this.state;
       return(
        <Answers answers={answers} idQ={idQ} question={question} questions={questions} score={score} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}  quitUser={this.quitUser} checkWrongAnswer ={this.checkWrongAnswer} countDown={countDown} user={user} userIdPn={userIdPn}/>
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
        
        return (
            <div className="container">
                {(this.state.user) ? 
                                    <React.Fragment>
                                        <Welcome user={this.state.user} score={score} onSignOut={this.signOut.bind(this)}/>
                                                            <div className="row">
                                                                <UserCam/>
                                                                <div className="col-lg-10 col-lg-offset-1">
                                                                    
                                                                    {countDown>10 ? this.welcomeThePannel()
                                                                                : countDown <0 ? this.showQuestion():this.countBlock()}
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
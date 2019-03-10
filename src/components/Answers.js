import React from 'react';
import SingOut from './SingOut';
import apiThePannel from '../api/apiThePannel';


class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            classNames: ['', '', ''],
            correctAnswer: true,
            secToAnswer: 5,
            answerCount:-1000, // lo mas grande mejor
            win:true,
            winner:false,
            showCorrectAnswer:false
        }
        
        this.checkAnswer = this.checkAnswer.bind(this);
        this.showQuestion = this.showQuestion.bind(this);
        this.showError = this.showError.bind(this);
        this.answerCountDown = this.answerCountDown.bind(this);
        this.singOut= this.signOut.bind(this);
        this.showCorrectAnswer = this.showCorrectAnswer.bind(this);
        this.showWinner = this.showWinner.bind(this);
        this.setWinner = this.setWinner.bind(this);
    }
    
    checkAnswer(e) {
        let { isAnswered } = this.props;
        this.setState({
            clickedQuestion:true
        })
        if(!isAnswered) {
            
            let elem = e.currentTarget;
            let { correct, increaseScore } = this.props;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = this.state.classNames;
            correct =parseInt(correct)
            if(answer === correct){
                updatedClassNames[answer-1] = 'right';
                increaseScore();
                this.setState({
                    showCorrectAnswer:true
                })
                this.sendDataPN(true);
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
                this.setState({
                    correctAnswer:false,
                    win:false
                })
                this.props.checkWrongAnswer({wrongAnswer:true})
                this.sendDataPN(false);
                //this.props.quitUser({user: null})   Aqui la logica de elimnar el USER cuando falla
            }
            
            this.setState({
                classNames: updatedClassNames
            })
        }
    }
    componentWillMount(){
       // 
        this.setState({
            answerCount: this.props.countDown -9,
            
        })
    }
    componentDidUpdate(oldProps,oldState) {
        const newProps = this.props
       this.answerCountDown();
       
       
        if(oldProps.answers !== newProps.answers) {
            
          this.setState({
            classNames:['','',''],
            answerCount:-10

          })
        
          if(oldProps.question !== newProps.question){
            this.setState({
                answerCount:this.props.countDown -10,
                showCorrectAnswer:false,
                clickedQuestion:false
              })
            
            this.showQuestion();
          }

        }
      }

    showCorrectAnswer(){
        let {showCorrectAnswer} = this.state;
        if(showCorrectAnswer){
        return(
                <div className="alert alert-success" role="alert">
                        Bien, tienes <strong>{this.props.score}</strong> respuesta correcta
                </div>
            )
        }
        
        
    }  

    showQuestion(){
        let { answers,question,score,countDown} = this.props;
        let { answerCount,winner } = this.state;
        
        //console.log('showQuestion State --->', this.state);
        //console.log('showQuestionops Props---->',this.props)
        console.log('Nueva Pregunta', question);
       //if(!win){
            return(
                <div id="answers">
                {this.setWinner()}
                    {winner ? this.showWinner() : this.showCorrectAnswer()}
                    <div id="question">

                        <p>{question}</p>

                    </div>
                    <div className='segToAnswer'><p>Segundos para responder:{-(answerCount - countDown)}</p></div>
                    <ul>
                        <li onClick={this.checkAnswer} className='red' data-id="1"><span>A</span> <p>{answers[0]}</p></li>
                        <li onClick={this.checkAnswer} className='yellow' data-id="2"><span>B</span> <p>{answers[1]}</p></li>
                        <li onClick={this.checkAnswer} className='green' data-id="3"><span>C</span> <p>{answers[2]}</p></li>
                        <li onClick={this.checkAnswer} className='orange' data-id="4"><span>D</span> <p>{answers[3]}</p></li>
                    </ul>
                </div>
            );
        
       /* }else{
            
            return(
            <div className="alert alert-success" role="alert">
            Bien, tienes <strong>{this.props.score}</strong> respuesta correcta 
            </div>
            )
        }*/
            
        
        
    }

    answerCountDown(){
        let {answerCount,win,clickedQuestion,winner} = this.state;
        let timeTo5 =answerCount-this.props.countDown;
        
        if(this.props.idQ === 0){
            return true;
        }else if(winner){
            return true;
        }   
        
        else if(timeTo5 %15 === 0 && !clickedQuestion){
            //return false;
            window.location.replace('https://www.thepannel.tv/failed.php?user='+this.props.user.username+'&corectAnswers='+this.props.score+'&goodAnswer='+this.props.answers[this.props.correct-1]);
        }else{    
            if( (answerCount > this.props.countDown) || (win !== true)){
                window.location.replace('https://www.thepannel.tv/failed.php?user='+this.props.user.username+'&corectAnswers='+this.props.score+'&goodAnswer='+this.props.answers[this.props.correct-1]);
                
            }else{
                return true;
            }
        }
    
    }
    showError(){
        return(
            <React.Fragment>
                <div className="alert alert-danger" role="alert">
                 Has fallado. La respuesta correcta, era <strong>{this.props.answers[this.props.correct-1]}</strong>
             </div>
             <SingOut onSignOut={this.signOut.bind(this)}/>
             </React.Fragment>
        );
    }
    signOut() {
        // clear out user from state
        this.setState({user: null})
        window.location.reload();
    //window.location.replace('https://www.thepannel.tv/failed.php?user='+this.props.user.username+'&corectAnswers='+this.props.score+'&goodAnswer='+this.props.answers[this.props.correct-1]);
    }
    
    sendDataPN(answer){
        var postData = {
            idQ: this.props.idQ,
            userId: this.props.userIdPn,
            userName:this.props.user.username,
            answer:answer
          };
        
          let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
        
         
          apiThePannel.post('estadisticas/resultados',postData)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
          })
          .catch((err) => {
            console.log(postData);
            console.log("AXIOS ERROR: ", err);
          })
    }

   setWinner(){
        let {score, questions} = this.props;
        console.log('Entra Winner');
        
       if(score === this.props.questions.preguntas.length){
            window.location.replace('https://www.thepannel.tv/winner.php?user='+this.props.user.username)
        }    
    }  
    showWinner (){
        return (
           
                <div className="alert alert-success" role="alert">
            Enhorabuna <strong>has ganado</strong> !!!! 
            </div>
           )
    }
    render() {
        console.log('Answer State --->', this.state);
        console.log('Answer Props---->',this.props)
        
        return (

            //(this.state.correctAnswer && this.answerCountDown()) ?
           this.answerCountDown() ?
            this.showQuestion()
            :
            this.showError()
        );
    }
}

export default Answers
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
            win:false
        }
        
        this.checkAnswer = this.checkAnswer.bind(this);
        this.showQuestion = this.showQuestion.bind(this);
        this.showError = this.showError.bind(this);
        this.answerCountDown = this.answerCountDown.bind(this);
        this.singOut= this.signOut.bind(this);
        //this.winner = this.winner.bind(this);
    }
    
    checkAnswer(e) {
        let { isAnswered } = this.props;
        
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
                    win:true,
                    answerCount: this.props.countDown -5 // bug with answer count
                })
                this.sendDataPN(true);
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
                this.setState({
                    correctAnswer:false
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
       // this.winner()
        this.setState({
            answerCount: this.props.countDown -5,
            
        })
    }
    componentDidUpdate(oldProps,oldState) {
        const newProps = this.props
       this.answerCountDown();
       
        if(oldProps.answers !== newProps.answers) {
            
          this.setState({
            classNames:['','','']
          })
        
          if(oldProps.question !== newProps.question){
            this.showQuestion();
          }

        }
      }

    showQuestion(){
        let { answers,question,score,countDown} = this.props;
        let { win,classNames,answerCount } = this.state;
        
        //console.log('showQuestion State --->', this.state);
        //console.log('showQuestionops Props---->',this.props)
        console.log('Nueva Pregunta', question);
       // if(!win){
            return(
                <div id="answers">
            <div id="question">
                
                <p>{question}</p>
                
            </div>
            <div className='segToAnswer'><p>Segundos para responder:{-(answerCount-countDown)}</p></div>
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
        let {answerCount} = this.state;

        console.log('AnwserCount',answerCount);
        console.log('PropsCount',this.props.countDown);
        if( answerCount > this.props.countDown ){
            console.log('Anser False -----');
            return false;
            
        }else{
            return true;
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

   /*winner(){
        let {score, questions} = this.props;

        console.log('Preguntas',questions.lenght)

        if(score === questions.lenght){
            <div className="alert alert-success" role="alert">
            Enhorabuna <strong>has ganado</strong> !!!! 
            </div>
        }

        

    }*/
    render() {
       // console.log('Answer State --->', this.state);
       //console.log('Answer Props---->',this.props)
        
        let transition = {
            transitionName: "example",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 300
        }

        
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
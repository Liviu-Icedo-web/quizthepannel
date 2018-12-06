import React from 'react';
import axios from 'axios';


class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            classNames: ['', '', ''],
            correctAnswer: true,
            questions:[],
            answers:[],
            idQ:1
        }
        
        this.checkAnswer = this.checkAnswer.bind(this);
        this.getQuestionsA = this.getQuestionsA.bind(this);
    }
    
    checkAnswer(e) {
        let { isAnswered } = this.props;
        
        if(!isAnswered) {
            
            let elem = e.currentTarget;
            let { correct, increaseScore } = this.props;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = this.state.classNames;

            if(answer === correct){
                updatedClassNames[answer-1] = 'right';
                increaseScore();
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
                this.setState({
                    correctAnswer:false
                })
                this.props.checkWrongAnswer({wrongAnswer:true})
                //this.props.quitUser({user: null})   Aqui la logica de elimnar el USER cuando falla
            }
            
            this.setState({
                classNames: updatedClassNames
            })

            this.props.showButton();
        }
    }
    

    getQuestionsA(){
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

    componentWillMount() {
        this.getQuestionsA();
        setInterval(()=>{this.getLaunchIdQ()},1000)
        
    }

    componentDidUpdate(oldProps,oldState) {
        const newProps = this.props
        const newState = this.state
        if(oldProps.answers !== newProps.answers) {
          this.setState({
            classNames:['','',''],
            
          })
        }
      }

    render() {
        let { answers,question,classNames} = this.state;
        
        let transition = {
            transitionName: "example",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 300
        }
        console.log('Answers-State',this.state)
        console.log('Answers-Props',this.props)
        
        return (

            (this.state.correctAnswer)?
            <div id="answers">
             <div id="question">
                <p>{question}</p>
            </div>
                <ul>
                    <li onClick={this.checkAnswer} className={classNames[0]} data-id="1"><span>A</span> <p>{answers[0]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[1]} data-id="2"><span>B</span> <p>{answers[1]}</p></li>
                    <li onClick={this.checkAnswer} className={classNames[2]} data-id="3"><span>C</span> <p>{answers[2]}</p></li>
                </ul>
            </div>:
            <div className="alert alert-danger" role="alert">
                Has fallado. La respuesta correcta era <strong>{this.props.answers[this.props.correct-1]}</strong>
          </div>
        );
    }
}

export default Answers
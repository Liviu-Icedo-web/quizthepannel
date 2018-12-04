import React from 'react';
import data from '../data/data';
import axios from 'axios';

export default class QuestionsPannel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            idQ:0,
            questions:[]
        }
       
    }

    componentWillMount() {
       this.getQuestions();
    }


    getQuestions(){
            axios.get('/Questions.json')
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        questions:response.data
                    })
            })
            .catch(error => {
            })
    }

    render(){
        let {questions} = this.state
        console.log('Question Pannel',this.state)
        console.log('BAAA',questions)
        return(
            <div>
                    {questions.map((q,i)=>
                        <div id="answers">
                            <div id="question">
                        <p key={i}>{i+1} {q.question}</p>
                        </div>
                        </div>
                    )} 
            </div>  
            
        );
        
    }


}
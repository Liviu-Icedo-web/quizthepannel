import React from 'react';
import data from '../data/data';
import axios from 'axios';
import LaunchQuestions from '../api/Streams';

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

    launchQuestion(e){
        let elem = e.currentTarget;
        let idQuestion = Number(elem.dataset.id)

        LaunchQuestions.delete('streams/1',{
            headers: {
              'Content-Type': 'application/json'
            }});
        LaunchQuestions.post('/streams',{idQ:idQuestion});
    }

    render(){
        let {questions} = this.state
        return(
            <div>
                    {questions.map((q,i)=>
                        <div id="answers" key={'answes-'+i}>
                            <div id="question" key={'questions-'+i}>
                                <p key={i} onClick={this.launchQuestion} data-id={i+1}>{i+1}. {q.question}</p>
                            </div>
                        </div>
                    )} 
            </div>  
            
        );
        
    }


}
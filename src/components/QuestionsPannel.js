import React from 'react';
import data from '../data/data';
import axios from 'axios';



export default class QuestionsPannel extends React.Component{
    constructor(props){
   
        super(props);
        this.state={
            idQ:0,
            questions:[],
            showQ:'',
        }
    }

    componentWillMount() {
       this.getQuestions();
       setInterval(()=>{this.getLaunchIdQ()},1000)
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
        axios.get('http://localhost:4000/LaunchQuestions.json', { crossdomain: true }).then(response =>{
            this.setState({
                idQ:response.data.idQ
            })
        }
        
        )
    
    }

    componentDidUpdate(oldProps, oldState){
        const newState = this.state
        if(oldState.idQ !== newState.idQ) {
        this.setState({
           idQ:newState.idQ,
           showQ:newState.questions[newState.idQ].question
          })
          
        }
    }

    render(){
        let {showQ, idQ} = this.state
        console.log('Question Pannel',this.state)
       
        return(
            <div>
                <div id="answers" key={'answes-'+idQ}>
                    <div id="question" key={'questions-'+idQ}>
                                <p key={idQ}>{idQ} . {showQ}</p>       
                    </div>
                </div>
            </div>  
            
        );
        
    }


}
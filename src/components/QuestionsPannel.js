import React from 'react';
import data from '../data/data';
import axios from 'axios';
import Countdown from 'react-countdown-now';



export default class QuestionsPannel extends React.Component{
    constructor(props){
   
        super(props);
        this.state={
            idQ:0,
            questions:[],
            showQ:'',
            nr:10000
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
                idQ:response.data.idQ,
                nr:this.state.nr-1
                
            })
        }
        
        )
    
    }

    componentDidUpdate(oldProps, oldState){
        const newState = this.state
        if(oldState.idQ !== newState.idQ) {
        this.setState({
           idQ:newState.idQ,
           showQ:newState.questions[newState.idQ].question,
           nr:10
          })
          
        }
    }


    completQuestion (){
        
        return(
            <p key={this.state.idQ}>{this.state.idQ} . {this.state.showQ}</p>
        );
    } 

// Renderer callback with condition
  renderer = ({ seconds, completed}) => {
  if (completed) {
    // Render a complete state
            return this.completQuestion();
    } else {
        // Render a countdown
        return <span>Preparate, la pregunta aparecera en : {seconds}</span>;
    }
    };


    render(){
        let {showQ, idQ,nr} = this.state
        console.log('Question Pannel',this.state)
       
        return(
            <div>
                <div id="answers" key={'answes-'+idQ}>
                    <div id="question" key={'questions-'+idQ}>
                                   
                                {nr<0 ? showQ:nr}
                    </div>
                </div>
            </div>  
            
        );
        
    }


}
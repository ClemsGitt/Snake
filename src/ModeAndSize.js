import React from 'react';
import './ModeAndSize.css'

class ModeAndSize extends React.Component{

    constructor(props) {
        super(props);
        this.state={horSizeChildren:10, verSizeChildren:10, harcoreChildren: false}; 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        if(event.target.name === 'horSize'){
            this.setState(
                {horSizeChildren : event.target.value},
            )
        }

        else if(event.target.name === 'verSize'){
            this.setState(
                {verSizeChildren : event.target.value},
            )
        }


        else{
            this.setState(
                {hardcoreChildren : event.target.checked},
            )
        }
      }

    
      handleSubmit(e){
        e.preventDefault();  
        if(this.state.horSizeChildren < 2 || this.state.horSizeChildren > 20 || this.state.verSizeChildren < 2 || this.state.verSizeChildren > 13){
            console.log('coucou');
        }   
        else{
            this.props.handler(this.state); 
            //console.log(this.state);
        }
      }

    render(){
        return(
        
            <form className = "formulaire">
                
                <label for="horSize">Horizontal length:</label>
                <input type="text" 
                    id="horSize" 
                    name="horSize" 
                    value={this.state.horSizeChildren}
                    onChange={this.handleChange}
                    />

                <label for="verSize">Vertical length:</label>
                <input type="text" 
                    id="verSize" 
                    name="verSize" 
                    value={this.state.verSizeChildren}
                    onChange={this.handleChange}
                    />

                <span className = "checkboxes">
                    <label for="mode">Hardcore Mode</label>
                    <input type="checkbox" id="mode" name="hardcore" onChange={this.handleChange} />
                </span>

                <span>
                    <input type="submit" onClick= {e=>this.handleSubmit(e)} value="Send changes"/>
                </span>

            </form>
        )
    }
}

export default ModeAndSize;
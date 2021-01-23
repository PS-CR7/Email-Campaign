import React, { Component } from "react";
import { Link } from "react-router-dom";

class Email_Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/campaign/get-all-emails/')
        .then(res => res.json())
        .then(json =>{
            this.setState({
                isLoaded: true,
                items: json,
            })
        })
    }

    render() {
        // console.log(items)
        var{ isLoaded, items} =  this.state;
        items = items['campaign_data']
        if(!isLoaded){
            return <div>Loading...</div>;
        }
        else{
            return (
                <div>
                    <ul>
                        {items.map(item =>(
                            <li key ={item.id}>
                                <b>Id:</b> {item.id} |  <b>Title:</b> {item.title} 
                                <br></br><b>Content:</b><br></br>
                                {item.content}
                                <br></br>
                                <br></br><br></br>
                            </li>
                        ))}
                    </ul>
                    <br/><br/>
                    <Link to="/"><button>Go Back</button></Link><br/>
                </div>
            )
            }
    }
}

export default Email_Data;
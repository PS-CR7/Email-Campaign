import React, { Component } from "react";
import { Link } from "react-router-dom";

class Campaign_Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/campaign/get-all-campaign/')
        .then(res => res.json())
        .then(json =>{
            this.setState({
                isLoaded: true,
                items: json,
            })
        })
    }

    render() {
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
                                <br></br><b>Subject:</b><br></br>
                                {item.subject}
                                <br></br>
                                <br></br><br></br>
                            </li>
                        ))}
                    </ul>
                    <br/>
            <Link to="/"><button>Go Back</button></Link><br/>
                </div>
            )
            }
    }
}

export default Campaign_Data;
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Campaign_Send extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
            titles: [],
            userData: {},
            camp_data : [],
            fill_data : {},
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/campaign/get-all-campaign/')
        .then(res => res.json())
        .then(json =>{
            this.setState({
                isLoaded: true,
                items: json,
                titles: json.campaign_data.map(({ title}) => title),
                camp_data : json.campaign_data,
                fill_data : {},
                userData: {}
            })
        })
    }

    submit = () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_id : this.state.userData.email,
        title : this.state.userData.title, subject : this.state.userData.subject,
        from_name : this.state.userData.from, from_mail : this.state.userData.from,
        reply_mail : this.state.userData.reply, reply_name : this.state.userData.reply,
        to_Email : this.state.userData.to_List })
    };
    
    fetch('http://localhost:8000/api/campaign/send-campaign/', requestOptions )
    .then(res => res.json())
        .then(json => {
            if (json.message === "success"){
                alert ("Mail sent!!!");
            }
            else{
                alert ("Error : Mail not sent!!!");
            }
    })
};

    handleTitleChange = (e) => {
        let camp_name = e.target.value;
        for(let i=0;i < this.state.camp_data.length; i++){
        if (camp_name === this.state.camp_data[i].title){
            let getData = this.state.camp_data[i];
            
            this.setState({fill_data:getData})
            this.setState({userData:getData})
            console.log(getData)
                    }
            }
    }


    render(){
        var{ isLoaded, items, titles, userData,fill_data} =  this.state;
        // console.log(items)
        if(!isLoaded){
            return <div>Loading...</div>;
        }
        else{
            console.log(this.state.fill_data)
            var n= titles.includes('')
            if (!n) {
            titles.push(titles[0])
            titles[0]=''
            }
            return (
                <form>
                    <br></br> <br></br>
                    
                    <label>Campaign_Name </label><select placeholder="title" id="title" onChange={this.handleTitleChange}>
                      {this.state.titles && this.state.titles.map((title)=>{
                        return <option value={title}>{title}</option>
                      })}
                    </select>
                    <br></br><br/>
                    <label>Email </label><input placeholder="email" id="email" value= {fill_data.email} readOnly/><br/>
                    <br></br><br/>
                    <label>Subject </label><input placeholder="subject" id="subject" value= {fill_data.subject} readOnly/><br/>
                    <br></br>
                    <label>From </label><input placeholder="from" id="from" value= {fill_data.from} readOnly/><br/>
                    <br></br>
                    <label>Reply </label><input placeholder="reply" id="reply" value= {fill_data.reply} readOnly/><br/>
                    <br></br><br/>
                    <label>to_List </label><input placeholder="to_List" id="to_List" value= {fill_data.email_to} readOnly/> <br/>
                    <br/>
                    <button onClick={this.submit}>Send</button>
                    <br/><br/>
                    <Link to="/"><button>Go Back</button></Link><br/>
                </form>
            );
            }
    }
    }

export default Campaign_Send;
import React, { Component } from "react";
import readXlsxFile from 'read-excel-file';
import { Link } from "react-router-dom";

class Campaign_CRUD extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
            titles: [],
            userData: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/campaign/get-all-emails/')
        .then(res => res.json())
        .then(json =>{
            this.setState({
                isLoaded: true,
                items: json,
                titles: json.campaign_data.map(({ title}) => title),
                userData: {}
            })
        })
    }

    submit = () => {
    // var mail_title = ""
    // if ( this.state.userData.email){
    //    mail_title = this.state.userData.email
    // }
    // else{
    //     mail_title= this.state.titles[0]
    // }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_id : this.state.userData.email,
        title : this.state.userData.title, subject : this.state.userData.subject,
        from_name : this.state.userData.from, from_mail : this.state.userData.from,
        reply_mail : this.state.userData.reply, reply_name : this.state.userData.reply,
        to_Email : this.state.userData.to_List })
    };
    fetch('http://localhost:8000/api/campaign/create-campaign/', requestOptions )
    .then(res => res.json())
        .then(json => {
            if (json.message === "success"){
                alert ("Campaign Created!!!");
            }
            else{
                alert("Error : "+json.message);
                // alert ({"Error":json.message});
            }
            }) 
};

    handleChange = (e) => {
      let iData = {...this.state.userData};
      iData[e.target.id] = e.target.value;
      this.setState({userData:iData})
    }

    handleFileChange = (e) => {
        let iData = {...this.state.userData};
        let list_emails = []
        readXlsxFile(e.target.files[0]).then((rows) => {
            for(let i=0;i < rows.length; i++){
                list_emails.push(rows[i][0])
            }
        })
        // console.log(list_emails)
        iData[e.target.id] = list_emails;
        this.setState({userData:iData})
      }

    render(){
        var{ isLoaded, items, titles, userData} =  this.state;
        // console.log(items)
        var n= titles.includes('')
        if (!n) {
            titles.push(titles[0])
            titles[0]=''
            }
        if(!isLoaded){
            return <div>Loading...</div>;
        }
        else{
            return (
                <form>
                    <br></br> <br></br>
                    <label>Name </label><input placeholder="name" id="title" onChange={this.handleChange}/><br/>
                    <br></br>
                    <label>Subject </label><input placeholder="subject" id="subject" onChange={this.handleChange}/><br/>
                    <br></br>
                    <label>From </label><input placeholder="from" id="from" onChange={this.handleChange}/><br/>
                    <br></br>
                    <label>Reply </label><input placeholder="reply" id="reply" onChange={this.handleChange}/><br/>
                    <br></br><br/>
                    <label>Email </label><select placeholder="email" id="email" onChange={this.handleChange}>
                      {this.state.titles && this.state.titles.map((title)=>{
                        return <option value={title}>{title}</option>
                      })}
                    </select>
                    <br></br><br/>
                    <label>to_List </label><input placeholder="to_List" id="to_List" type="file"
          onChange={this.handleFileChange}/><br/>
                    <br/>
                    <button onClick={this.submit}>Save</button>
                    <br/><br/>
                    <Link to="/"><button>Go Back</button></Link><br/>
                </form>
            );

            }
    }
}


export default Campaign_CRUD;

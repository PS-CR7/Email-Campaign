import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Email_CRUD = () => {
    const initData = {title: "", content: ""};
    //
    const [data, setData] = useState(initData);
    const [status, setStatus] = useState({curr: ""});
    //
    const clear = () => setData(initData);
    //
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(data); 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: data.title, content: data.content })
        };
        const response = await fetch('http://localhost:8000/api/campaign/create-template/', requestOptions );
        const response_data = await response.json();
        if(response_data.id) {
            setStatus({curr: "Template saved!"});
            clear();
        } else {
            setStatus({curr: "Template not saved."+ response_data.message});
        }
    };
    return (
        <form>
            <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
            <label>Title </label><input placeholder="Title" value={data.title} onChange={(e) => setData({...data, title: e.target.value})}/><br/>
            <br></br> 
            <label>Content </label><input placeholder="Content" value={data.content} onChange={(e) => setData({...data, content: e.target.value})}/><br/>
            <br></br>
            <br></br>
            <br></br>
            <div>{status.curr}</div> 
            <button onClick = {e => onSubmit(e)}> Save </button><br/>
            <br></br>
            <Link to="/"><button>Go Back</button></Link><br/>
        </form>
    );

}

export default Email_CRUD;
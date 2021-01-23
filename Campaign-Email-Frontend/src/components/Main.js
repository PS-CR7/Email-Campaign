import React from "react";
import {BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

const Main = () => {
    return (
        <form>
            <br></br>
            <br></br>
            <Link to="/get-email-data"><button>Get Email template</button></Link><br/>
            <br></br>
            <Link to="/post-email-data"><button>Make new Email Template</button></Link><br/>
            <br></br>
            <Link to="/get-campaign-data"><button>Get Campaign template</button></Link><br/>
            <br></br>
            <Link to="/post-campaign-data"><button>Make new Campaign Template</button></Link><br/>
            <br></br>
            <Link to="/edit-campaign-data"><button>Edit existing Campaign Template</button></Link><br/>
            <br></br>
            <Link to="/send-campaign-data"><button>Send Campaign</button></Link><br/>
        
        </form>
    );
    //
};
export default Main;
 
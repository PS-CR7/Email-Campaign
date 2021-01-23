import logo from './logo.svg';
import './App.css';
import Main from "./components/Main.js";
import Email_Data from "./components/get_email_templates"
import Campaign_Data from "./components/get_campaign_templates"
import Email_CRUD from "./components/crud_email_template"
import Campaign_CRUD from "./components/crud_campaign"
import Campaign_Edit from "./components/edit_campaign"
import Campaign_Send from "./components/send_campaign"

import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
              <Switch>
                  <Route exact path="/" component={Main}/>
                  <Route exact path="/get-email-data" component={Email_Data}/>
                  <Route exact path="/post-email-data" component={Email_CRUD}/>
                  <Route exact path="/get-campaign-data" component={Campaign_Data}/>
                  <Route exact path="/post-campaign-data" component={Campaign_CRUD}/>
                  <Route exact path="/edit-campaign-data" component={Campaign_Edit}/>
                  <Route exact path="/send-campaign-data" component={Campaign_Send}/>
              </Switch>
        </Router>
    </div>
  );
}

export default App;

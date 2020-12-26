import React, {Component} from 'react'
import {  BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import SavedUsers from './components/SavedUsers'

class App extends Component{
  render(){
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
              <div className="col-lg-6 offset-lg-3 text-center">
              <i className="fa fa-github mt-5" style={{color:"#5bc0de",fontSize:"120px"}}></i>
              <h1 className="text-info mt-5">Github User Search</h1>
                  <Link to="/search" className="btn btn-info mr-3 mt-3">Search</Link>
                  <Link to="/savedusers" className="btn btn-info mr-3 mt-3">Saved Users</Link>
                  <a href="https://www.linkedin.com/in/justnishad"  rel="noreferrer" target="_blank" className="btn btn-info mt-3"><i className="fa fa-linkedin-square"></i> Made By Nishad Raisinghani</a>
              </div>
          </div>
        </div>
        <Switch>
          <Route path="/search">
            <SearchBar />
          </Route>
          <Route path="/savedusers">
            <SavedUsers />
          </Route>
        </Switch>
      </Router>

    );
  }
}

export default App;

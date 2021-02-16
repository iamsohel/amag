import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import FormList from './components/FormList';
import Form from './components/Form';
import Login from './components/auth/login';
import Register from './components/auth/register';
import setTokenToHeader from './util/setTokenToHeader';

setTokenToHeader();
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/form/:id" component={Form} />
        <Route path="/form-list" component={FormList} />
        <Redirect from="/" exact to="/login" />
      </Switch>
  </React.Fragment>
  );
}

export default App;

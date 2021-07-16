import React from "react";
import { Container } from "@material-ui/core";
import { Route, Switch} from 'react-router-dom'


import NavBar from "./component/navBar/NavBar";
import Home from "./component/home/Home";
import Auth from "./component/auth/Auth";
import PostDetail from "./component/postDetail/PostDetail";


function App() {

  console.log('rander');
  return (
    <Container maxWidth="lg">
      <NavBar></NavBar>
      <Switch>
        <Route exact path='/posts' component={Home}></Route>
        <Route exact path='/posts/auth' component={Auth}></Route>
        <Route exact path='/posts/:id' component={PostDetail}></Route>
      </Switch>
    </Container>
  );
}

export default App;

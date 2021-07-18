import React from "react";
import { Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import NavBar from "./component/navBar/NavBar";
import Home from "./component/home/Home";
import Auth from "./component/auth/Auth";
import PostDetail from "./component/postDetail/PostDetail";
import UserProfile from "./component/userProfile/UserProfile";

function App() {
  console.log("rander");
  return (
    <Container maxWidth="lg">
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/posts" component={Home}></Route>
        <Route exact path="/posts/auth" component={Auth}></Route>
        <Route exact path="/posts/:id" component={PostDetail}></Route>
        <Route exact path="/user/:id/profile" component={UserProfile}></Route>
      </Switch>
    </Container>
  );
}

export default App;

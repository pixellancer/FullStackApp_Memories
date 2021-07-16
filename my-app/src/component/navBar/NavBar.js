import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyle from "./style";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { decode } from "jsonwebtoken";

const NavBar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  
  // JSON.parse(localStorage.getItem('profile')) : get the user info from local storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    // JSON Web Token && check token expiration
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]); //add location for rerender when user logout

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/posts");
    setUser(null);
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography
            component={Link}
            to="/posts"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            Memories
          </Typography>

          <img
            className={classes.image}
            src="/logo192.png"
            alt="icon"
            width="60"
            height="60"
          />
        </div>

        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <div className={classes.profileUser}>
                <Avatar
                  className={classes.purple}
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.username} variant="h6">
                  {user.result.name}
                </Typography>
              </div>

              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Log out
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/posts/auth"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;

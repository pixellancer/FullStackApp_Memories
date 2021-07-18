import useStyle from "./style.js";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./icon";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../../redux/ducks/auth";


const initUser = { firstName: '', lastName: "", email:'' , password:'', confirmPassword:''}


const Auth = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [showPW, setShowPw] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [userInfo, setUserInfo] = useState(initUser)
  
  const logError = useSelector(state => state.error.error)
  /* Testing code */
  // const state = useSelector(state => state)
  // console.log(logError , state);

  const handleSubmit = (e) => {
    /* prevent defualt behaviour (refresh the page) of form submit */
    e.preventDefault()
    console.log("UserInfo Submited: ",userInfo);

    if (isSignup) {
      /* sign up operations */
      dispatch(signup(userInfo, history)) /* history use to redirect home page once operation done */
    } else {
      dispatch(signin(userInfo, history))
    }
  };

  const handleChange = (e) => {
    /* [obj_property]:value  is fynamically update obj property while running (even the property is undefine)*/
    setUserInfo({ ...userInfo, [e.target.name]:e.target.value})
  };

  const handleShowPassword = () => {
    setShowPw((showPW) => !showPW);
  };

  const switchMode = () => {
    setIsSignup((isSignup) => !isSignup);
  };

  const googleSuccess = async (res) => {
    console.log(res);
    // ?.  is optional chaining operator. which will not throw err if we unable to access the object
    // if there are no res obj, no error throw out and the result is undefine
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", payload: { result, token } });
      // once the login, redirect to home page
      history.push("/posts"); 
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const googleFailure = (err) => {
    console.log("Google Sign In was unsuccessful. Try again later", err);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocues
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPW ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type={"password"}
              />
            )}
          </Grid>

          
          {logError && <Alert className={classes.warn} severity="error" >{logError}</Alert>}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>


          <GoogleLogin
            clientId="775512263366-mk6lj2ej98c56a11mfc1e2vvrmb4t3ha.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Sign in using google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button color="secondary" onClick={switchMode}>
                {isSignup
                  ? "Already have acount? Sign In"
                  : "Dont have an aount? Sign up"}
              </Button>
            </Grid>
          </Grid>

        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

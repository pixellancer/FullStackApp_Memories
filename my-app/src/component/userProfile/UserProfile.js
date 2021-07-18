import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
  Button,
} from "@material-ui/core/";
import { Alert } from "@material-ui/lab";
import useStyle from "./style";
import Post from "../posts/post/Post";
import Input from "../auth/Input";
import { update } from "../../redux/ducks/auth";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { getPosts } from "../../redux/ducks/posts";

const UserProfile = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPW, setShowPW] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  const userInfo = useRef(user);
  const showReminder = useRef(false);
  const posts = useSelector((state) => state.posts.posts);
  const userPost = posts.filter((post) => post.creater === user._id);
  const [updateError, setUpdateError] = useState(false);

  const handleChange = (e) => {
    userInfo.current = { ...userInfo.current, [e.target.name]: e.target.value };
  };

  const handleShowPassword = () => {
    setShowPW((showPW) => !showPW);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.current.password !== userInfo.current.confirmPassword) {
      showReminder.current = true;
      setUpdateError(true);
    } else {
      setUpdateError(false);
      console.log("userINfo", userInfo.current);
      dispatch(update(userInfo.current, history));
    }

    /* update icon and dismiss the notation block */
    if (!updateError) {
      showReminder.current = true;
      setUser(JSON.parse(localStorage.getItem("profile")).result);
    }
  };

  const handleCreate = () => {
    history.push("/posts");
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [user]);

  return (
    <Paper elevation={6} color="inherit">
      <div className={classes.userHeader}>
        <Avatar
          className={classes.purple}
          alt={userInfo.current.name}
          src={userInfo.current.imageUrl}
        >
          {userInfo.current.name.charAt(0)}
        </Avatar>
        <Typography className={classes.userName} variant="h5">
          {userInfo.current.name}
        </Typography>
      </div>

      <section className={classes.paddings}>
        <Typography className={classes.paddings} variant="h5">
          Update Your Info:
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className={classes.profileUpdate}>
            <Input
              name="name"
              label="Name or NickName"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPW ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Input
              name="confirmPassword"
              label="Repeat Password"
              handleChange={handleChange}
              type={"password"}
            />
            {showReminder.current ? (
              updateError ? (
                <Alert className={classes.warn} severity="error">
                  Password do not match!
                </Alert>
              ) : (
                <Alert className={classes.warn} severity="success">
                  {JSON.parse(localStorage.getItem("profile")).message}
                </Alert>
              )
            ) : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
            </Button>
          </Grid>
        </form>
      </section>

      <section className={classes.paddings}>
        <Typography className={classes.paddings} variant="h5">
          Your Posts:
        </Typography>
        {userPost.length < 1 ? (
          <div>
            <Typography className={classes.userNoPosts} variant="h5">
              You haven't post anything yet! Go create one!
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.createPost}
              onClick={handleCreate}
            >
              Create
            </Button>
          </div>
        ) : (
          <Grid
            className={classes.mainContainer}
            container
            alignItems="stretch"
            spacing={3}
          >
            {userPost.map((post) => (
              <Grid key={post._id} item xs={12} sm={3}>
                <Post post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </section>
    </Paper>
  );
};

export default UserProfile;

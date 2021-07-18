import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
  Button,
} from "@material-ui/core/";
import useStyle from "./style";
import Post from "../posts/post/Post";
import Input from "../auth/Input";
import { update } from "../../redux/ducks/auth";
import { useHistory } from "react-router-dom";

const UserProfile = () => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const history = useHistory()
  const [showPW, setShowPW] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  const posts = useSelector((state) => state.posts.posts);
  const userPost = posts.filter((post) => post.name === user.name);

  console.log(user);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPW((showPW) => !showPW);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(update(user, history))
  };

  return (
    <Paper elevation={6} color="inherit">
      <div className={classes.userHeader}>
        <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>
          {user.name.charAt(0)}
        </Avatar>
        <Typography className={classes.userName} variant="h5">
          {user.name}
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
        {!posts.length ? (
          <CircularProgress className={classes.paddings} />
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

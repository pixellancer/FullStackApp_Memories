import { useSelector } from "react-redux";
import { Grid, CircularProgress, Divider } from "@material-ui/core";
import Post from "./post/Post";
import useStyle from "./style";

const Posts = ({ setCurrentId }) => {
  const classes = useStyle();
  const posts = useSelector((state) => state.posts.posts);
  // console.log("Posts --- Show Posts", posts);

  return posts.length ? (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <CircularProgress />
  );
};

export default Posts;

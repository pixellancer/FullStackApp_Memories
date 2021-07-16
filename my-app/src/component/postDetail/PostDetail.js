import useStyle from "./style";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import moment from "moment";
import { getPostDetail } from "../../redux/ducks/posts";

const PostDetail = () => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const post = useSelector((state) => state.posts.post);
  const loading = useSelector((state) => state.loading.loading);
  console.log("From detail page", post, "\n", loading);

  useEffect(() => {
    dispatch(getPostDetail(id));
    console.log("U R in", id);
  }, [id]);

  if (!post) return null;

  if (loading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>

          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>

          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>

          <Typography variant="h6">Created by: {post.name}</Typography>

          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
    </Paper>
  );
};

export default PostDetail;

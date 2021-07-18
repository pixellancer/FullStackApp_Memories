import React from "react";
import useStyle from "./style";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost, likePost } from "../../../redux/ducks/posts";
import Likes from "./Likes";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const loggedByGoogle = user?.result?.googleId === post.creater;
  const loggedByAuth = user?.result?._id === post.creater;
  const checkUserLogged = loggedByAuth || loggedByGoogle;

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };
  
  const directToEdit = () => {
    setCurrentId(post._id)
    history.push(`/posts`);
  }

  return (
    <Card className={classes.card}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        ></CardMedia>

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).format("MMMM Do YYYY")}
          </Typography>
          <Typography variant="body2">
            {moment(post.createdAt).format("h:mm:ss a")}
          </Typography>
        </div>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        <CardContent>
          <Typography variant="h4" color="textSecondary" component="p">
            {post.title}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography
            variant="body2"
            noWrap
            color="textSecondary"
            component="p"
          >
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes post={post} user={user} />
        </Button>

        {checkUserLogged ? (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => (setCurrentId ? setCurrentId(post._id) : history.push(`/posts`))}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        ) : null}

        {checkUserLogged ? (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Post;

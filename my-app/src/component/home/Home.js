import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from '../../redux/ducks/posts'

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId,dispatch]);
  

    return (
        <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={8}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home

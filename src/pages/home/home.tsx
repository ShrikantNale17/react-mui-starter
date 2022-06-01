import React, { lazy, useEffect } from "react";
import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from 'react-redux';

import "./home.scss";
// import Post from "../../components/card/Post";
import { get } from "../../utils/http/httpMethods";
import { setPosts } from "../../components/card/card-slice/CardSlice";
const Post = lazy(() => import("../../components/card/Post"))

export default function Home() {

  // const [posts, setPosts] = useState([]);
  const posts = useSelector((state: any) => state.posts.posts)
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      const response: any = await get('/posts')
      // console.log(response);
      dispatch(setPosts(response.results))
    }
    getPosts();
  }, [])
  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Box sx={{ my: 0 }} display='flex' flexDirection={"column"} alignItems="center">
        {/* <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography> */}
        {
          posts.map((post: any) =>
            <Post {...post} key={post._id} />
          )
        }
        {posts.length < 1 &&
          <>
            <Post />
            <Post />
          </>
        }
      </Box>
    </Container>
  );
}

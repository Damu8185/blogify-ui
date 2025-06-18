import { useEffect, useState } from "react";
import { PostCards, PostData } from "../components/PostCards";
import { fetchPostById } from "../services/postService";
import { useParams } from "react-router-dom";
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { profileName } from "../utils/helper";
import { PostsMenu } from "../components/PostActions";

export const PostDetails = () => {
  const [post, setPost] = useState<any>({});
  // const [] = useState()
  const [reloadPosts, setReloadPosts] = useState(false);
  console.log("post", post);

  const { post_id } = useParams();
  console.log("post_id", post_id);

  useEffect(() => {
    if (post_id) {
      fetchPostById(post_id).then((res) => {
        setPost(res);
      });
    }
  }, []);

  return (
    <Grid>
      <Avatar
        sx={{
          background: "linear-gradient(-45deg, #36096D 0%, #37D5D6 100% )",
        }}
        aria-label="recipe"
      >
        {profileName(
          post?.user_info?.first_name + " " + post?.user_info?.last_name
        )}
      </Avatar>
      <Typography>
        {post?.user_info?.first_name + " " + post?.user_info?.last_name}
      </Typography>
      <Typography>{new Date(post?.created_at).toDateString()}</Typography>
      {/* <PostsMenu
        postData={post}
        setReloadPosts={setReloadPosts}
        setShowEditPostDialog={setShowEditPostDialog}
        setSelectedPost={setSelectedPost}
      /> */}
      <Divider />
      <Typography variant="h6">{post?.post_title}</Typography>
      <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
        {post?.description}
      </Typography>
    </Grid>
  );
};
